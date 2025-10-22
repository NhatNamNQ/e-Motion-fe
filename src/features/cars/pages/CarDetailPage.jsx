import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Loader from '@/components/Loader'
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
import { useDispatch, useSelector } from 'react-redux'
import { calculateBookingFees, getCarDetail } from '@/store/actions/carsActions'
import {
  selectBookingFees,
  selectCarDetailLoading,
  selectCarError,
  selectSelectedCar
} from '@/store/selectors/carsSelectors'
import { selectEndTime, selectSearchForm, selectStartTime } from '@/store/selectors/searchSelectors'

const CarDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const startTime = useSelector(selectStartTime)
  const endTime = useSelector(selectEndTime)
  const car = useSelector(selectSelectedCar)
  const searchForm = useSelector(selectSearchForm)
  const bookingFees = useSelector(selectBookingFees)
  const isLoading = useSelector(selectCarDetailLoading)
  const error = useSelector(selectCarError)

  useEffect(() => {
    const loadCarDetail = async () => {
      await dispatch(getCarDetail(id))
    }
    loadCarDetail()
  }, [dispatch, id])

  useEffect(() => {
    const loadBookingFees = async () => {
      await dispatch(
        calculateBookingFees({
          id,
          startTime,
          endTime
        })
      )
    }
    loadBookingFees()
  }, [id, dispatch, startTime, endTime])

  if (isLoading && !car) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Loader />
      </div>
    )
  }

  if (!car || error) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h1 className='mb-2 text-2xl font-bold text-gray-700'>Không tìm thấy xe</h1>
          <p className='text-gray-500'>{error}</p>
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
                  <RentalTime searchForm={searchForm} />
                  <PickupLocation car={car} />
                  <div className='mb-6 flex items-center gap-3'>
                    <Shield className='h-4 w-4 text-blue-500' />
                    <span className='text-base font-bold text-gray-600'>
                      Xe có bảo hiểm vật chất hai chiều
                    </span>
                  </div>
                  <PriceBreakdown car={car} bookingFees={bookingFees} />
                  <Button
                    onClick={() => navigate('/booking/confirm')}
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
