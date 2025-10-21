import { formatCurrency } from '@/lib/utils'

const PriceBreakdown = ({ bookingFees }) => {
  const { deposit, vat, booking, total } = bookingFees
  return (
    <div className='space-y-4 border-t pt-4'>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-bold text-gray-600'>Phí thuê xe</span>
        <span className='text-sm font-bold text-gray-600'>{formatCurrency(booking)}</span>
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-bold text-gray-600'>Thuế VAT</span>
        <span className='text-sm font-bold text-gray-600'>{formatCurrency(vat)}</span>
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-bold text-gray-600'>Cọc xe</span>
        <span className='text-sm font-bold text-gray-600'>{formatCurrency(deposit)}</span>
      </div>
      <div className='flex items-center justify-between text-lg font-bold'>
        <span className='text-gray-800'>Tổng cộng tiền thuê</span>
        <span className='text-secondary'>{formatCurrency(total)}</span>
      </div>
      <p className='text-xs text-gray-400'>
        Thanh toán khi nhận xe và kiểm tra xe, không nhận cọc xe máy. Lưu ý: Mức cọc sẽ cao hơn đối
        với bằng lái mới được cấp dưới 1 năm.
      </p>
    </div>
  )
}

export default PriceBreakdown
