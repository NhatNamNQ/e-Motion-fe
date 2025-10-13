import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'react-router-dom'
import instance from '@/lib/axios'
import BookingForm from '../components/BookingForm'
import SuccessBooking from '../components/SuccessBooking'
import BookingProgress from '../components/BookingProgress'
import FailedBooking from '../components/FailedBooking'

const BookingPage = () => {
  const [searchParams] = useSearchParams()
  const status = searchParams.get('status')
  const txnRef = searchParams.get('txnRef')

  const [car, setCar] = useState(null)
  const [submitLoading, setSubmitLoading] = useState(false)

  useEffect(() => {
    const fetchCarDetails = () => {
      try {
        const cachedCarData = localStorage.getItem('carData')
        const carData = JSON.parse(cachedCarData)
        setCar(carData)
      } catch (error) {
        console.error('Error fetching car details:', error)
      }
    }

    fetchCarDetails()
  }, [])

  const onSubmit = async () => {
    try {
      setSubmitLoading(true)
      const { data } = await instance.post('/reservations', {
        userEmail: 'nhatnam13112005@gmail.com',
        vehicleId: 2,
        stationId: 1,
        startTime: '2027-10-14T03:00:00',
        endTime: '2027-10-17T07:00:00'
      })

      window.location.href = data.data.vnpayUrl
    } catch (error) {
      console.error('Error creating reservation:', error)
    } finally {
      setSubmitLoading(false)
    }
  }

  if (!car) {
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
          status === 'success' ? (
            <SuccessBooking car={car} txnRef={txnRef} />
          ) : (
            <FailedBooking />
          )
        ) : (
          <BookingForm onSubmit={onSubmit} submitLoading={submitLoading} car={car} />
        )}
      </div>
    </div>
  )
}

export default BookingPage
