import { formatCurrency } from '@/lib/utils'

const PriceBreakdown = ({ car }) => {
  return (
    <div className='space-y-4 border-t pt-4'>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-bold text-gray-600'>Phí thuê xe</span>
        <span className='text-sm font-bold text-gray-600'>
          {formatCurrency(car.depositFee, 'VND')}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-bold text-gray-600'>Thuế VAT</span>
        <span className='text-sm font-bold text-gray-600'>294.000đ</span>
      </div>
      <div className='flex items-center justify-between text-lg font-bold'>
        <span className='text-gray-800'>Tổng cộng tiền thuê</span>
        <span className='text-blue-500'>3.469.000đ</span>
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-bold text-gray-600'>Tổng giữ chỗ</span>
        <span className='text-sm font-bold text-gray-600'>500.000đ</span>
      </div>
      <p className='text-xs text-gray-400'>
        Tiền giữ chỗ không phải phụ phí và sẽ được hoàn lại sau chuyến đi. Lưu ý: Tham khảo chính
        sách hoàn giữ chỗ khi huỷ chuyến.
      </p>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-bold text-gray-600'>Cọc xe</span>
        <span className='text-sm font-bold text-gray-600'>10.000.000đ</span>
      </div>
      <p className='text-xs text-gray-400'>
        Thanh toán khi nhận xe và kiểm tra xe, không nhận cọc xe máy. Lưu ý: Mức cọc sẽ cao hơn đối
        với bằng lái mới được cấp dưới 1 năm.
      </p>
    </div>
  )
}

export default PriceBreakdown
