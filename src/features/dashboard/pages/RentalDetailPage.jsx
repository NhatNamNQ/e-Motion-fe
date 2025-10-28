import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
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

// Component helper to display info row
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

  useEffect(() => {
    const fetchRentalDetail = async () => {
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
    }
    fetchRentalDetail()
  }, [id])

  const handleCreateCheckInPayment = async () => {
    try {
      const data = await rentalService.checkInRental(id)
      window.location.href = data
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleCreateCheckOutPayment = async () => {
    try {
      const data = await rentalService.checkOutRental(id)
      if (data.paymentUrl) window.location.href = data.paymentUrl
      if (data) toast.success('Check out thành công')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleCreateCheckIn = () => navigate(`/dashboard/rentals/${id}/check-in`)
  const handleCreateCheckOut = () => navigate(`/dashboard/rentals/${id}/check-out`)
  const handleNavigateToVehicleLog = () => navigate(`/dashboard/rentals/${id}/vehicle-log`)

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
                <InfoRow label='Mã đặt chỗ'>{rental.reservationId}</InfoRow>
                <InfoRow label='Mã khách hàng'>{rental.userId}</InfoRow>
                <InfoRow label='Bắt đầu thuê'>{formatDateTime(rental.startTime)}</InfoRow>
                <InfoRow label='Kết thúc thuê'>{formatDateTime(rental.endTime)}</InfoRow>
                <InfoRow label='Mã nhân viên'>{rental.staffId}</InfoRow>
                <InfoRow label='Mã xe'>{rental.vehicleId}</InfoRow>
                <InfoRow label='Mã trạm'>{rental.stationId}</InfoRow>
              </div>
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
              <div className='bg-muted/40 space-y-4'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Phí thuê xe:</span>
                  <span className='font-semibold'>{formatCurrency(rental.rentFee)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Phí cọc giữ xe:</span>
                  <span className='font-semibold'>{formatCurrency(rental.deposit.amount)}</span>
                </div>
                <Separator />
                <div className='flex items-baseline justify-between'>
                  <span className='text-base font-bold'>Tổng cộng:</span>
                  <span className='text-primary text-xl font-bold'>
                    {formatCurrency(rental.rentFee + rental.deposit.amount)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='grid grid-cols-1 gap-3'>
                <Button
                  onClick={handleCreateCheckInPayment}
                  disabled={!isPending}
                  className='bg-secondary hover:bg-secondary/90'
                >
                  Thanh toán nhận xe
                </Button>
                <Button
                  onClick={handleCreateCheckIn}
                  disabled={!isConfirm}
                  className='bg-secondary hover:bg-secondary/90'
                >
                  Tạo biên bản nhận xe
                </Button>
                <Button
                  onClick={handleCreateCheckOut}
                  disabled={!isOngoing}
                  className='bg-secondary hover:bg-secondary/90'
                >
                  Tạo biên bản trả xe
                </Button>
                <Button
                  onClick={handleNavigateToVehicleLog}
                  disabled={!isOngoing}
                  className='bg-secondary hover:bg-secondary/90'
                >
                  Cập nhật nhật ký xe
                </Button>
                <Button
                  onClick={handleCreateCheckOutPayment}
                  disabled={!isPendingFee}
                  className='bg-secondary hover:bg-secondary/90'
                >
                  Thanh toán trả xe & Hoàn cọc
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default RentalDetailPage
