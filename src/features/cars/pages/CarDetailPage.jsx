import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
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
import { selectUser } from '@/store/selectors/authSelectors'
import CarsSlider from '@/features/home/components/CarsSlider'
import { carService } from '../services/carService'
import SchedulePopup from '../components/SchedulePopup'

const CarDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const rental = user && user.role !== 'ROLE_USER'
  const renter = useSelector((state) => state.renter.user)
  const startTime = useSelector(selectStartTime)
  const endTime = useSelector(selectEndTime)
  const car = useSelector(selectSelectedCar)
  const searchForm = useSelector(selectSearchForm)
  const bookingFees = useSelector(selectBookingFees)
  const isLoading = useSelector(selectCarDetailLoading)
  const error = useSelector(selectCarError)
  const [schedulePopup, setSchedulePopup] = useState({
    open: false,
    carId: null,
    data: null,
    loading: false,
    error: null
  })

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
          endTime,
          rental
        })
      )
    }
    loadBookingFees()
  }, [id, dispatch, startTime, endTime, rental])

  const handleRentCar = () => {
    if (!user) {
      navigate('/auth/login')
    } else if (user.role === 'ROLE_USER') {
      navigate('/booking/confirm')
    } else {
      if (!renter) {
        navigate('/dashboard/rentals')
      } else {
        navigate('/dashboard/booking/confirm')
      }
    }
  }

  const handleViewSchedule = async (carId) => {
    setSchedulePopup({ open: true, carId, data: null, loading: true, error: null })
    try {
      const data = await carService.viewCarSchedule(carId)
      setSchedulePopup({ open: true, carId, data, loading: false, error: null })
    } catch (error) {
      setSchedulePopup({
        open: true,
        carId,
        data: null,
        loading: false,
        error: error.message || 'Lỗi khi tải lịch trình'
      })
    }
  }

  const closeSchedulePopup = () =>
    setSchedulePopup({ open: false, carId: null, data: null, loading: false, error: null })

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h1 className='mb-2 text-2xl font-bold text-gray-700'>Không tìm thấy xe</h1>
          <p className='text-gray-500'>{error}</p>
        </div>
      </div>
    )
  }

  if (isLoading || !car) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
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
                  <PriceBreakdown car={car} bookingFees={bookingFees} />
                  <Button
                    onClick={handleRentCar}
                    className='bg-secondary mt-6 w-full hover:bg-blue-600'
                  >
                    Thuê xe
                  </Button>
                  <Button
                    onClick={() => handleViewSchedule(car.id)}
                    className='bg-secondary mt-4 w-full hover:bg-blue-600'
                  >
                    Xem lịch thuê
                  </Button>
                </CardContent>
              </Card>

              <AdditionalCosts />
              {/* Terms Agreement */}
              <div className='text-center text-sm text-gray-500'>
                Bằng việc chuyển giữ chỗ và thuê xe, bạn đồng ý với{' '}
                <Link
                  to='/term-of-use'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-bold text-blue-500 hover:underline'
                >
                  Điều khoản sử dụng
                </Link>{' '}
                và{' '}
                <Link
                  to='/rental-policy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-bold text-blue-500 hover:underline'
                >
                  Chính sách thuê xe
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <h2 className='text-2xl text-gray-700'>Các loại xe tương tự </h2>
          <div className='bg-secondary my-2 h-1 w-10 rounded-full' />{' '}
          <CarsSlider cars={car.similarVehicleList} />
        </div>
      </div>
      <SchedulePopup
        isOpen={schedulePopup.open}
        onClose={closeSchedulePopup}
        loading={schedulePopup.loading}
        error={schedulePopup.error}
        data={schedulePopup.data}
      />
    </div>
  )
}

export default CarDetailPage
