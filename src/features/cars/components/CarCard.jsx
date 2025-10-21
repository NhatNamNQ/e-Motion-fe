import { BatteryCharging, BatteryFull, CarFront, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'

const CarCard = ({ car }) => {
  return (
    <Link to={`/cars/${car.id}`}>
      <div className='cursor-pointer rounded-md border'>
        <div className='relative'>
          <img src={car.isMain} alt={car.name} className='h-56 w-full rounded-t-md object-cover' />
          <div
            className={`text-background absolute top-4 right-4 rounded-sm px-2 py-1 text-center text-sm ${car.status === 'Sẵn sàng' ? 'bg-green-400' : 'bg-red-400'}`}
          >
            {car.status}
          </div>
        </div>
        <div className='p-4 text-sm'>
          <div>
            <p className='text-xl font-bold'>{car.name}</p>
            <p className='text-slate-700'>{car.city}</p>
          </div>
          <div className='text-end'>
            <p className='text-xl'>
              <span className='text-secondary'>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'VND'
                }).format(car.priceRate)}
                / <span className='text-secondary text-base font-bold'>/4 giờ</span>
              </span>
            </p>
            <p className='text-slate-700'>Giá tạm tính chưa bao gồm thuế VAT</p>
          </div>
          <div className='flex items-center justify-evenly border-t-2 border-t-slate-100 pt-4'>
            <div className='mr-auto flex flex-col items-center'>
              <UsersRound className='h-5 w-5' />
              {car.seats} chỗ
            </div>
            <div className='flex flex-col items-center'>
              <CarFront className='h-5 w-5' /> {car.category}
            </div>
            <div className='ml-auto flex flex-col items-center'>
              <BatteryCharging className='h-5 w-5' /> {car.consumptionRate}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CarCard
