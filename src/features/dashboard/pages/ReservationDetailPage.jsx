import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, User, Car, Calendar, CreditCard, Plus, MapPin } from 'lucide-react'
import { format } from 'date-fns'
import Loader from '@/components/Loader'
import { reservationService } from '../services/reservationService'
import { rentalService } from '../services/rentalService'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/selectors/authSelectors'
import { toast } from 'sonner'

const ReservationDetailPage = () => {
  const { code } = useParams()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [reservation, setReservation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRM':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      case 'COMPLETED':
        return 'bg-secondary'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A'
    return format(new Date(dateTimeString), 'dd/MM/yyyy HH:mm')
  }

  return (
    <div className=''>
      {/* Header */}
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => navigate('/dashboard/reservations')}
            className='text-secondary hover:text-secondary/80'
          >
            <ArrowLeft className='mr-1 h-4 w-4' />
            Back to Reservations
          </Button>
        </div>
      </div>

      {/* Reservation code and Status */}
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>#{reservation.code}</h1>
        <Badge className={getStatusColor(reservation.status)}>{reservation.status}</Badge>
      </div>

      {/* Main Content Grid */}
      <div className='mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Renter Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <User className='h-5 w-5' />
              Renter Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div>
              <label className='text-sm font-medium text-gray-600'>Email:</label>
              <p className='text-sm'>{reservation.userEmail}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-600'>Created At:</label>
              <p className='text-sm'>{formatDateTime(reservation.createdAt)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Car className='h-5 w-5' />
              Vehicle Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div>
              <label className='text-sm font-medium text-gray-600'>Name:</label>
              <p className='text-sm'>{reservation.vehicleName}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-600'>Plate Number:</label>
              <p className='text-sm'>{reservation.plateNumber}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-600'>Vehicle ID:</label>
              <p className='text-sm'>{reservation.vehicleId}</p>
            </div>
          </CardContent>
        </Card>

        {/* Station Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <MapPin className='h-5 w-5' />
              Station Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div>
              <label className='text-sm font-medium text-gray-600'>Station ID:</label>
              <p className='text-sm'>{reservation.stationId}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-600'>End Time:</label>
              <p className='text-sm'>{formatDateTime(reservation.endTime)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Status */}
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Calendar className='h-5 w-5' />
            Notification Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='flex items-center justify-between'>
              <label className='text-sm font-medium text-gray-600'>Overdue Notified:</label>
              <Badge variant={reservation.overdueNotified ? 'default' : 'secondary'}>
                {reservation.overdueNotified ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div className='flex items-center justify-between'>
              <label className='text-sm font-medium text-gray-600'>Expiring Notified:</label>
              <Badge variant={reservation.expiringNotified ? 'default' : 'secondary'}>
                {reservation.expiringNotified ? 'Yes' : 'No'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Rental Button - Only show if status is CONFIRM */}
      {reservation.status === 'CONFIRM' && (
        <div className='flex justify-center'>
          <Button
            onClick={handleCreateRental}
            className='bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-2'
            disabled={submitLoading}
          >
            <Plus className='mr-2 h-4 w-4' />
            Create Rental from this Reservation
          </Button>
        </div>
      )}

      {/* Show message for other statuses */}
      {reservation.status !== 'CONFIRM' && (
        <div className='flex justify-center'>
          <div className='rounded-lg bg-gray-100 p-4 text-center'>
            <p className='text-sm text-gray-600'>
              {reservation.status === 'CANCELLED'
                ? 'This reservation has been cancelled'
                : reservation.status === 'PENDING'
                  ? 'This reservation is still pending'
                  : 'Cannot create rental for this reservation status'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReservationDetailPage
