import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, User, Car, MapPin, Bell, Clock } from 'lucide-react'
import { format } from 'date-fns'
import Loader from '@/components/Loader'
import { profileService } from '../service/profileService'
import { toast } from 'sonner'
import { getStatusColor } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import CarImageGallery from '@/features/cars/components/detail/CarImageGallery'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Spinner } from '@/components/ui/spinner'
import ExtendDialog from '../components/ExtendDialog'

const ReservationDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [reservation, setReservation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)
  const [showExtendDialog, setShowExtendDialog] = useState(false)

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        setLoading(true)
        const data = await profileService.getReservationDetail(id)
        setReservation(data)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchReservation()
  }, [id])

  const handleCancelReservation = async () => {
    try {
      setCancelling(true)
      await profileService.cancelReservation(reservation.code)
      toast.success('Hủy đặt trước thành công')
      const data = await profileService.getReservationDetail(reservation.code)
      setReservation(data)
    } catch (error) {
      toast.error(error.message || 'Không thể hủy đặt trước')
    } finally {
      setCancelling(false)
    }
  }

  const handleExtendSuccess = async () => {
    // Reload reservation data
    try {
      const data = await profileService.getReservationDetail(id)
      setReservation(data)
    } catch (error) {
      toast.error('Không thể tải lại thông tin đặt chỗ')
    }
  }

  const canCancel = reservation?.status === 'CONFIRM'
  const isPending = reservation?.status === 'PENDING'
  const canExtend = reservation?.status === 'CONFIRM'

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
          <p className='text-muted-foreground my-1'>
            Tạo lúc: {formatDateTime(reservation.createdAt)}
          </p>
          <p className='text-muted-foreground mt-1'>
            Bắt đầu: {formatDateTime(reservation.startTime)}
          </p>
          <p className='text-muted-foreground mt-1'>
            Kết thúc: {formatDateTime(reservation.endTime)}
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <Badge className={`text-base ${getStatusColor(reservation.status)}`}>
            {reservation.status}
          </Badge>
        </div>
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

        {/* Action Buttons Section */}
        <div className='flex flex-col gap-3 sm:flex-row sm:justify-end'>
          {isPending && (
            <Button
              variant='default'
              className='w-full sm:w-auto'
              onClick={() => (window.location.href = reservation.paymentUrl)}
            >
              Thanh toán lại
            </Button>
          )}
          {canExtend && (
            <Button
              variant='outline'
              className='w-full sm:w-auto'
              onClick={() => setShowExtendDialog(true)}
            >
              <Clock className='mr-2 h-4 w-4' />
              Gia hạn đặt chỗ
            </Button>
          )}
          {canCancel && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive' className='w-full sm:w-auto' disabled={cancelling}>
                  {cancelling ? <Spinner /> : 'Hủy đặt trước'}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xác nhận hủy đặt trước</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bạn có chắc chắn muốn hủy đơn đặt chỗ #{reservation.code}? Hành động này không
                    thể hoàn tác.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Không</AlertDialogCancel>
                  <AlertDialogAction
                    className='bg-destructive hover:bg-destructive/80'
                    onClick={handleCancelReservation}
                  >
                    Đồng ý hủy
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
      <ExtendDialog
        open={showExtendDialog}
        onOpenChange={setShowExtendDialog}
        reservation={reservation}
        onSuccess={handleExtendSuccess}
      />
    </div>
  )
}

export default ReservationDetailPage
