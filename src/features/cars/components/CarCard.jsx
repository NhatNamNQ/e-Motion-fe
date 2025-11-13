import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { BatteryCharging, CarFront, UsersRound, Battery, BatteryFull, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const CarCard = ({ car, isUnavailabel, handleViewSchedule }) => {
  return (
    <Link to={`/cars/${car.id}`} className='h-[450px]'>
      <div className='cursor-pointer rounded-md border'>
        <div className='relative'>
          <img
            src={
              car.main ||
              'https://placehold.co/200x200?text=Xe%20t%E1%BA%A1m%20th%E1%BB%9Di%20ch%C6%B0a%20c%C3%B3%20%E1%BA%A3nh'
            }
            alt={car.name}
            className='h-56 w-full rounded-t-md object-cover'
          />
          <div
            className={`absolute top-2 right-2 rounded-sm bg-white px-2 py-1 text-center text-sm`}
          >
            <div className='flex items-center justify-center gap-2'>
              <Star size={16} className='fill-amber-300 text-amber-300' />
              {car.point}
            </div>
          </div>
        </div>
        <div className='p-4 text-sm'>
          <div className='min-h-[5rem]'>
            <p className='line-clamp-2 text-xl font-bold'>{car.name}</p>
            <p className='text-slate-700'>
              {car.station.name} - {car.station.city}
            </p>
          </div>
          <div className='pb-4 text-end'>
            <p className='text-xl'>
              <span className='text-secondary'>
                {formatCurrency(car.priceRate)}
                <span className='text-secondary text-base font-bold'> / {car.hourRate} giờ</span>
              </span>
            </p>
          </div>
          <div className='grid grid-cols-2 gap-x-2 gap-y-3 border-t-2 border-t-slate-100 pt-4'>
            <div className='flex items-center gap-2'>
              <UsersRound className='h-4 w-4 text-gray-500' />
              <span className='text-sm'>{car.seats} chỗ</span>
            </div>
            <div className='flex items-center gap-2'>
              <BatteryFull className='h-4 w-4 text-gray-500' />
              <span className='text-sm'>{car.batteryCapacity} kWh</span>
            </div>
            <div className='flex items-center gap-2'>
              <CarFront className='h-4 w-4 text-gray-500' />
              <span className='text-sm'>{car.category}</span>
            </div>
            <div className='flex items-center gap-2'>
              <BatteryCharging className='h-4 w-4 text-gray-500' />
              <span className='text-sm'>{car.consumptionRate} Wh/km</span>
            </div>
          </div>
          {isUnavailabel && (
            <Button
              className='bg-secondary hover:bg-secondary/80 mt-4 w-full'
              onClick={(e) => {
                e.preventDefault()
                handleViewSchedule(car.id)
              }}
            >
              Xem lịch trình
            </Button>
          )}
        </div>
      </div>
    </Link>
  )
}

export default CarCard
