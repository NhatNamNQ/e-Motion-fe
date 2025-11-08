import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import Loader from '@/components/Loader'
import { rentalService } from '../services/rentalService'
import { formatCurrency, getStatusColor } from '@/lib/utils'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'
import PaymentQRDialog from '../components/PaymentQRDialog'

const InfoRow = ({ label, children }) => (
  <div className='space-y-1'>
    <p className='text-muted-foreground text-sm font-medium'>{label}</p>
    <p className='text-sm font-semibold'>{children || 'N/A'}</p>
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

  const rentFee = rental?.rentFee || 0
  const reservationFee = rental?.reservationDeposit?.amount || 0
  const rentalFee = rental?.rentalDeposit?.amount || 0
  const checkOutFee = rental?.rentalCheckLists[1]?.fee || 0
  const vehicleLogFee = rental?.vehicleLog?.cost || 0

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
      const { qrCode } = await rentalService.checkInRental(id)
      setQrCode(qrCode)
      setShowPaymentDialog(true)
      // Không redirect nữa, hiển thị popup thay vì
      // window.location.href = url
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = () => {
    // Reload lại thông tin rental sau khi thanh toán thành công
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
    if (!dateTimeString) return 'N/A'
    return format(new Date(dateTimeString), 'dd/MM/yyyy HH:mm')
  }

  const isPending = rental.status === 'PENDING'
  const isConfirm = rental.status === 'CONFIRM'
  const isOngoing = rental.status === 'ONGOING'
  const isPendingFee = rental.status === 'PENDING_FEE'
  const hasVehicleLog = !!rental.vehicleLog
  const isCompleted = rental.status === 'COMPLETED'
  const isOverdue = rental.status === 'OVERDUE'

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
                <InfoRow label='Mã đặt chỗ'>{rental.reservationCode}</InfoRow>
                <InfoRow label='Email khách hàng'>{rental.userEmail}</InfoRow>
                <InfoRow label='Bắt đầu thuê'>{formatDateTime(rental.startTime)}</InfoRow>
                <InfoRow label='Kết thúc thuê'>{formatDateTime(rental.endTime)}</InfoRow>
                <InfoRow label='Tên xe'>{rental.vehicle.name}</InfoRow>
                <InfoRow label='Tên nhân viên'>{rental.staff.fullName}</InfoRow>
                <InfoRow label='Tên trạm'>{rental.vehicle.station.name}</InfoRow>
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
                  <div className='flex items-start justify-between gap-2'>
                    <span className='flex-1 text-sm text-gray-700'>Phí cọc giữ xe:</span>
                    <span className='flex-shrink-0 text-right text-sm font-semibold text-green-900'>
                      {formatCurrency(reservationFee)}
                    </span>
                  </div>
                  <div className='flex items-start justify-between gap-2'>
                    <span className='flex-1 text-sm text-gray-700'>Phí cọc cuốc xe:</span>
                    <span className='flex-shrink-0 text-right text-sm font-semibold text-gray-900'>
                      {formatCurrency(rentalFee)}
                    </span>
                  </div>
                </div>

                {/* Total Check-in */}
                <div className='flex items-start justify-between gap-2 px-2'>
                  <span className='flex-1 text-base font-bold'>Tổng Tiền Check-in:</span>
                  <span className='flex-shrink-0 text-right text-lg font-bold'>
                    {formatCurrency(rentalFee + rentFee)}
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
                    {formatCurrency(
                      rental.rentalDeposit.amount + reservationFee - checkOutFee - vehicleLogFee
                    )}
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
                    onClick={handleCreateCheckInPayment}
                    disabled={!isPending}
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
    </div>
  )
}

export default RentalDetailPage
