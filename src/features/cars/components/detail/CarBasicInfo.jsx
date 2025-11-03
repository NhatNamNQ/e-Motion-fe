import { MapPin, Share2, Users, Fuel, BatteryFull, BatteryCharging, Car, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CarBasicInfo = ({ car }) => {
  return (
    <>
      {/* Car Info Header */}
      <section>
        <div className='mb-4 flex items-start justify-between'>
          <div>
            <h1 className='mb-2 text-3xl font-black text-gray-700'>{car.name}</h1>
            <div className='mb-2 flex items-center'>
              <MapPin className='text-secondary mr-2 h-4 w-4' />
              <span>{car.station.address}</span>
            </div>
          </div>
        </div>
        <hr className='border-gray-200' />
      </section>
      {/* Features */}
      <section>
        <h2 className='text-2xl font-extrabold text-gray-700'>Đặc điểm</h2>
        <div className='bg-secondary my-2 h-1 w-10 rounded-full' />
        <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
          <div className='flex items-center space-x-3'>
            <Users className='text-secondary h-5 w-5' />
            <div>
              <p className='text-sm text-gray-500'>Số ghế</p>
              <p className='font-bold text-gray-800'>{car.seats}</p>
            </div>
          </div>
          <div className='flex items-center space-x-3'>
            <BatteryFull className='text-secondary h-5 w-5' />
            <div>
              <p className='text-sm text-gray-500'>Dung lượng pin </p>
              <p className='font-bold text-gray-800'>{car.batteryCapacity}</p>
            </div>
          </div>
          <div className='flex items-center space-x-3'>
            <Fuel className='text-secondary h-5 w-5' />
            <div>
              <p className='text-sm text-gray-500'>Tiêu hao</p>
              <p className='font-bold text-gray-800'>{car.consumptionRate}</p>
            </div>
          </div>
          <div className='flex items-center space-x-3'>
            <BatteryCharging className='text-secondary h-5 w-5' />
            <div>
              <p className='text-sm text-gray-500'>Mức pin hiện tại (%)</p>
              <p className='font-bold text-gray-800'>{car.batteryLevel}</p>
            </div>
          </div>
          <div className='flex items-center space-x-3'>
            <Car className='text-secondary h-5 w-5' />
            <div>
              <p className='text-sm text-gray-500'>Hãng xe</p>
              <p className='font-bold text-gray-800'>{car.brand}</p>
            </div>
          </div>
          <div className='flex items-center space-x-3'>
            <Tag className='text-secondary h-5 w-5' />
            <div>
              <p className='text-sm text-gray-500'>Phân khúc</p>
              <p className='font-bold text-gray-800'>{car.category}</p>
            </div>
          </div>
        </div>
      </section>
      {/* Description */}
      <section>
        <h2 className='text-2xl font-extrabold text-gray-700'>Mô tả</h2>
        <div className='bg-secondary my-2 h-1 w-10 rounded-full' />
        <p className='leading-relaxed text-gray-700'>{car.description}</p>
      </section>
    </>
  )
}

export default CarBasicInfo
