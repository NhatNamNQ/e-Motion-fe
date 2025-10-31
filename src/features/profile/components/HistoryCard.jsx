import { Badge } from '@/components/ui/badge'

const HistoryCard = ({ image, title, dateRange, price, status, statusClass }) => (
  <div className='mb-4 flex items-center overflow-hidden rounded-2xl bg-white shadow-sm'>
    <img src={image} alt={title} className='h-32 w-48 object-cover' />
    <div className='flex flex-1 flex-col px-8 py-6 md:flex-row md:items-center'>
      <div className='flex-1'>
        <div className='mb-2 text-2xl font-bold'>{title}</div>
        <div className='mb-2 text-gray-500'>{dateRange}</div>
      </div>
      <div className='flex min-w-[160px] flex-col items-end gap-2'>
        {price && (
          <div className='text-right text-2xl font-bold'>{price.toLocaleString('vi-VN')}đ</div>
        )}
        <Badge className={statusClass + ' rounded-full px-6 py-2 text-base'}>{status}</Badge>
      </div>
    </div>
  </div>
)

export default HistoryCard
