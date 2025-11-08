import { useEffect, useState } from 'react'
import { profileService } from '../service/profileService'
import { formatHourDate, getStatusColor } from '@/lib/utils'
import Loader from '@/components/Loader'
import HistoryCard from '../components/HistoryCard'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/selectors/authSelectors'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const HistoryPage = ({ user }) => {
  const [reservations, setReservations] = useState([])
  const [rentals, setRentals] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tab, setTab] = useState('reservations')

  const currentUser = useSelector(selectUser)
  if (user == null) {
    user = currentUser
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const [reservationsData, rentalsData] = await Promise.all([
          profileService.viewReservationsHistory(user.email),
          profileService.viewRentalsHistory(user.email)
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
  }, [user.email])

  if (loading) return <Loader />
  if (error)
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-red-500'>Error: {error}</div>
      </div>
    )

  return (
    <div className='w-full py-8'>
      <h1 className='mb-6 text-3xl font-bold'>Lịch sử của tôi</h1>
      <div className='mb-6 flex gap-3'>
        <Button
          variant={tab === 'reservations' ? 'default' : 'outline'}
          onClick={() => setTab('reservations')}
          className={`rounded-lg ${
            tab === 'reservations' ? 'bg-secondary text-background hover:bg-secondary/90' : ''
          }`}
        >
          Lịch sử đặt chỗ
        </Button>
        <Button
          variant={tab === 'rentals' ? 'default' : 'outline'}
          onClick={() => setTab('rentals')}
          className={`rounded-lg ${
            tab === 'rentals' ? 'bg-secondary text-background hover:bg-secondary/90' : ''
          }`}
        >
          Lịch sử thuê xe
        </Button>
      </div>

      <div className='space-y-4'>
        {tab === 'reservations' ? (
          reservations.length === 0 ? (
            <div className='rounded-lg bg-white p-12 text-center shadow-sm'>
              <p className='text-lg text-gray-500'>Bạn chưa có đơn đặt chỗ nào.</p>
            </div>
          ) : (
            reservations.map((reservation) => (
              <HistoryCard
                key={reservation.code}
                image={reservation.vehicle.images[0]?.url || 'https://placehold.co/400x300'}
                title={reservation.vehicle.name}
                location={reservation.vehicle.station.name}
                timeInfo={`Đặt lúc: ${formatHourDate(reservation.createdAt)}`}
                status={reservation.status}
                statusClass={getStatusColor(reservation.status)}
                onClick={() => navigate(`/account/reservations/${reservation.code}`)}
              />
            ))
          )
        ) : rentals.length === 0 ? (
          <div className='rounded-lg bg-white p-12 text-center shadow-sm'>
            <p className='text-lg text-gray-500'>Bạn chưa có hợp đồng thuê xe nào.</p>
          </div>
        ) : (
          rentals.map((rental) => (
            <HistoryCard
              key={rental.id}
              image={rental.vehicle.images[0]?.url || 'https://placehold.co/400x300'}
              title={rental.vehicle.name}
              location={rental.vehicle.station.name}
              timeInfo={`${formatHourDate(rental.startTime)} - ${formatHourDate(rental.endTime)}`}
              status={rental.status}
              statusClass={getStatusColor(rental.status)}
              onClick={() => navigate(`/account/rentals/${rental.id}`)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default HistoryPage
