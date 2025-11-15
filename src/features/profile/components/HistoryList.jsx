import { Button } from '@/components/ui/button'
import { formatHourDate, getStatusColor } from '@/lib/utils'
import HistoryCard from './HistoryCard'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner'

const HistoryList = ({ data, tab, loading, hasMore, onLoadMore, isInitialLoad }) => {
  const navigate = useNavigate()

  if (loading && isInitialLoad) {
    return (
      <div className='mt-8 flex justify-center'>
        <Spinner className='text-secondary size-10' />
      </div>
    )
  }

  if (data.length === 0 && !loading) {
    return (
      <div className='rounded-lg bg-white p-12 text-center shadow-sm'>
        <p className='text-lg text-gray-500'>
          {tab === 'reservations'
            ? 'Không tìm thấy đơn đặt chỗ nào.'
            : 'Không tìm thấy hợp đồng thuê xe nào.'}
        </p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      {data.map((item) => (
        <HistoryCard
          key={item.id}
          image={item.vehicleImage || 'https://placehold.co/400x300'}
          title={item.vehicleName}
          location={item.stationName}
          timeInfo={
            tab === 'reservations'
              ? `Đặt lúc: ${formatHourDate(item.createdAt)}`
              : formatHourDate(item.createdAt)
          }
          status={item.status}
          statusClass={getStatusColor(item.status)}
          onClick={() =>
            navigate(
              tab === 'reservations'
                ? `/account/reservations/${item.id}`
                : `/account/rentals/${item.id}`
            )
          }
        />
      ))}

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className='flex justify-center pt-4'>
          <Button variant='outline' onClick={onLoadMore}>
            Xem thêm
          </Button>
        </div>
      )}

      {/* Loading More */}
      {loading && !isInitialLoad && (
        <div className='flex justify-center py-4'>
          <div className='border-t-secondary h-8 w-8 animate-spin rounded-full border-4 border-gray-200' />
        </div>
      )}
    </div>
  )
}

export default HistoryList
