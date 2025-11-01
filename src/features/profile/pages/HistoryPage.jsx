import { useEffect, useState } from 'react'
import { profileService } from '../service/profileService'
import { getStatusColor } from '@/lib/utils'
import Loader from '@/components/Loader'
import HistoryCard from '../components/HistoryCard'

const HistoryPage = () => {
  const [reservations, setReservations] = useState([])
  const [rentals, setRentals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tab, setTab] = useState('reservations')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const [reservationsData, rentalsData] = await Promise.all([
          profileService.viewReservationsHistory(),
          profileService.viewRentalsHistory()
        ])
        setReservations(reservationsData)
        setRentals(rentalsData)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  if (loading) return <Loader />
  if (error)
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-red-500'>Error: {error}</div>
      </div>
    )

  return (
    <div className='min-h-screen w-full bg-gray-50 px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Lịch sử</h1>
      <div className='mb-6 flex gap-4'>
        <button
          className={`rounded px-4 py-2 ${tab === 'reservations' ? 'bg-secondary text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('reservations')}
        >
          Lịch sử đặt chỗ
        </button>
        <button
          className={`rounded px-4 py-2 ${tab === 'rentals' ? 'bg-secondary text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('rentals')}
        >
          Lịch sử thuê xe
        </button>
      </div>

      <div>
        {tab === 'reservations' ? (
          reservations.length === 0 ? (
            <div className='py-12 text-center'>
              <p className='text-lg text-gray-500'>Không có lịch sử đặt chỗ nào.</p>
            </div>
          ) : (
            reservations.map((reservation) => (
              <HistoryCard
                key={reservation.code}
                image={reservation.vehicle.images[0] || 'https://placehold.co/400x300'}
                title={reservation.vehicle.name}
                dateRange={`${formatDate(reservation.createdAt)} - ${formatDate(reservation.endTime)}`}
                price={reservation.totalPrice}
                status={reservation.status}
                statusClass={getStatusColor(reservation.status)}
              />
            ))
          )
        ) : rentals.length === 0 ? (
          <div className='py-12 text-center'>
            <p className='text-lg text-gray-500'>Không có lịch sử thuê xe nào.</p>
          </div>
        ) : (
          rentals.map((rental) => (
            <HistoryCard
              key={rental.id}
              image={rental.vehicle.isMain || 'https://placehold.co/400x300'}
              title={rental.vehicle.name}
              dateRange={`${formatDate(rental.startTime)} - ${formatDate(rental.endTime)}`}
              price={rental.totalPrice}
              status={rental.status}
              statusClass={getStatusColor(rental.status)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default HistoryPage
