import { BatteryCharging, BatteryFull, CarFront, UsersRound } from 'lucide-react'

const CarCard = ({ car }) => {
  console.log(car)
  return (
    <div className='rounded-md border'>
      <div className='relative'>
        <img
          src='https://placehold.co/282x210?text=Card'
          alt={car.name}
          width={282}
          height={210}
          className='w-full rounded-md'
        />
        <div
          className={`absolute top-4 right-4 h-[40px] w-[90px] rounded-sm border p-2 text-center ${car.status === 'Sẵn có' ? 'bg-green-400' : 'bg-red-400'}`}
        >
          {car.status}
        </div>
      </div>
      <div className='p-4 text-sm'>
        <div>
          <p className='text-xl font-bold'>{car.name}</p>
          <p className='text-slate-700'>{car.district}</p>
        </div>
        <div className='text-end'>
          <p className='text-xl'>
            <span className='text-secondary'>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'VND'
              }).format(car.price)}
              /ngày
            </span>
          </p>
          <p className='text-slate-700'>Giá tạm tính chưa bao gồm thuế VAT</p>
        </div>
        <div className='mt-4 flex justify-center border-t-2 border-t-slate-100'>
          <div className='grid grid-cols-2 gap-x-12 gap-y-3 p-2 pt-4'>
            <div className='flex items-center gap-2'>
              <CarFront className='h-7 w-7' /> {car.type}
            </div>
            <div className='flex items-center gap-2'>
              <BatteryCharging className='h-7 w-7' /> {car.consumption}
            </div>
            <div className='flex items-center gap-2'>
              <UsersRound className='h-7 w-7' />
              {car.seats} chỗ
            </div>
            <div className='flex items-center gap-2'>
              <BatteryFull className='h-7 w-7' /> {car.battery}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarCard
