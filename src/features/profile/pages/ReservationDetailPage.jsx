import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, User, Car, MapPin, Bell } from 'lucide-react'
import { format } from 'date-fns'
import Loader from '@/components/Loader'
import { profileService } from '../service/profileService'
import { toast } from 'sonner'
import { getStatusColor } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import CarImageGallery from '@/features/cars/components/detail/CarImageGallery'

const ReservationDetailPage = () => {
  const { code } = useParams()
  const navigate = useNavigate()
  const [reservation, setReservation] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReservation = async () => {
      if (!code) return
      try {
        setLoading(true)
        const data = await profileService.getReservationDetail(code)
        setReservation(data)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchReservation()
  }, [code])

  if (loading) {
    return <Loader />
  }

  if (!reservation) {
    return (
      <div className='flex h-64 flex-col items-center justify-center space-y-4'>
        <p>Không tìm thấy thông tin đặt chỗ</p>
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

  return (
    <div className='container mx-auto p-4 md:p-6'>
      <div className='mb-4 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Đơn đặt chỗ #{reservation.code}</h1>
          <p className='text-muted-foreground mt-1'>
            Tạo lúc: {formatDateTime(reservation.createdAt)}
          </p>
        </div>
        <Badge className={`text-base ${getStatusColor(reservation.status)}`}>
          {reservation.status}
        </Badge>
      </div>

      {reservation.vehicle.images && <CarImageGallery car={reservation.vehicle} />}
      <div className='mt-8 space-y-8'>
        <div className='space-y-4'>
          <h2 className='flex items-center gap-2 text-2xl font-bold'>
            <User size={22} /> Thông tin người thuê
          </h2>
          <DetailItem label='Email' value={reservation.userEmail} />
        </div>
        <Separator />
        <div className='space-y-4'>
          <h2 className='flex items-center gap-2 text-2xl font-bold'>
            <Car size={22} /> Thông tin xe
          </h2>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
            <DetailItem label='Tên xe' value={reservation.vehicle.name} />
            <DetailItem label='Biển số' value={reservation.vehicle.plateNumber} />
          </div>
        </div>
        <Separator />
        <div className='space-y-4'>
          <h2 className='flex items-center gap-2 text-2xl font-bold'>
            <MapPin size={22} /> Thông tin trạm
          </h2>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <DetailItem label='Tên trạm' value={reservation.vehicle.station.name} />
            <DetailItem label='Địa điểm' value={reservation.vehicle.station.address} />
          </div>
        </div>
        <Separator />
        <div className='space-y-4'>
          <h2 className='flex items-center gap-2 text-2xl font-bold'>
            <Bell size={22} /> Trạng thái thông báo
          </h2>
          <div className='flex items-center justify-between text-sm'>
            <span>Sắp hết hạn:</span>
            <Badge variant={reservation.expiringNotified ? 'default' : 'secondary'}>
              {reservation.expiringNotified ? 'Đã gửi' : 'Chưa gửi'}
            </Badge>
          </div>
          <div className='flex items-center justify-between text-sm'>
            <span>Quá hạn:</span>
            <Badge variant={reservation.overdueNotified ? 'default' : 'secondary'}>
              {reservation.overdueNotified ? 'Đã gửi' : 'Chưa gửi'}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservationDetailPage
