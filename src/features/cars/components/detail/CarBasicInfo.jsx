import { MapPin, Share2, Users, Fuel } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CarBasicInfo = ({ car }) => {
  return (
    <>
      {/* Car Info Header */}
      <section>
        <div className='mb-4 flex items-start justify-between'>
          <div>
            <h1 className='mb-2 text-3xl font-black text-gray-700'>{car.name}</h1>
            <div className='mb-2 flex items-center text-gray-500'>
              <MapPin className='text-secondary mr-2 h-4 w-4' />
              <span>{car.address}</span>
            </div>
          </div>
          <Button variant='outline' size='sm' className='flex items-center gap-2'>
            <Share2 className='text-secondary h-4 w-4' />
            Chia sẻ
          </Button>
        </div>
        <hr className='border-gray-200' />
      </section>
      {/* Features */}
      <section>
        <h2 className='text-2xl font-extrabold text-gray-700'>Đặc điểm</h2>
        <div className='bg-secondary mt-2 h-1 w-10 rounded-full' />
        <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
          <div className='flex items-center space-x-3'>
            <Users className='h-5 w-5 text-blue-500' />
            <div>
              <p className='text-sm text-gray-500'>Số ghế</p>
              <p className='font-bold text-gray-800'>{car.seats}</p>
            </div>
          </div>
          <div className='flex items-center space-x-3'>
            <Fuel className='h-5 w-5 text-blue-500' />
            <div>
              <p className='text-sm text-gray-500'>Nhiên liệu</p>
              <p className='font-bold text-gray-800'>{car.batteryCapacity}</p>
            </div>
          </div>
          <div className='flex items-center space-x-3'>
            <Fuel className='h-5 w-5 text-blue-500' />
            <div>
              <p className='text-sm text-gray-500'>Tiêu hao</p>
              <p className='font-bold text-gray-800'>{car.consumptionRate}</p>
            </div>
          </div>
        </div>
      </section>
      {/* Description */}
      <section>
        <h2 className='text-2xl font-extrabold text-gray-700'>Mô tả</h2>
        <div className='bg-secondary mt-2 h-1 w-10 rounded-full' />
        <p className='leading-relaxed text-gray-700'>{car.description}</p>
      </section>
    </>
  )
}

export default CarBasicInfo
