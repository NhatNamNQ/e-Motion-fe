import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, FileText, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'
import Loader from '@/components/Loader'
import { rentalService } from '../services/rentalService'
import { formatCurrency, getStatusColor } from '@/lib/utils'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'
import PaymentQRDialog from '../components/PaymentQRDialog'
import { Spinner } from '@/components/ui/spinner'
import { Input } from '@/components/ui/input'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

const InfoRow = ({ label, children }) => (
  <div className='space-y-1'>
    <p className='text-muted-foreground text-sm font-medium'>{label}</p>
    <p className='text-sm font-semibold'>{children || 'Chưa có'}</p>
  </div>
)

const RentalDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [rental, setRental] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [qrCode, setQrCode] = useState(null)
  const [isContractLoading, setIsContractLoading] = useState(false)
  const [isCancelLoading, setIsCancelLoading] = useState(false)
  const [usedPoints, setUsedPoints] = useState(0)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  console.log('rental:', rental)

  const rentFee = rental?.rentFee || 0
  const reservationFee = rental?.reservationDeposit?.amount || 0
  const rentalFee = rental?.rentalDeposit?.amount || 0
  const checkOutFee = rental?.rentalCheckLists[1]?.fee || 0
  const vehicleLogFee = rental?.vehicleLog?.cost || 0
  const renterPoints = rental?.userPoint || 0
  const totalCheckoutFee = rentalFee + reservationFee

  const finalDiscountPoints = rental?.discountPoint > 0 ? rental.discountPoint : usedPoints
  const pointDiscount = finalDiscountPoints * 1000
  console.log('finalDiscountPoints:', finalDiscountPoints)
  console.log('usedPoints:', usedPoints)

  const fetchRentalDetail = useCallback(async () => {
    if (!id) return
    try {
      setLoading(true)
      setError(null)
      const data = await rentalService.getRentalById(id)
      setRental(data)
    } catch (err) {
      console.error('Error fetching rental:', err)
      setError('Failed to fetch rental details')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchRentalDetail()
  }, [fetchRentalDetail])

  const handleCreateCheckInPayment = async () => {
    try {
      setLoading(true)
      const { qrCode } = await rentalService.checkInRental(id, usedPoints)
      setQrCode(qrCode)
      setShowPaymentDialog(true)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = () => {
    fetchRentalDetail()
  }

  const handleCreateCheckOutPayment = async () => {
    try {
      setLoading(true)
      const data = await rentalService.checkOutRental(id)
      if (data) {
        toast.success('Check out thành công')
        fetchRentalDetail()
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCheckIn = () =>
    navigate(`/dashboard/rentals/${id}/check-in`, {
      state: {
        currentBattery: rental.vehicle.batteryLevel
      }
    })
  const handleCreateCheckOut = () => navigate(`/dashboard/rentals/${id}/check-out`)

  const handleCreateVehicleLog = () =>
    navigate(`/dashboard/rentals/${id}/vehicle-log`, {
      state: { carId: rental.vehicle.id }
    })

  const handleUpdateVehicleLog = () =>
    navigate(`/dashboard/rentals/${id}/vehicle-log/edit/${rental.vehicleLog.id}`)

  const handleCancelRental = async () => {
    try {
      setIsCancelLoading(true)
      setShowCancelDialog(false)
      const res = await rentalService.cancelRental(id)
      toast.success(res.message || 'Hủy hợp đồng thành công')
      fetchRentalDetail()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsCancelLoading(false)
    }
  }

  const handlePointsChange = (e) => {
    const value = parseInt(e.target.value) || 0
    const maxDiscount = Math.floor(rentFee / 1000) // Max điểm = tiền thuê / 1000

    if (value > renterPoints) {
      toast.error(`Bạn chỉ có ${renterPoints} điểm`)
      setUsedPoints(Math.min(renterPoints, maxDiscount))
    } else if (value > maxDiscount) {
      toast.error(`Chỉ được giảm tối đa ${maxDiscount} điểm (= ${formatCurrency(rentFee)})`)
      setUsedPoints(maxDiscount)
    } else if (value < 0) {
      setUsedPoints(0)
    } else {
      setUsedPoints(value)
    }
  }

  const handleUseAllPoints = () => {
    const maxDiscount = Math.floor(rentFee / 1000)
    setUsedPoints(Math.min(renterPoints, maxDiscount))
  }

  if (loading) return <Loader />
  if (error) return <div>Error</div>
  if (!rental) {
    return (
      <div className='flex h-64 flex-col items-center justify-center space-y-4'>
        <p>Không tìm thấy hợp đồng thuê</p>
        <Button onClick={() => navigate('/dashboard/rentals')}>Quay lại danh sách</Button>
      </div>
    )
  }
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'Chưa có'
    return format(new Date(dateTimeString), 'dd/MM/yyyy HH:mm')
  }

  const handleSendContract = async () => {
    try {
      setIsContractLoading(true)
      const res = await rentalService.sendContract(id)
      toast.success(res.message)
      fetchRentalDetail()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsContractLoading(false)
    }
  }

  const isPending = rental.status === 'PENDING'
  const isContracting = rental.status === 'CONTRACTING'
  const isConfirm = rental.status === 'CONFIRM'
  const isOngoing = rental.status === 'ONGOING'
  const isPendingFee = rental.status === 'PENDING_FEE'
  const hasVehicleLog = !!rental.vehicleLog
  const isCompleted = rental.status === 'COMPLETED'
  const isOverdue = rental.status === 'OVERDUE'
  const isCanceled = rental.status === 'CANCELLED'
  const isContractPending = rental.status === 'CONTRACTING' && rental.contractStatus === 'PENDING'
  const isSignedContract = rental.contractStatus === 'SIGNED'
  const isViewContract = !isContractPending && !isPending && !isCanceled

  return (
    <div className='container mx-auto p-4 md:p-6'>
      <div className='mb-6'>
        <Button variant='outline' size='sm' onClick={() => navigate('/dashboard/rentals')}>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Quay lại danh sách
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <Card className='h-full'>
            <CardHeader>
              <div className='flex flex-col gap-2 md:flex-row md:items-start md:justify-between'>
                <div>
                  <CardTitle className='text-2xl'>Chi tiết Hợp đồng #{rental.id}</CardTitle>
                  <CardDescription>Tạo lúc: {formatDateTime(rental.createdAt)}</CardDescription>
                </div>
                <Badge className={`text-base ${getStatusColor(rental.status)}`}>
                  {rental.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className='my-4' />
              <div className='grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2'>
                {rental.reservationCode && (
                  <InfoRow label='Mã đặt chỗ'>{rental.reservationCode}</InfoRow>
                )}
                <InfoRow label='Email khách hàng'>{rental.userEmail}</InfoRow>
                <InfoRow label='Bắt đầu thuê'>{formatDateTime(rental.startTime)}</InfoRow>
                <InfoRow label='Kết thúc thuê'>{formatDateTime(rental.endTime)}</InfoRow>
                <InfoRow label='Tên xe'>{rental.vehicle.name}</InfoRow>
                <InfoRow label='Nhân viên phụ trách'>{rental.staff.fullName}</InfoRow>
                <InfoRow label='Tên trạm'>{rental.vehicle.station.name}</InfoRow>
                {rental.contractStatus && (
                  <InfoRow label='Tình trạng hợp đồng'>{rental.contractStatus}</InfoRow>
                )}

                <div className='space-y-1'>
                  {isViewContract && (
                    <Button
                      variant='outline'
                      size='sm'
                      className='h-auto w-fit gap-2 px-3 py-1.5'
                      onClick={() => window.open(rental.submissionUrl, '_blank')}
                    >
                      <FileText className='h-4 w-4' />
                      <span className='text-sm'>Xem hợp đồng</span>
                      <ExternalLink className='h-3 w-3' />
                    </Button>
                  )}
                  {(isContractPending || isPending) && (
                    <Button
                      onClick={() => setShowCancelDialog(true)}
                      variant='destructive'
                      className='text-sm'
                      disabled={isCancelLoading}
                    >
                      {isCancelLoading ? <Spinner /> : 'Hủy hợp đồng'}
                    </Button>
                  )}
                </div>
              </div>
              {/* Vehicle Log Details */}
              {rental.vehicleLog && (
                <>
                  <Separator className='my-6' />
                  <div>
                    <div className='mb-4 flex items-center justify-between'>
                      <h3 className='text-lg font-semibold'>Chi tiết nhật ký xe</h3>
                    </div>
                    <div className='bg-muted/40 space-y-3 rounded-lg'>
                      {rental.vehicleLog.repairItems && rental.vehicleLog.repairItems.length > 0 ? (
                        <>
                          {rental.vehicleLog.repairItems.map((item, idx) => (
                            <div key={idx} className='flex justify-between text-sm'>
                              <span className='text-muted-foreground'>{item.description}</span>
                              <span className='font-medium text-red-600'>
                                -{formatCurrency(item.cost)}
                              </span>
                            </div>
                          ))}
                          <Separator />
                          <div className='flex justify-between font-semibold'>
                            <span>Tổng phí phạt:</span>
                            <span className='text-red-600'>
                              -{formatCurrency(rental.vehicleLog.cost)}
                            </span>
                          </div>
                        </>
                      ) : (
                        <p className='text-muted-foreground text-sm'>Không có phí phạt</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* === RIGHT COLUMN: PAYMENT & ACTIONS (1/3) === */}
        <div className='lg:col-span-1'>
          <Card>
            <CardHeader>
              <CardTitle>Thanh toán & Quy trình</CardTitle>
              <CardDescription>
                Thực hiện các bước theo thứ tự để hoàn tất hợp đồng.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Payment Details */}
              <div className='space-y-4'>
                {/* Check-in Section - Blue background */}
                <div className='space-y-3 rounded-lg bg-blue-100 p-4'>
                  <div className='flex items-start justify-between gap-2'>
                    <span className='flex-1 text-sm text-gray-700'>Phí thuê xe:</span>
                    <span className='flex-shrink-0 text-right text-sm font-semibold text-gray-900'>
                      {formatCurrency(rentFee)}
                    </span>
                  </div>

                  {isSignedContract && isContracting && renterPoints > 0 && (
                    <div className='border-t border-blue-200 pt-3'>
                      <div className='mb-3 flex items-center justify-between gap-2'>
                        <span className='text-sm font-semibold text-gray-700'>
                          Điểm hiện có: {renterPoints}
                        </span>
                        {!rental?.discountPoint && (
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={handleUseAllPoints}
                            disabled={renterPoints === 0}
                          >
                            Dùng hết
                          </Button>
                        )}
                      </div>
                      <div className='mb-2 flex items-center gap-2'>
                        <Input
                          type='number'
                          min='0'
                          max={Math.floor(rentFee / 1000)}
                          value={usedPoints}
                          onChange={handlePointsChange}
                          placeholder='Nhập số điểm'
                          className='h-8 border-2 border-gray-400 bg-white text-sm'
                        />
                        <span className='text-xs text-gray-600'>điểm</span>
                      </div>
                      <div className='flex items-start justify-between gap-2'>
                        <span className='text-sm text-gray-700'>Giảm giá (1 điểm = 1.000đ):</span>
                        <span className='text-right text-sm font-semibold text-green-900'>
                          -{formatCurrency(pointDiscount)}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className='border-t border-blue-200 pt-3'></div>
                  {pointDiscount > 0 && (
                    <div className='flex items-start justify-between gap-2'>
                      <span className='flex-1 text-sm text-green-700'>Giảm giá:</span>
                      <span className='flex-shrink-0 text-right text-sm font-semibold text-green-900'>
                        -{formatCurrency(pointDiscount)}
                      </span>
                    </div>
                  )}
                  {reservationFee > 0 && (
                    <div className='flex items-start justify-between gap-2'>
                      <span className='flex-1 text-sm text-gray-700'>Phí giữ chỗ:</span>
                      <span className='flex-shrink-0 text-right text-sm font-semibold text-green-900'>
                        {formatCurrency(reservationFee)}
                      </span>
                    </div>
                  )}
                  <div className='flex items-start justify-between gap-2'>
                    <span className='flex-1 text-sm text-gray-700'>Phí cọc xe:</span>
                    <span className='flex-shrink-0 text-right text-sm font-semibold text-gray-900'>
                      {formatCurrency(rentalFee)}
                    </span>
                  </div>
                </div>

                {/* Total Check-in */}
                <div className='flex items-start justify-between gap-2 px-2'>
                  <span className='flex-1 text-base font-bold'>Tổng Tiền Check-in:</span>
                  <span className='flex-shrink-0 text-right text-lg font-bold'>
                    {formatCurrency(Math.max(0, rentFee + rentalFee - pointDiscount))}
                  </span>
                </div>

                {/* Check-out Section - Red/Pink background */}
                <div className='space-y-3 rounded-lg bg-red-100 p-4'>
                  <div className='flex items-start justify-between gap-2'>
                    <span className='flex-1 text-sm text-gray-700'>Phí Phạt trễ Và pin:</span>
                    <span className='flex-shrink-0 text-right text-sm font-semibold text-red-600'>
                      {formatCurrency(checkOutFee)}
                    </span>
                  </div>
                  <div className='flex items-start justify-between gap-2'>
                    <span className='flex-1 text-sm text-gray-700'>Phí sửa chữa:</span>
                    <span className='flex-shrink-0 text-right text-sm font-semibold text-red-600'>
                      {formatCurrency(vehicleLogFee)}
                    </span>
                  </div>
                </div>

                {/* Total Check-out */}
                <div className='flex items-start justify-between gap-2 px-2'>
                  <span className='flex-1 text-base font-bold'>Tổng Tiền Check-out:</span>
                  <span className='flex-shrink-0 text-right text-lg font-bold'>
                    {formatCurrency(totalCheckoutFee - checkOutFee - vehicleLogFee)}
                  </span>
                </div>
              </div>

              {/* Action Buttons or Completed Message */}
              {isCompleted ? (
                <div className='flex justify-center'>
                  <Badge className='mb-4 bg-green-600 text-base'>Hoàn thành hợp đồng</Badge>
                </div>
              ) : (
                <div className='grid grid-cols-1 gap-3'>
                  <Button
                    onClick={handleSendContract}
                    disabled={!isPending}
                    className='bg-secondary hover:bg-secondary/90 w-full text-sm'
                  >
                    {isContractLoading ? <Spinner /> : 'Gửi hợp đồng'}
                  </Button>
                  <Button
                    onClick={handleCreateCheckInPayment}
                    disabled={!isContracting}
                    className='bg-secondary hover:bg-secondary/90 w-full text-sm'
                  >
                    Thanh toán nhận xe
                  </Button>
                  <Button
                    onClick={handleCreateCheckIn}
                    disabled={!isConfirm}
                    className='bg-secondary hover:bg-secondary/90 w-full text-sm'
                  >
                    Tạo biên bản nhận xe
                  </Button>
                  <Button
                    onClick={handleCreateCheckOut}
                    disabled={!isOngoing && !isOverdue}
                    className='bg-secondary hover:bg-secondary/90 w-full text-sm'
                  >
                    Tạo biên bản trả xe
                  </Button>
                  {!hasVehicleLog ? (
                    <Button
                      onClick={handleCreateVehicleLog}
                      disabled={!isPendingFee}
                      className='bg-secondary hover:bg-secondary/90 w-full text-sm'
                    >
                      Tạo biên bản nhật ký xe
                    </Button>
                  ) : (
                    <Button
                      onClick={handleUpdateVehicleLog}
                      disabled={!isPendingFee}
                      className='bg-secondary hover:bg-secondary/90 w-full text-sm'
                    >
                      Cập nhật biên bản nhật ký xe
                    </Button>
                  )}
                  <Button
                    onClick={handleCreateCheckOutPayment}
                    disabled={!isPendingFee}
                    className='bg-secondary hover:bg-secondary/90 w-full text-sm'
                  >
                    <span className='text-center leading-tight'>Thanh toán trả xe & Hoàn cọc</span>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment QR Dialog */}
      <PaymentQRDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        qrCode={qrCode}
        rentalId={id}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận hủy hợp đồng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn hủy hợp đồng #{rental?.id}?
              <br />
              <br />
              Hành động này không thể hoàn tác và tiền đặt cọc sẽ được hoàn lại cho khách hàng.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelRental}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              Xác nhận hủy
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default RentalDetailPage
