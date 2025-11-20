import { Button } from '@/components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'
import BookingForm from '../components/BookingForm'
import BookingProgress from '../components/BookingProgress'
import { useSelector, useDispatch } from 'react-redux'
import { selectBookingFees, selectSelectedCar } from '@/store/selectors/carsSelectors'
import { selectEndTime, selectSearchForm, selectStartTime } from '@/store/selectors/searchSelectors'
import { selectUser } from '@/store/selectors/authSelectors'
import { bookingService } from '../services/bookingService'
import { toast } from 'sonner'
import SuccessPaymentCard from '../../../components/SuccessPaymentCard'
import FailedPaymentCard from '../../../components/FailedPaymentCard'
import { useEffect } from 'react'
import { getCarDetail } from '@/store/actions/carsActions'

const BookingPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const payment = location?.state?.payment
  const status = payment?.status || location?.state?.status
  const txnRef = payment?.txnRef

  const authUser = useSelector(selectUser)
  const renterUser = useSelector((state) => state.renter.user)
  const user = authUser.role !== 'ROLE_USER' ? renterUser : authUser
  console.log('BookingPage user:', user)

  const car = useSelector(selectSelectedCar)
  const bookingFees = useSelector(selectBookingFees)
  const searchForm = useSelector(selectSearchForm)
  const startTime = useSelector(selectStartTime)
  const endTime = useSelector(selectEndTime)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!car) {
      const persistCars = localStorage.getItem('persist:cars')
      if (persistCars) {
        const carsState = JSON.parse(persistCars)
        const selectedCarData = carsState.selectedCar && JSON.parse(carsState.selectedCar)
        if (selectedCarData && selectedCarData.id) {
          dispatch(getCarDetail(selectedCarData.id))
        }
      }
    }
  }, [car, dispatch])

  const onSubmit = async () => {
    try {
      const { data } = await bookingService.bookReservation({
        userEmail: user.email,
        vehicleId: car.id,
        stationId: car.station.id,
        startTime,
        endTime
      })
      window.location.href = data.vnpayUrl
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleViewReservationDetail = () => {
    navigate(`/account/reservations/${payment.reservationResponse.id}`)
  }

  if (!car && !status) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h1 className='mb-2 text-2xl font-bold text-gray-700'>Không tìm thấy thông tin đặt xe</h1>
          <p className='text-gray-500'>Vui lòng quay lại trang chọn xe.</p>
          <Button onClick={() => window.history.back()} className='mt-4'>
            Quay lại
          </Button>
        </div>
      </div>
    )
  }
  return (
    <div className='h-full bg-gray-50 py-8'>
      <div className='container mx-auto max-w-4xl px-4'>
        <BookingProgress status={status} />
        {status ? (
          status === 'SUCCESS' ? (
            <SuccessPaymentCard txnRef={txnRef} onNavigate={handleViewReservationDetail} />
          ) : (
            <FailedPaymentCard />
          )
        ) : (
          <BookingForm
            onSubmit={onSubmit}
            bookingFees={bookingFees}
            car={car}
            searchForm={searchForm}
            user={user}
          />
        )}
      </div>
    </div>
  )
}

export default BookingPage
