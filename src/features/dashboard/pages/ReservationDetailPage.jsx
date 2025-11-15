import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, User, Car, Calendar, Plus, MapPin, Bell, X } from 'lucide-react'
import { format } from 'date-fns'
import Loader from '@/components/Loader'
import { reservationService } from '../services/reservationService'
import { rentalService } from '../services/rentalService'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/selectors/authSelectors'
import { toast } from 'sonner'
import { getStatusColor } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
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
import { Checkbox } from '@/components/ui/checkbox'

const InfoRow = ({ label, children }) => (
  <div>
    <p className='text-muted-foreground text-sm font-medium'>{label}</p>
    <p className='text-sm font-semibold'>{children || 'N/A'}</p>
  </div>
)

const ReservationDetailPage = () => {
  const { code } = useParams()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [reservation, setReservation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [cancelLoading, setCancelLoading] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [isRefunded, setIsRefunded] = useState(true)

  useEffect(() => {
    const fetchReservation = async () => {
      if (!code) return
      try {
        setLoading(true)
        const data = await reservationService.getReservationByCode(code)
        setReservation(data)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchReservation()
  }, [code])

  const handleCreateRental = async () => {
    try {
      setSubmitLoading(true)
      const res = await rentalService.createRentalFromReservation(code, user?.staffId)
      if (res?.id) navigate(`/dashboard/rentals/${res.id}`)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleCancelReservation = async () => {
    try {
      setCancelLoading(true)
      setShowCancelDialog(false)
      await reservationService.cancelReservation(code, isRefunded)
      toast.success('Hủy đơn đặt chỗ thành công')
      const updatedData = await reservationService.getReservationByCode(code)
      setReservation(updatedData)
      setIsRefunded(true) // Reset về mặc định
    } catch (error) {
      toast.error(error.message)
    } finally {
      setCancelLoading(false)
    }
  }

  if (loading) {
    return <Loader />
  }

  if (!reservation) {
    return (
      <div className='flex h-64 flex-col items-center justify-center space-y-4'>
        <p>Reservation not found</p>
        <Button onClick={() => navigate('/dashboard/reservations')}>Back to Reservations</Button>
      </div>
    )
  }

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A'
    return format(new Date(dateTimeString), 'dd/MM/yyyy HH:mm')
  }

  return (
    <div className='container mx-auto p-4 md:p-6'>
      <div className='mb-6'>
        <Button variant='outline' size='sm' onClick={() => navigate('/dashboard/reservations')}>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Quay lại danh sách
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* LEFT COLUMN: Info */}
        <div className='lg:col-span-2'>
          <Card className='h-full'>
            <CardHeader>
              <div className='flex flex-col gap-2 md:flex-row md:items-start md:justify-between'>
                <div>
                  <CardTitle className='text-2xl'>Đơn đặt chỗ #{reservation.code}</CardTitle>
                  <CardDescription>
                    Tạo lúc: {formatDateTime(reservation.createdAt)}
                  </CardDescription>
                </div>
                <Badge className={`text-base ${getStatusColor(reservation.status)}`}>
                  {reservation.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className='my-4' />
              <div className='grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2'>
                <div className='space-y-4'>
                  <h3 className='flex items-center gap-2 font-semibold'>
                    <Calendar size={18} /> Thời gian
                  </h3>
                  <div className='flex gap-4'>
                    <InfoRow label='Bắt đầu'>{formatDateTime(reservation.startTime)}</InfoRow>
                    <InfoRow label='Kết thúc'>{formatDateTime(reservation.endTime)}</InfoRow>
                  </div>
                </div>
                <div className='space-y-4'>
                  <h3 className='flex items-center gap-2 font-semibold'>
                    <User size={18} /> Thông tin người thuê
                  </h3>
                  <InfoRow label='Email'>{reservation.userEmail}</InfoRow>
                </div>
                <div className='space-y-4'>
                  <h3 className='flex items-center gap-2 font-semibold'>
                    <Car size={18} /> Thông tin xe
                  </h3>
                  <InfoRow label='Mã xe'>{reservation.vehicle.id}</InfoRow>
                  <InfoRow label='Tên xe'>{reservation.vehicle.name}</InfoRow>
                  <InfoRow label='Biển số'>{reservation.vehicle.plateNumber}</InfoRow>
                </div>
                <div className='space-y-4'>
                  <h3 className='flex items-center gap-2 font-semibold'>
                    <MapPin size={18} /> Thông tin trạm
                  </h3>
                  <InfoRow label='Tên trạm'>{reservation.vehicle.station.name}</InfoRow>
                  <InfoRow label='Địa điểm'>{reservation.vehicle.station.address}</InfoRow>
                </div>
                <div className='space-y-4'>
                  <h3 className='flex items-center gap-2 font-semibold'>
                    <Bell size={18} /> Trạng thái thông báo
                  </h3>
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
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Actions */}
        <div className='lg:col-span-1'>
          <Card>
            <CardHeader>
              <CardTitle>Hành động</CardTitle>
              <CardDescription>Tạo hợp đồng thuê xe từ thông tin đặt chỗ này.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              {reservation.status === 'CONFIRM' ? (
                <>
                  <Button
                    onClick={handleCreateRental}
                    className='bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full'
                    disabled={submitLoading || cancelLoading}
                  >
                    {submitLoading ? <Spinner /> : 'Tạo hợp đồng thuê'}
                  </Button>
                  <Button
                    onClick={() => setShowCancelDialog(true)}
                    variant='destructive'
                    className='w-full'
                    disabled={submitLoading || cancelLoading}
                  >
                    {cancelLoading ? <Spinner /> : 'Hủy đơn đặt chỗ'}
                  </Button>
                </>
              ) : reservation.status === 'COMPLETED' ? (
                <Badge className={getStatusColor(reservation.status)}>Đã tạo hợp đồng</Badge>
              ) : (
                <div className='bg-muted rounded-lg border p-4 text-center'>
                  <p className='text-muted-foreground text-sm'>
                    {reservation.status === 'CANCELLED'
                      ? 'Đơn đặt chỗ này đã bị hủy.'
                      : `Không thể thực hiện hành động cho trạng thái "${reservation.status}".`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận hủy đơn đặt chỗ</AlertDialogTitle>
            <AlertDialogDescription className='space-y-4'>
              <p>Bạn có chắc chắn muốn hủy đơn đặt chỗ #{reservation?.code}?</p>
              <div className='flex items-center space-x-2'>
                <Checkbox id='refund' checked={isRefunded} onCheckedChange={setIsRefunded} />
                <label
                  htmlFor='refund'
                  className='text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Hoàn tiền cho khách hàng
                </label>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelReservation}
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

export default ReservationDetailPage
