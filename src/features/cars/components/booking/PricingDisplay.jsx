import { formatCurrency } from '@/lib/utils'

const PricingDisplay = ({ car }) => {
  return (
    <section className='mb-6'>
      <div className='mb-2 flex items-baseline gap-2'>
        <h2 className='text-2xl font-semibold'>Thông tin giá xe</h2>
      </div>
      <div className='grid grid-cols-2'>
        <span className='flex items-baseline gap-1 py-2'>
          <span className='text-lg font-bold text-blue-500'>
            {formatCurrency(car.pricePer4Hours, 'VND')}
          </span>
          <span className='text-sm text-gray-500'>/4 giờ</span>
        </span>
        <span className='flex items-baseline gap-1 py-2'>
          <span className='text-lg font-bold text-blue-500'>
            {formatCurrency(car.pricePer8Hours, 'VND')}
          </span>
          <span className='text-sm text-gray-500'>/8 giờ</span>
        </span>
        <span className='flex items-baseline gap-1 py-2'>
          <span className='text-lg font-bold text-blue-500'>
            {formatCurrency(car.pricePer12Hours, 'VND')}
          </span>
          <span className='text-sm text-gray-500'>/12 giờ</span>
        </span>
        <span className='flex items-baseline gap-1 py-2'>
          <span className='text-lg font-bold text-blue-500'>
            {formatCurrency(car.pricePerDay, 'VND')}
          </span>
          <span className='text-sm text-gray-500'>/24 giờ</span>
        </span>
      </div>
    </section>
  )
}

export default PricingDisplay
