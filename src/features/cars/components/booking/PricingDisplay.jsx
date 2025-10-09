import { formatCurrency } from '@/lib/utils'

const PricingDisplay = ({ car }) => {
  return (
    <section className='mb-6'>
      <div className='mb-2 flex items-baseline gap-2'>
        <span className='text-2xl font-bold text-blue-500'>
          {formatCurrency(car.pricePer4Hours, 'VND')}
        </span>
        <span className='text-base font-bold text-blue-500'>/4 giờ</span>
      </div>
      <div className='flex flex-wrap gap-4 text-sm text-gray-500'>
        <span>{`${formatCurrency(car.pricePer8Hours, 'VND')} /8 giờ`}</span>
        <span>{`${formatCurrency(car.pricePer12Hours, 'VND')} /12 giờ`}</span>
        <span>{`${formatCurrency(car.pricePerDay, 'VND')} /ngày`}</span>
      </div>
      <p className='mt-2 text-xs text-gray-500'>
        Đơn giá gói chỉ áp dụng cho ngày thường. Giá ngày Lễ / Tết có thể điều chỉnh theo nhu cầu.
      </p>
    </section>
  )
}

export default PricingDisplay
