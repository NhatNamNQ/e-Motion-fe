import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin } from 'lucide-react'

const HistoryCard = ({ image, title, location, timeInfo, status, statusClass, onClick }) => (
  <div
    className='mb-4 flex cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-sm transition hover:shadow-md md:flex-row'
    onClick={onClick}
  >
    <img src={image} alt={title} className='h-48 w-full object-cover md:h-40 md:w-56' />
    <div className='flex flex-1 flex-col justify-between p-4 md:p-6'>
      <div>
        <h3 className='mb-2 text-xl font-bold'>{title}</h3>
        <div className='mb-2 flex items-center gap-2 text-sm text-gray-600'>
          <MapPin size={16} />
          <span>{location}</span>
        </div>
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <Calendar size={16} />
          <span>{timeInfo}</span>
        </div>
      </div>
      <div className='flex items-center justify-end'>
        <Badge className={`${statusClass} rounded-full px-4 py-1`}>{status}</Badge>
      </div>
    </div>
  </div>
)

export default HistoryCard
