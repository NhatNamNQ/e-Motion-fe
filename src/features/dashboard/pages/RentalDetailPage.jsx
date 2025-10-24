import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, User, Car, Calendar, DollarSign, Clock } from 'lucide-react'
import { format } from 'date-fns'
import Loader from '@/components/Loader'
import { rentalService } from '../services/rentalService'
import { getStatusColor } from '@/lib/utils'
import { toast } from 'sonner'

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
    console.log('Creating check-out payment for rental:', id)
    // TODO: Implement check-out payment creation
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className='flex h-64 flex-col items-center justify-center space-y-4'>
        <p className='text-red-500'>{error}</p>
        <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
    )
  }

  if (!rental) {
    return (
      <div className='flex h-64 flex-col items-center justify-center space-y-4'>
        <p>Rental not found</p>
        <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
    )
  }

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A'
    return format(new Date(dateTimeString), 'dd/MM/yyyy HH:mm')
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  return (
    <div className=''>
      {/* Header */}
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => navigate('/dashboard')}
            className='text-secondary hover:text-secondary/80'
          >
            <ArrowLeft className='mr-1 h-4 w-4' />
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Rental ID and Status */}
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Rental #{rental.id}</h1>
        <Badge className={getStatusColor(rental.status)}>{rental.status}</Badge>
      </div>

      {/* Main Content Grid */}
      <div className='mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Rental Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Calendar className='h-5 w-5' />
              Rental Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div>
              <label className='text-sm font-medium text-gray-600'>Created At:</label>
              <p className='text-sm'>{formatDateTime(rental.createdAt)}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-600'>Start Time:</label>
              <p className='text-sm'>{formatDateTime(rental.startTime)}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-600'>End Time:</label>
              <p className='text-sm'>{formatDateTime(rental.endTime)}</p>
            </div>
            {rental.reservationId && (
              <div>
                <label className='text-sm font-medium text-gray-600'>Reservation ID:</label>
                <p className='text-sm'>{rental.reservationId}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User & Staff Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <User className='h-5 w-5' />
              User & Staff Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div>
              <label className='text-sm font-medium text-gray-600'>User ID:</label>
              <p className='text-sm'>{rental.userId}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-600'>Staff ID:</label>
              <p className='text-sm'>{rental.staffId}</p>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle & Station Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Car className='h-5 w-5' />
              Vehicle & Station
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div>
              <label className='text-sm font-medium text-gray-600'>Vehicle ID:</label>
              <p className='text-sm'>{rental.vehicleId}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-600'>Station ID:</label>
              <p className='text-sm'>{rental.stationId}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Information */}
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <DollarSign className='h-5 w-5' />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='flex items-center justify-between rounded-lg bg-gray-50 p-4'>
              <label className='text-sm font-medium text-gray-600'>Rent Fee:</label>
              <span className='text-lg font-bold text-blue-600'>
                {formatCurrency(rental.rentFee)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Button
          onClick={handleCreateCheckInPayment}
          className='bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-6'
          size='lg'
        >
          <DollarSign className='h-5 w-5' />
          Create Check-in Payment
        </Button>
        <Button
          onClick={handleCreateCheckOutPayment}
          className='bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-6'
          size='lg'
        >
          <DollarSign className='h-5 w-5' />
          Create Check-out Payment
        </Button>
      </div>
    </div>
  )
}

export default RentalDetailPage
