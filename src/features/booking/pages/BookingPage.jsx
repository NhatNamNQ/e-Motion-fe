import { Button } from '@/components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'
import BookingForm from '../components/BookingForm'
import BookingProgress from '../components/BookingProgress'
import { useSelector } from 'react-redux'
import { selectBookingFees, selectSelectedCar } from '@/store/selectors/carsSelectors'
import { selectEndTime, selectSearchForm, selectStartTime } from '@/store/selectors/searchSelectors'
import { selectUser } from '@/store/selectors/authSelectors'
import { bookingService } from '../services/bookingService'
import { toast } from 'sonner'
import SuccessPaymentCard from '../../../components/SuccessPaymentCard'
import FailedPaymentCard from '../../../components/FailedPaymentCard'

const BookingPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const payment = location?.state?.payment
  const status = payment?.status || location?.state?.status
  const txnRef = payment?.txnRef
  console.log(location)

  const user = useSelector(selectUser)
  const car = useSelector(selectSelectedCar)
  const bookingFees = useSelector(selectBookingFees)
  const searchForm = useSelector(selectSearchForm)
  const startTime = useSelector(selectStartTime)
  const endTime = useSelector(selectEndTime)

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
    navigate(`/account/reservations/${payment.reservationResponse.code}`)
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
          />
        )}
      </div>
    </div>
  )
}

export default BookingPage
