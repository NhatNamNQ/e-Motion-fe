import { Calendar, MapPin, User, Shield, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const BookingForm = ({ car, onSubmit, submitLoading }) => {
  const startDate = '07/10/2025'
  const endDate = '09/10/2025'
  const startTime = '18:00'
  const endTime = '22:00'
  return (
    <Card className='shadow-lg'>
      <CardContent className='p-8'>
        <h1 className='mb-8 text-center text-2xl font-bold text-gray-800'>Thông tin đặt xe</h1>
        {/* Car Info Display */}
        <div className='mb-6 rounded-lg bg-blue-50 p-4'>
          <div className='flex items-center gap-4'>
            {car.images && car.images[0] && (
              <img
                src={car.images[0]}
                alt={car.name}
                className='h-16 w-24 rounded-lg object-cover'
              />
            )}
            <div>
              <p className='font-semibold text-gray-800'>{car.name}</p>
            </div>
          </div>
        </div>

        {/* Order Info Section */}
        <div className='mb-8'>
          <h2 className='mb-6 text-lg font-semibold text-gray-800'>Thông tin đơn hàng</h2>

          {/* Time Info */}
          <div className='mb-4 flex items-center gap-3'>
            <Calendar className='text-secondary h-5 w-5' />
            <div>
              <div className='font-medium text-gray-800'>Thời gian thuê</div>
              <div className='text-sm text-gray-600'>
                {startTime}, {startDate} đến {endTime}, {endDate}
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className='flex items-center gap-3'>
            <MapPin className='text-secondary h-5 w-5' />
            <div>
              <div className='text-sm text-gray-600'>Nhận xe tại địa chỉ cửa hàng</div>
              <div className='font-medium text-gray-800'>
                {car.address || 'Địa chỉ sẽ được cập nhật'}
              </div>
            </div>
          </div>
        </div>

        <hr className='my-6' />

        {/* Pricing Section */}
        <div className='mb-8 space-y-4'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Phí thuê xe</span>
            <span className='font-medium'>{formatCurrency(car.pricePer4Hours)}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Thuế VAT</span>
            <span className='font-medium'>{formatCurrency(car.vatFee)}</span>
          </div>
          <hr />
          <div className='flex justify-between text-lg font-semibold'>
            <span>Tổng cộng tiền thuê</span>
            <span>{formatCurrency(car.totalFee)}</span>
          </div>
        </div>

        <hr className='my-6' />

        {/* Payment Steps */}
        <div className='mb-8'>
          <h3 className='mb-4 font-semibold text-gray-800'>Các bước thanh toán</h3>

          {/* Step 1 */}
          <div className='mb-4 flex items-start gap-3'>
            <div className='bg-secondary flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white'>
              1
            </div>
            <div className='flex-1'>
              <div className='flex justify-between'>
                <span className='font-medium'>Thanh toán giữ chỗ qua e-Motion</span>
                <span className='font-bold text-blue-600'>500.000đ</span>
              </div>
              <p className='text-sm text-gray-600'>
                Tiền này để xác nhận đơn thuê xe giữ chỗ. Số được trừ vào tổng tiền thuê khi nhận xe
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className='flex items-start gap-3'>
            <div className='bg-secondary flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white'>
              2
            </div>
            <div className='flex-1'>
              <div className='flex justify-between'>
                <span className='font-medium'>Thanh toán khi nhận xe</span>
                <span className='font-bold'>{formatCurrency(car.totalFee - 500000)}</span>
              </div>
              <div className='mt-2 space-y-1 text-sm text-gray-600'>
                <div className='flex justify-between'>
                  <span>Tiền thuê</span>
                  <span>{formatCurrency(car.rentFee)}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Tiền cọc xe</span>
                  <div>
                    <span className='mr-2 line-through'>{formatCurrency(car.depositFee)}</span>
                    <span>{formatCurrency(car.depositFee - 500000)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <Button
          onClick={onSubmit}
          disabled={submitLoading}
          className='bg-secondary w-full cursor-pointer py-3 text-lg font-semibold hover:bg-blue-600 disabled:opacity-50'
        >
          {submitLoading ? 'Đang xử lý...' : 'Xác nhận'}
        </Button>

        {/* Terms */}
        <p className='mt-4 text-center text-sm text-gray-500'>
          Bằng việc chuyển giữ chỗ và thuê xe, bạn đồng ý với{' '}
          <span className='text-secondary cursor-pointer font-medium hover:underline'>
            Điều khoản sử dụng
          </span>{' '}
          và{' '}
          <span className='text-secondary cursor-pointer font-medium hover:underline'>
            Chính sách bảo mật
          </span>
        </p>
      </CardContent>
    </Card>
  )
}

export default BookingForm
