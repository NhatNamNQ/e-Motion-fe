import MapboxMap from '@/components/MapboxMap'
import { Landmark, MapPin } from 'lucide-react'

const CarLocation = ({ car }) => {
  return (
    <section>
      <h2 className='text-2xl font-extrabold text-gray-700'>Vị trí xe</h2>
      <div className='bg-secondary my-2 h-1 w-10 rounded-full' />
      <div className='mb-4 flex items-center text-gray-500'>
        <Landmark className='text-secondary mr-2 h-4 w-4' />
        <span>{car.station.name}</span>
      </div>
      <div className='mb-4 flex items-center text-gray-500'>
        <MapPin className='text-secondary mr-2 h-4 w-4' />
        <span>{car.station.address}</span>
      </div>
      <div className='rounded-lg'>
        <MapboxMap station={car.station} />
      </div>
    </section>
  )
}

export default CarLocation
