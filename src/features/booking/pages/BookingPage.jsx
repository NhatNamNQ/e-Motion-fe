import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Loader from '@/components/Loader'
import instance from '@/lib/axios'
import BookingForm from '../components/BookingForm'

const BookingPage = () => {
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
        startTime: '2026-10-14T03:00:00',
        endTime: '2026-10-17T07:00:00'
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
  return <BookingForm onSubmit={onSubmit} submitLoading={submitLoading} car={car} />
}

export default BookingPage
