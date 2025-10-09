import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MapPin, Calendar, Shield, Share2, Users, Settings, Fuel } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import MapboxMap from '@/components/MapboxMap'
import Loader from '@/components/Loader'
import { carService } from '../services/carService'

const CarDetailPage = () => {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        // setLoading(true)
        const carData = await carService.getCarById(id)
        setCar(carData)
      } catch (error) {
        console.error('Error fetching car details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCarDetails()
  }, [id])

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Loader />
      </div>
    )
  }

  if (!car) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h1 className='mb-2 text-2xl font-bold text-gray-700'>Không tìm thấy xe</h1>
          <p className='text-gray-500'>Xe bạn đang tìm kiếm không tồn tại.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          {/* Left Column - Car Details */}
          <div className='space-y-8 md:col-span-2'>
            {/* Image Gallery */}
            <section className=''>
              <div className='grid max-h-[600px] grid-cols-3 grid-rows-3 gap-2 md:grid-cols-3'>
                {/*  Images */}
                {car.images.slice(0, 4).map((image, index) => (
                  <div key={index} className={index === 0 ? 'col-span-3 row-span-2' : ''}>
                    <img
                      src={image}
                      alt={`image ${index}`}
                      className='h-full w-full cursor-pointer rounded-md object-cover'
                    />
                  </div>
                ))}
              </div>
            </section>
            {/* Car Info Header */}
            <section>
              <div className='mb-4 flex items-start justify-between'>
                <div>
                  <h1 className='mb-2 text-3xl font-black text-gray-700'>{car.name}</h1>
                  <div className='mb-2 flex items-center text-gray-500'>
                    <MapPin className='mr-2 h-4 w-4' />
                    <span>{car.city}</span>
                  </div>
                </div>
                <Button variant='outline' size='sm' className='flex items-center gap-2'>
                  <Share2 className='h-4 w-4' />
                  Chia sẻ
                </Button>
              </div>
              <hr className='border-gray-200' />
            </section>
            {/* Features */}
            <section>
              Đặc điểm
              <div className='mt-2 h-1 w-10 rounded-full bg-blue-500' />
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
              Mô tả
              <div className='mt-2 h-1 w-10 rounded-full bg-blue-500' />
              <p className='leading-relaxed text-gray-700'>{car.description}</p>
            </section>
            {/* Location */}
            {/* <Card>
              <CardHeader>
                <CardTitle className='text-xl font-extrabold text-gray-700'>
                  Vị trí xe
                  <div className='mt-2 h-1 w-10 rounded-full bg-blue-500' />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='mb-4 flex items-center text-gray-500'>
                  <MapPin className='mr-2 h-4 w-4' />
                  <span>{car.address}</span>
                </div>
                <div className='h-64 overflow-hidden rounded-lg'>
                  <MapboxMap
                    longitude={105.7779}
                    latitude={20.9706}
                    zoom={15}
                    className='h-full w-full'
                  />
                </div>
              </CardContent>
            </Card> */}
            {/* Terms */}
            <section>
              Điều khoản
              <div className='mt-2 h-1 w-10 rounded-full bg-blue-500' />
              <div className='space-y-4'>
                <p className='font-medium text-gray-700'>Quy định khác:</p>
                <ul className='space-y-2 text-gray-700'>
                  <li>- Sử dụng xe đúng mục đích.</li>
                  <li>- Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.</li>
                  <li>- Không sử dụng xe thuê để cầm cố, thế chấp.</li>
                  <li>- Không hút thuốc, nhả kẹo cao su, xả rác trong xe.</li>
                  <li>- Không chở hàng quốc cấm dễ cháy nổ.</li>
                  <li>- Không chở hoa quả, thực phẩm nặng mùi trong xe.</li>
                </ul>
                <p className='mt-4 font-medium text-gray-700'>
                  Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt vời !
                </p>
              </div>
            </section>
            {/* Cancellation Policy */}
            <section>
              Chính sách hủy chuyến
              <div className='mt-2 h-1 w-10 rounded-full bg-blue-500' />
              <div className='overflow-hidden rounded-lg border border-gray-200'>
                <table className='w-full'>
                  <thead className='bg-gray-100'>
                    <tr>
                      <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'></th>
                      <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                        Ngày thường
                      </th>
                      <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                        Ngày lễ, Tết
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    <tr>
                      <td className='px-4 py-3 text-sm font-semibold text-gray-900'>
                        <div className='flex items-center'>
                          <div className='mr-2 h-4 w-4 rounded-full bg-blue-500' />
                          Hoàn 100% tiền giữ chỗ
                        </div>
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>
                        Trước chuyến đi &gt; 5 ngày
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>
                        Trước chuyến đi &gt; 5 ngày
                      </td>
                    </tr>
                    <tr>
                      <td className='px-4 py-3 text-sm font-semibold text-gray-900'>
                        <div className='flex items-center'>
                          <div className='mr-2 h-4 w-4 rounded-full bg-red-500' />
                          Không hoàn tiền giữ chỗ
                        </div>
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>
                        Trong vòng 5 ngày trước chuyến đi
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>
                        Trong vòng 5 ngày trước chuyến đi
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Column - Booking Card */}
          <div className='lg:col-span-1'>
            <div className='sticky top-8 space-y-6'>
              {/* Pricing Card */}
              <Card className='shadow-lg'>
                <CardContent className='p-6'>
                  <div className='mb-6'>
                    <div className='mb-2 flex items-baseline gap-2'>
                      <span className='text-2xl font-bold text-blue-500'>700K</span>
                      <span className='text-base font-bold text-blue-500'>/4 giờ</span>
                    </div>
                    <div className='flex flex-wrap gap-4 text-sm text-gray-500'>
                      <span>980K/8 giờ</span>
                      <span>1120K/12 giờ</span>
                      <span>1400K/24 giờ</span>
                    </div>
                    <p className='mt-2 text-xs text-gray-500'>
                      Đơn giá gói chỉ áp dụng cho ngày thường. Giá ngày Lễ / Tết có thể điều chỉnh
                      theo nhu cầu.
                    </p>
                  </div>

                  {/* Rental Time */}
                  <div className='mb-6 rounded-lg border-2 border-yellow-400 p-4'>
                    <div className='mb-2 flex items-center gap-3'>
                      <Calendar className='h-5 w-5 text-blue-500' />
                      <div>
                        <p className='text-xs text-gray-500'>Thời gian thuê</p>
                        <p className='text-sm font-bold text-gray-700'>
                          18:00, 07/10/2025 đến 22:00, 09/10/2025
                        </p>
                      </div>
                    </div>
                    <p className='text-sm text-yellow-600'>
                      Đây là chuyến đặt sát giờ. Để xe được chuẩn bị tốt và vệ sinh chu đáo, vui
                      lòng đặt trước 2 tiếng.
                    </p>
                  </div>

                  {/* Pickup Location */}
                  <div className='mb-6 rounded-lg border-2 border-blue-500 p-4'>
                    <div className='mb-4 flex items-center gap-3'>
                      <div className='h-5 w-5 rounded-full bg-blue-500'>
                        <div className='m-1.25 h-2.5 w-2.5 rounded-full bg-white' />
                      </div>
                      <span className='text-sm font-bold text-gray-700'>
                        Khách nhận tại vị trí xe đậu
                      </span>
                    </div>
                    <div className='flex items-start gap-3'>
                      <MapPin className='mt-1 h-4 w-4 text-blue-500' />
                      <div>
                        <p className='mb-2 text-base font-semibold text-gray-700'>{car.address}</p>
                        <p className='text-sm text-gray-500'>
                          Địa điểm cụ thể sẽ được hiển thị sau khi thanh toán thành công, thời gian
                          lấy xe 24/24.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Insurance */}
                  <div className='mb-6 flex items-center gap-3'>
                    <Shield className='h-4 w-4 text-blue-500' />
                    <span className='text-base font-bold text-gray-600'>
                      Xe có bảo hiểm vật chất hai chiều
                    </span>
                  </div>

                  {/* Price Breakdown */}
                  <div className='space-y-4 border-t pt-4'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-bold text-gray-600'>Phí thuê xe</span>
                      <span className='text-sm font-bold text-gray-600'>3.675.000đ</span>
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
                      Tiền giữ chỗ không phải phụ phí và sẽ được hoàn lại sau chuyến đi. Lưu ý: Tham
                      khảo chính sách hoàn giữ chỗ khi huỷ chuyến.
                    </p>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-bold text-gray-600'>Cọc xe</span>
                      <span className='text-sm font-bold text-gray-600'>10.000.000đ</span>
                    </div>
                    <p className='text-xs text-gray-400'>
                      Thanh toán khi nhận xe và kiểm tra xe, không nhận cọc xe máy. Lưu ý: Mức cọc
                      sẽ cao hơn đối với bằng lái mới được cấp dưới 1 năm.
                    </p>
                  </div>

                  <Button className='mt-6 w-full bg-blue-500 hover:bg-blue-600'>Thuê xe</Button>
                </CardContent>
              </Card>

              {/* Additional Costs */}
              <Card>
                <CardHeader className='bg-blue-500/20'>
                  <CardTitle className='text-base font-bold text-blue-500'>
                    Các chi phí khác
                  </CardTitle>
                </CardHeader>
                <CardContent className='p-6'>
                  <div className='space-y-4'>
                    <div>
                      <div className='mb-1 flex items-center justify-between'>
                        <span className='text-sm font-bold text-gray-500'>Phụ phí điện và pin</span>
                        <span className='text-sm font-bold text-gray-500'>
                          2.000đ / km di chuyển
                        </span>
                      </div>
                      <p className='text-xs text-gray-400'>
                        Bonbon chỉ áp dụng phí này cho xe điện.
                      </p>
                    </div>
                    <hr />
                    <div>
                      <div className='mb-1 flex items-center justify-between'>
                        <span className='text-sm font-bold text-gray-500'>Phí vệ sinh</span>
                        <span className='text-sm font-bold text-gray-500'>120,000₫ - 150,000₫</span>
                      </div>
                      <p className='text-xs text-gray-400'>
                        Vui lòng trả lại hiện trạng xe được vệ sinh như lúc nhận để không mất phí
                        này.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms Agreement */}
              <div className='text-center text-sm text-gray-500'>
                Bằng việc chuyển giữ chỗ và thuê xe, bạn đồng ý với{' '}
                <span className='font-bold text-blue-500'>Điều khoản sử dụng</span> và{' '}
                <span className='font-bold text-blue-500'>Chính sách bảo mật</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetailPage
