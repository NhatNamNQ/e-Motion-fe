import { MapPin } from 'lucide-react'

const PickupLocation = ({ car }) => {
  return (
    <div className='border-secondary mb-6 rounded-lg border-2 p-4'>
      <div className='mb-4 flex items-center gap-3'>
        <div className='bg-secondary h-5 w-5 rounded-full'>
          <div className='m-1.25 h-2.5 w-2.5 rounded-full bg-white' />
        </div>
        <span className='text-sm font-bold text-gray-700'>Khách nhận tại vị trí xe đậu</span>
      </div>
      <div className='flex items-center gap-3'>
        <MapPin className='text-secondary h-5 w-5' />
        <p className='text-base font-semibold text-gray-700'>{car.station.address}</p>
      </div>
    </div>
  )
}

export default PickupLocation
