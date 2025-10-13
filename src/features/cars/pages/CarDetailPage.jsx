import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Loader from '@/components/Loader'
import { carService } from '../services/carService'
import CarImageGallery from '../components/detail/CarImageGallery'
import CarBasicInfo from '../components/detail/CarBasicInfo'
import CarTerms from '../components/detail/CarTerms'
import CarCancellationPolicy from '../components/detail/CarCancellationPolicy'
import CarLocation from '../components/detail/CarLocation'
import PricingDisplay from '../components/booking/PricingDisplay'
import RentalTime from '../components/booking/RentalTime'
import PickupLocation from '../components/booking/PickupLocation'
import PriceBreakdown from '../components/booking/PriceBreakdown'
import AdditionalCosts from '../components/booking/AdditionalCosts'

const CarDetailPage = () => {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [bookingFees, setBookingFees] = useState({
    depositFee: 0,
    vatFee: 0,
    rentFee: 0,
    totalFee: 0
  })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true)
        const carData = await carService.getCarById(id)

        setCar(carData)
      } catch (error) {
        console.error('Error fetching car details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCarDetails()
  }, [id])

  useEffect(() => {
    if (car) {
      const depositFee = car.depositFee
      const vatFee = (car.pricePer4Hours * 10) / 100
      const rentFee = car.pricePer4Hours
      const totalFee = rentFee + depositFee + vatFee
      setBookingFees({ depositFee, vatFee, rentFee, totalFee })
    }
  }, [car])

  const handleConfirmBooking = () => {
    const carData = {
      ...car,
      ...bookingFees
    }

    localStorage.setItem('carData', JSON.stringify(carData))
    navigate('/booking/confirm')
  }

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Loader />
      </div>
    )
  }

  if (!car) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h1 className='mb-2 text-2xl font-bold text-gray-700'>Không tìm thấy xe</h1>
          <p className='text-gray-500'>Xe bạn đang tìm kiếm không tồn tại.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          {/* Left Column - Car Details */}
          <div className='space-y-8 md:col-span-2'>
            <CarImageGallery car={car} />
            <CarBasicInfo car={car} />
            <CarLocation car={car} />
            <CarTerms />
            <CarCancellationPolicy />
          </div>

          {/* Right Column - Booking Card */}
          <div className='lg:col-span-1'>
            <div className='sticky top-8 space-y-6'>
              <Card className='shadow-lg'>
                <CardContent className=''>
                  <PricingDisplay car={car} />
                  <RentalTime />
                  <PickupLocation car={car} />
                  <div className='mb-6 flex items-center gap-3'>
                    <Shield className='h-4 w-4 text-blue-500' />
                    <span className='text-base font-bold text-gray-600'>
                      Xe có bảo hiểm vật chất hai chiều
                    </span>
                  </div>
                  <PriceBreakdown car={car} bookingFees={bookingFees} />
                  <Button
                    onClick={handleConfirmBooking}
                    className='bg-secondary mt-6 w-full hover:bg-blue-600'
                  >
                    Thuê xe
                  </Button>
                </CardContent>
              </Card>

              <AdditionalCosts />
              {/* Terms Agreement */}
              <div className='text-center text-sm text-gray-500'>
                Bằng việc chuyển giữ chỗ và thuê xe, bạn đồng ý với{' '}
                <span className='font-bold text-blue-500'>Điều khoản sử dụng</span> và{' '}
                <span className='font-bold text-blue-500'>Chính sách bảo mật</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetailPage
