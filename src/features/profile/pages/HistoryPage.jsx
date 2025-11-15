import { useEffect, useState } from 'react'
import { profileService } from '../service/profileService'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/selectors/authSelectors'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, X } from 'lucide-react'
import HistoryList from '../components/HistoryList'
import { useDebounce } from 'use-debounce'

const HistoryPage = () => {
  const [reservations, setReservations] = useState([])
  const [rentals, setRentals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tab, setTab] = useState('reservations')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatuses, setSelectedStatuses] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const user = useSelector(selectUser)

  // Debounce search term
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)

  const RESERVATION_STATUSES = ['PENDING', 'CONFIRM', 'COMPLETED', 'CANCELLED', 'OVERDUE']

  const RENTAL_STATUSES = ['CONTRACTING', 'CONFIRM', 'ONGOING', 'OVERDUE', 'COMPLETED', 'CANCELLED']

  const statusLabels = {
    PENDING: 'Chờ xác nhận',
    CONFIRM: 'Đã xác nhận',
    COMPLETED: 'Hoàn thành',
    CANCELLED: 'Đã hủy',
    CONTRACTING: 'Chờ ký hợp đồng',
    ONGOING: 'Đang thuê',
    OVERDUE: 'Quá hạn'
  }

  useEffect(() => {
    setReservations([])
    setRentals([])
    setPage(1)
    setTotalPages(1)
  }, [tab, selectedStatuses, debouncedSearchTerm])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const filterParams = {
          status: selectedStatuses,
          page: page,
          limit: 10,
          search: debouncedSearchTerm
        }

        if (tab === 'reservations') {
          const response = await profileService.viewReservationsHistory(user.email, filterParams)
          if (page === 1) {
            setReservations(response.data)
          } else {
            setReservations((prev) => [...prev, ...response.data])
          }
          setTotalPages(response.totalPages)
        } else if (tab === 'rentals') {
          const response = await profileService.viewRentalsHistory(user.email, filterParams)
          if (page === 1) {
            setRentals(response.data)
          } else {
            setRentals((prev) => [...prev, ...response.data])
          }
          setTotalPages(response.totalPages)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (user?.email) {
      fetchData()
    }
  }, [tab, user.email, page, selectedStatuses, debouncedSearchTerm])

  const toggleStatus = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    )
  }

  const clearFilters = () => {
    setSelectedStatuses([])
    setSearchTerm('')
  }

  const loadMore = () => {
    setPage((prev) => prev + 1)
  }

  const currentStatuses = tab === 'reservations' ? RESERVATION_STATUSES : RENTAL_STATUSES
  const currentData = tab === 'reservations' ? reservations : rentals
  const hasMore = page < totalPages

  if (error)
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-red-500'>Error: {error}</div>
      </div>
    )

  return (
    <div className='w-full py-8'>
      <h1 className='mb-6 text-3xl font-bold'>Lịch sử của tôi</h1>

      {/* Tab Buttons */}
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

      {/* Search Bar */}
      <div className='mb-4'>
        <div className='relative'>
          <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
          <Input
            type='text'
            placeholder='Tìm kiếm theo tên xe'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pr-4 pl-10'
          />
        </div>
      </div>

      {/* Status Filter */}
      <div className='mb-6'>
        <div className='mb-3 flex items-center justify-between'>
          <h3 className='text-sm font-medium'>Lọc theo trạng thái:</h3>
          {(selectedStatuses.length > 0 || searchTerm) && (
            <Button variant='ghost' size='sm' onClick={clearFilters} className='h-8 px-2 text-xs'>
              <X className='mr-1 h-3 w-3' />
              Xóa bộ lọc
            </Button>
          )}
        </div>
        <div className='flex flex-wrap gap-2'>
          {currentStatuses.map((status) => (
            <Badge
              key={status}
              variant={selectedStatuses.includes(status) ? 'default' : 'outline'}
              className={`cursor-pointer transition-all ${
                selectedStatuses.includes(status)
                  ? 'bg-secondary text-background hover:bg-secondary/90'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => toggleStatus(status)}
            >
              {statusLabels[status] || status}
            </Badge>
          ))}
        </div>
      </div>

      {/* History List */}
      <HistoryList
        data={currentData}
        tab={tab}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        isInitialLoad={page === 1}
      />
    </div>
  )
}

export default HistoryPage
