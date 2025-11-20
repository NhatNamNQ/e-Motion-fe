import { Calendar, MapPin, Mail } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency, formatHourDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useSelector } from 'react-redux'
import { selectEndTime, selectStartTime } from '@/store/selectors/searchSelectors'
import { selectBookingFees, selectSelectedCar } from '@/store/selectors/carsSelectors'
import { useState } from 'react'
import { rentalService } from '@/features/dashboard/services/rentalService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { selectUser } from '@/store/selectors/authSelectors'

const CheckingRentalPage = () => {
  const navigate = useNavigate()

  const startTime = useSelector(selectStartTime)
  const endTime = useSelector(selectEndTime)
  const car = useSelector(selectSelectedCar)
  const bookingFees = useSelector(selectBookingFees)
  const renter = useSelector((state) => state.renter.user)
  const staff = useSelector(selectUser)

  const [submitLoading, setSubmitLoading] = useState(false)

  const handleCreateRental = async () => {
    try {
      setSubmitLoading(true)
      const res = await rentalService.createRental(
        startTime,
        endTime,
        car.id,
        renter.email,
        staff.staffId
      )
      if (res?.id) navigate(`/dashboard/rentals/${res.id}`)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <Card className='shadow-lg'>
      <CardContent className='p-8'>
        <h1 className='mb-8 text-center text-2xl font-bold text-gray-800'>Thông tin thuê xe</h1>
        <div className='mx-auto w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-6'>
          {/* Car Info Display */}
          <div className='mb-6 rounded-lg bg-blue-50 p-4'>
            <div className='flex items-center gap-4'>
              {car.images && car.images[0] && (
                <img
                  src={car.images[0].url}
                  alt={car.name}
                  className='h-16 w-24 rounded-lg object-cover'
                />
              )}
              <div>
                <p className='font-semibold text-gray-800'>{car.name}</p>
              </div>
            </div>
          </div>

          <div className='mb-8'>
            <div className='mb-4 flex items-center gap-3'>
              <Calendar className='text-secondary h-5 w-5' />
              <div>
                <div className='font-medium text-gray-800'>Thời gian thuê</div>
                <div className='text-sm text-gray-600'>
                  Từ {startTime ? formatHourDate(startTime) : 'Chưa chọn'}
                </div>
                <div className='text-sm text-gray-600'>
                  Đến {endTime ? formatHourDate(endTime) : 'Chưa chọn'}
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className='mb-4 flex items-center gap-3'>
              <MapPin className='text-secondary h-5 w-5' />
              <div>
                <div className='text-sm text-gray-800'>Nhận xe tại địa chỉ cửa hàng</div>
                <div className='font-medium text-gray-600'>
                  {car.station.address || 'Địa chỉ sẽ được cập nhật'}
                </div>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <Mail className='text-secondary h-5 w-5' />
              <div>
                <div className='text-sm text-gray-800'>Email người thuê</div>
                <div className='font-medium text-gray-600'>
                  {renter.email || 'email sẽ được cập nhật'}
                </div>
              </div>
            </div>
          </div>

          <div className='mb-8 flex justify-center'>
            <div className='w-full rounded-lg border p-6'>
              <h3 className='mb-6 text-center font-semibold text-gray-800'>Chi tiết thanh toán</h3>

              <div className='space-y-4'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-800'>Tiền thuê xe</span>
                  <span className='font-medium text-gray-600'>
                    {formatCurrency(bookingFees.booking)}
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-800'>Tiền cọc xe</span>
                  <span className='font-medium text-gray-600'>
                    {formatCurrency(bookingFees.deposit)}
                  </span>
                </div>
                <div className='border-t border-gray-300 pt-4'>
                  <div className='flex justify-between'>
                    <span className='font-semibold text-gray-800'>Tổng cộng</span>
                    <span className='font-bold text-black'>
                      {formatCurrency(bookingFees.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className='mx-auto mt-6 w-full max-w-2xl'>
          <Button
            onClick={handleCreateRental}
            className='bg-secondary flex w-full cursor-pointer items-center justify-center gap-2 py-3 text-lg font-semibold hover:bg-blue-600 disabled:opacity-50'
          >
            {submitLoading ? <Spinner size={20} /> : 'Xác nhận'}
          </Button>
        </div>

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

export default CheckingRentalPage
