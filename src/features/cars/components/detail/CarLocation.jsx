import MapboxMap from '@/components/MapboxMap'
import { stations } from '../../constants/mockData'
import { MapPin } from 'lucide-react'

const CarLocation = ({ car }) => {
  return (
    <section>
      <h2 className='text-2xl font-extrabold text-gray-700'>Vị trí xe</h2>
      <div className='bg-secondary mt-2 h-1 w-10 rounded-full' />
      <div className='mb-4 flex items-center text-gray-500'>
        <MapPin className='mr-2 h-4 w-4' />
        <span>{car.address}</span>
      </div>
      <div className='rounded-lg'>
        <MapboxMap station={stations[0]} />
      </div>
    </section>
  )
}

export default CarLocation
