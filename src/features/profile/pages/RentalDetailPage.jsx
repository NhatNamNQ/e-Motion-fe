import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  User,
  Car,
  MapPin,
  FileText,
  CreditCard,
  Clock,
  ExternalLink
} from 'lucide-react'
import { format } from 'date-fns'
import Loader from '@/components/Loader'
import { profileService } from '../service/profileService'
import { formatCurrency, getStatusColor } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import CarImageGallery from '@/features/cars/components/detail/CarImageGallery'
import ExtendDialog from '../components/ExtendDialog'
import { toast } from 'sonner'

const RentalDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [rental, setRental] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showExtendDialog, setShowExtendDialog] = useState(false)

  const fetchRentalDetail = useCallback(async () => {
    if (!id) return
    try {
      setLoading(true)
      setError(null)
      const data = await profileService.getRentalDetail(id)
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

  if (loading) return <Loader />
  if (error) return <div className='text-center text-red-500'>Error: {error}</div>
  if (!rental) {
    return (
      <div className='flex h-64 flex-col items-center justify-center space-y-4'>
        <p>Không tìm thấy hợp đồng thuê</p>
        <Button onClick={() => navigate('/account/history')}>Quay lại lịch sử</Button>
      </div>
    )
  }

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A'
    return format(new Date(dateTimeString), 'dd/MM/yyyy HH:mm')
  }

  const DetailItem = ({ label, value }) => (
    <div>
      <p className='text-sm font-medium text-gray-500'>{label}</p>
      <p className='text-lg'>{value || 'N/A'}</p>
    </div>
  )

  const handleExtendSuccess = async () => {
    await fetchRentalDetail()
  }

  const handleViewContract = async (rentalId) => {
    try {
      const data = await profileService.getContract(rentalId)
      console.log(data)
      // window.open(data, '_blank')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const canExtend =
    rental?.status === 'ONGOING' || rental?.status === 'CONFIRM' || rental?.status === 'OVERDUE'
  const isCompleted = rental.status === 'COMPLETED'
  const rentFee = rental?.rentFee || 0
  const reservationFee = rental?.reservationDeposit?.amount || 0
  const rentalFee = rental?.rentalDeposit?.amount || 0
  const checkOutFee = rental?.rentalCheckLists[1]?.fee || 0
  const vehicleLogFee = rental?.vehicleLog?.cost || 0

  return (
    <div className='container mx-auto p-4 md:p-6'>
      <div className='mb-4 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Chi tiết Hợp đồng #{rental.id}</h1>
          <p className='text-muted-foreground mt-1'>Tạo lúc: {formatDateTime(rental.createdAt)}</p>
          <p className='text-muted-foreground mt-1'>Kết thúc: {formatDateTime(rental.endTime)}</p>
        </div>
        <div className='flex items-center gap-3'>
          <Badge className={`text-base ${getStatusColor(rental.status)}`}>{rental.status}</Badge>
        </div>
      </div>

      {rental.vehicle.images && <CarImageGallery car={rental.vehicle} />}

      <div className='mt-8 space-y-8'>
        {/* User Info */}
        <div className='space-y-4'>
          <h2 className='flex items-center gap-2 text-2xl font-bold'>
            <User size={22} /> Thông tin khách hàng
          </h2>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <DetailItem label='Mã đặt chỗ' value={rental.reservationCode} />
            <DetailItem label='Email khách hàng' value={rental.userEmail} />
          </div>
        </div>

        <Separator />

        {/* Vehicle & Rental Info */}
        <div className='space-y-4'>
          <h2 className='flex items-center gap-2 text-2xl font-bold'>
            <Car size={22} /> Thông tin xe & thời gian thuê
          </h2>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
            <DetailItem label='Tên xe' value={rental.vehicle.name} />
            <DetailItem label='Bắt đầu thuê' value={formatDateTime(rental.startTime)} />
            <DetailItem label='Kết thúc thuê' value={formatDateTime(rental.endTime)} />
          </div>
        </div>

        <Separator />

        {/* Station Info */}
        <div className='space-y-4'>
          <h2 className='flex items-center gap-2 text-2xl font-bold'>
            <MapPin size={22} /> Thông tin trạm
          </h2>
          <DetailItem label='Tên trạm' value={rental.vehicle.station.name} />
        </div>

        <Separator />

        <div className='space-y-4'>
          <h2 className='flex items-center gap-2 text-2xl font-bold'>
            <MapPin size={22} /> Thông tin hợp đồng
          </h2>
          <DetailItem label='Trạng thái hợp đồng' value={rental.contractStatus} />
          <div className='space-y-1'>
            <Button
              variant='outline'
              size='sm'
              className='h-auto w-fit gap-2 px-3 py-1.5'
              onClick={() => handleViewContract(rental.id)}
            >
              <FileText className='h-4 w-4' />
              <span className='text-sm'>Xem hợp đồng</span>
              <ExternalLink className='h-3 w-3' />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Vehicle Log */}
        {rental.vehicleLog && (
          <>
            <div className='space-y-4'>
              <h2 className='flex items-center gap-2 text-2xl font-bold'>
                <FileText size={22} /> Chi tiết nhật ký xe
              </h2>
              <div className='bg-muted/40 space-y-3 rounded-lg p-4'>
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
            <Separator />
          </>
        )}

        {/* Payment Details */}
        <div className='space-y-4'>
          <h2 className='flex items-center gap-2 text-2xl font-bold'>
            <CreditCard size={22} /> Chi tiết thanh toán
          </h2>

          {/* Check-in Section */}
          <div className='space-y-3 rounded-lg bg-blue-50 p-4'>
            <h3 className='font-semibold text-blue-900'>Thanh toán nhận xe</h3>
            <div className='flex items-start justify-between gap-2'>
              <span className='flex-1 text-sm text-gray-700'>Phí thuê xe:</span>
              <span className='flex-shrink-0 text-right text-sm font-semibold text-gray-900'>
                {formatCurrency(rentFee)}
              </span>
            </div>
            <div className='flex items-start justify-between gap-2'>
              <span className='flex-1 text-sm text-gray-700'>Phí cọc giữ xe:</span>
              <span className='flex-shrink-0 text-right text-sm font-semibold text-green-700'>
                {formatCurrency(reservationFee)}
              </span>
            </div>
            <div className='flex items-start justify-between gap-2'>
              <span className='flex-1 text-sm text-gray-700'>Phí cọc cuốc xe:</span>
              <span className='flex-shrink-0 text-right text-sm font-semibold text-gray-900'>
                {formatCurrency(rentalFee)}
              </span>
            </div>
            <Separator />
            <div className='flex items-start justify-between gap-2'>
              <span className='flex-1 text-base font-bold'>Tổng tiền check-in:</span>
              <span className='flex-shrink-0 text-right text-lg font-bold'>
                {formatCurrency(rentalFee + rentFee)}
              </span>
            </div>
          </div>

          {/* Check-out Section */}
          <div className='space-y-3 rounded-lg bg-red-50 p-4'>
            <h3 className='font-semibold text-red-900'>Thanh toán trả xe</h3>
            <div className='flex items-start justify-between gap-2'>
              <span className='flex-1 text-sm text-gray-700'>Phí phạt trễ & pin:</span>
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
            <Separator />
            <div className='flex items-start justify-between gap-2'>
              <span className='flex-1 text-base font-bold'>Tiền hoàn cọc:</span>
              <span className='flex-shrink-0 text-right text-lg font-bold'>
                {formatCurrency(
                  rental.rentalDeposit.amount + reservationFee - checkOutFee - vehicleLogFee
                )}
              </span>
            </div>
          </div>

          {isCompleted && (
            <div className='mt-4 flex justify-center'>
              <Badge className='bg-green-600 px-6 py-2 text-base'>Đã hoàn thành hợp đồng</Badge>
            </div>
          )}
        </div>

        <Separator />

        {/* Action Buttons */}
        {canExtend && (
          <div className='flex justify-end'>
            <Button
              variant='outline'
              onClick={() => setShowExtendDialog(true)}
              className='hover:border-primary hover:bg-primary hover:text-primary-foreground w-full border-gray-400 transition-all duration-300 ease-in-out sm:w-auto'
            >
              <Clock className='mr-2 h-4 w-4' />
              Gia hạn hợp đồng
            </Button>
          </div>
        )}

        {/* Extend Rental Dialog */}
        <ExtendDialog
          open={showExtendDialog}
          onOpenChange={setShowExtendDialog}
          data={rental}
          type='rental'
          onSuccess={handleExtendSuccess}
        />
      </div>
    </div>
  )
}

export default RentalDetailPage
