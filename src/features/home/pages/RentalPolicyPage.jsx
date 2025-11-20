import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  UserCheck,
  CreditCard,
  Truck,
  Car,
  DollarSign,
  Calendar,
  ShieldCheck,
  MessageSquare,
  Lock
} from 'lucide-react'

const RentalPolicyPage = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-8 text-center'>
          <h1 className='mb-2 text-4xl font-bold text-gray-900'>Chính sách thuê xe</h1>
          <p className='text-muted-foreground text-lg'>E-Motion</p>
        </div>

        {/* Định danh & xác thực */}
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <UserCheck className='h-6 w-6 text-blue-600' />
              <CardTitle>Chính sách định danh & xác thực người thuê</CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <p className='mb-3 text-gray-700'>
                Người thuê xe phải cung cấp thông tin định danh hợp lệ gồm:
              </p>
              <ul className='space-y-2 text-gray-700'>
                <li className='flex gap-2'>
                  <span className='text-blue-600'>•</span>
                  <span>Căn cước công dân/CMND</span>
                </li>
                <li className='flex gap-2'>
                  <span className='text-blue-600'>•</span>
                  <span>Giấy phép lái xe hạng tương ứng</span>
                </li>
                <li className='flex gap-2'>
                  <span className='text-blue-600'>•</span>
                  <span>Số điện thoại và địa chỉ email chính xác</span>
                </li>
              </ul>
            </div>
            <Separator />
            <p className='text-gray-700'>
              E-Motion có quyền từ chối cung cấp dịch vụ nếu thông tin không hợp lệ hoặc nghi ngờ
              gian lận. Mọi giao dịch chỉ có hiệu lực sau khi hệ thống xác thực thành công thông tin
              người thuê.
            </p>
          </CardContent>
        </Card>

        {/* Thanh toán & đặt xe */}
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <CreditCard className='h-6 w-6 text-green-600' />
              <CardTitle>Chính sách thanh toán & đặt xe</CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-gray-700'>
              Khách hàng thanh toán toàn bộ phí thuê xe và phí đặt cọc thông qua chuyển khoản ngân
              hàng hoặc mã QR do hệ thống cung cấp.
            </p>
            <p className='text-gray-700'>
              Sau khi kiểm tra đầy đủ thông tin (thời gian, địa điểm giao xe, chi phí, tiền cọc…),
              khách hàng bấm nút <span className='font-semibold'>"Thanh toán giữ chỗ"</span> để xác
              nhận đơn hàng.
            </p>
            <p className='text-gray-700'>
              Khoản thanh toán trước sẽ được hoàn lại nếu khách hàng hủy đơn đặt ít nhất{' '}
              <span className='font-semibold'>05 ngày</span> trước ngày bắt đầu thuê.
            </p>
            <p className='text-gray-700'>
              Các chi phí phát sinh sau khi thuê (phụ phí, tiền phạt, phí điện, cầu đường, hư hại
              xe, v.v.) sẽ được trừ trực tiếp vào tiền cọc trước khi hoàn lại. Trường hợp tiền tổn
              thất nhiều hơn tiền cọc thì sẽ phải chi trả cho tiền tổn thất sau khi trừ tiền cọc.
            </p>
            <div className='rounded-lg bg-blue-50 p-4'>
              <h4 className='mb-2 font-semibold text-gray-900'>Hình thức thanh toán:</h4>
              <p className='text-gray-700'>
                Giao dịch trực tuyến (Online): thanh toán bằng ví điện tử hoặc chuyển khoản.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Giao – nhận xe */}
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Truck className='h-6 w-6 text-purple-600' />
              <CardTitle>Chính sách giao – nhận xe</CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-3'>
            <p className='text-gray-700'>
              Khách thuê phải chọn địa điểm giao xe đúng như thông tin trên hóa đơn đặt xe.
            </p>
            <p className='text-gray-700'>
              Nếu E-Motion không thể giao xe đúng thời gian hoặc địa điểm đã thỏa thuận, khách hàng
              có quyền hủy đơn và được hoàn tiền hoặc sẽ được hỗ trợ đặt chuyến mới.
            </p>
          </CardContent>
        </Card>

        {/* Sử dụng xe */}
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Car className='h-6 w-6 text-orange-600' />
              <CardTitle>Chính sách sử dụng xe</CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-gray-700'>
              Xe phải được trả lại trong tình trạng sạch sẽ, đầy đủ trang bị và mức pin tương đương
              lúc nhận xe.
            </p>
            <div className='rounded-lg bg-orange-50 p-4'>
              <p className='text-gray-700'>
                Nếu mức pin thấp hơn, khách thuê sẽ bị tính phí sạc bổ sung{' '}
                <span className='font-semibold'>12.000 VND</span> cho mỗi{' '}
                <span className='font-semibold'>1% pin</span> thiếu.
              </p>
            </div>
            <p className='text-gray-700'>
              Nếu xe bị hư hại do lỗi của người thuê, người thuê phải chịu toàn bộ chi phí sửa chữa
              và khắc phục.
            </p>
            <p className='text-gray-700'>
              Mỗi tài khoản chỉ được phép thuê{' '}
              <span className='font-semibold'>01 xe tại cùng một thời điểm</span>.
            </p>
          </CardContent>
        </Card>

        {/* Đặt cọc & hoàn tiền */}
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <DollarSign className='h-6 w-6 text-green-600' />
              <CardTitle>Chính sách đặt cọc & hoàn tiền</CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='rounded-lg bg-green-50 p-4'>
              <p className='font-semibold text-gray-900'>
                Mức cọc: từ 10.000.000 – 20.000.000 VND, tùy theo loại xe.
              </p>
            </div>
            <p className='text-gray-700'>
              Sau khi kiểm tra xe, hệ thống sẽ kiểm tra tình trạng xe và hoàn lại tiền cọc trong
              vòng <span className='font-semibold'>24 giờ</span>, sau khi trừ các chi phí phát sinh
              (nếu có).
            </p>
            <p className='text-gray-700'>
              Trong trường hợp có vi phạm giao thông, khiếu nại hoặc hư hại cần xác minh, khách sẽ
              nhận thông báo để chi trả tiền vi phạm thông qua email.
            </p>
          </CardContent>
        </Card>

        {/* Hủy / thay đổi chuyến */}
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Calendar className='h-6 w-6 text-red-600' />
              <CardTitle>Chính sách hủy / thay đổi chuyến</CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-gray-700'>
              Nếu khách hàng hủy đơn trong <span className='font-semibold'>5 ngày</span> trước giờ
              nhận xe, toàn bộ tiền giữ chỗ sẽ không được hoàn lại.
            </p>
            <div className='rounded-lg bg-red-50 p-4'>
              <h4 className='mb-2 font-semibold text-gray-900'>Phí trễ hạn:</h4>
              <p className='mb-2 text-gray-700'>
                Nếu trả xe trễ hơn thời gian quy định, sẽ bị phạt{' '}
                <span className='font-semibold'>6% giá gói thuê 24h</span> cho mỗi giờ trễ (tính
                trên giá gốc, không áp dụng khuyến mãi).
              </p>
              <p className='text-sm text-gray-600'>
                <span className='font-semibold'>Ví dụ:</span> Gói 24h giá 500.000 VND → phí trễ 1
                giờ là 30.000 VND.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bảo hiểm & đổi xe */}
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <ShieldCheck className='h-6 w-6 text-indigo-600' />
              <CardTitle>Chính sách bảo hiểm & đổi xe khi gặp sự cố</CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-gray-700'>
              Trong suốt quá trình thuê, xe được bảo hiểm theo quy định pháp luật.
            </p>
            <p className='text-gray-700'>
              Người thuê có trách nhiệm tuân thủ hướng dẫn an toàn để được hưởng quyền lợi bảo hiểm.
            </p>
            <div>
              <h4 className='mb-2 font-semibold text-gray-900'>
                Trường hợp xe gặp sự cố kỹ thuật không do lỗi người thuê, E-Motion sẽ:
              </h4>
              <ul className='space-y-2 text-gray-700'>
                <li className='flex gap-2'>
                  <span className='text-indigo-600'>•</span>
                  <span>Hỗ trợ kỹ thuật hoặc cứu hộ trong thời gian sớm nhất.</span>
                </li>
                <li className='flex gap-2'>
                  <span className='text-indigo-600'>•</span>
                  <span>Đổi xe tương đương hoặc cao hơn (nếu có sẵn) miễn phí.</span>
                </li>
              </ul>
            </div>
            <p className='text-gray-700'>
              Nếu người thuê gây hư hỏng nghiêm trọng, chi phí sửa chữa và vận chuyển sẽ do người
              thuê chi trả.
            </p>
          </CardContent>
        </Card>

        {/* Giải quyết khiếu nại */}
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <MessageSquare className='h-6 w-6 text-yellow-600' />
              <CardTitle>Cơ chế giải quyết khiếu nại & tranh chấp</CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h4 className='mb-2 font-semibold text-gray-900'>Nguyên tắc giải quyết:</h4>
              <p className='text-gray-700'>
                Mọi khiếu nại hoặc tranh chấp phát sinh trong quá trình sử dụng dịch vụ sẽ được ưu
                tiên giải quyết thông qua thương lượng, hòa giải trên tinh thần hợp tác và tôn trọng
                quyền lợi của các bên.
              </p>
            </div>

            <Separator />

            <div>
              <h4 className='mb-2 font-semibold text-gray-900'>Thời hạn giải quyết:</h4>
              <ul className='space-y-2 text-gray-700'>
                <li className='flex gap-2'>
                  <span className='text-yellow-600'>•</span>
                  <span>
                    Khách hàng gửi khiếu nại trong vòng{' '}
                    <span className='font-semibold'>07 ngày</span> kể từ ngày kết thúc hợp đồng thuê
                    xe hoặc phát sinh sự việc.
                  </span>
                </li>
                <li className='flex gap-2'>
                  <span className='text-yellow-600'>•</span>
                  <span>
                    E-Motion có trách nhiệm phản hồi trong vòng{' '}
                    <span className='font-semibold'>03 ngày làm việc</span> kể từ khi tiếp nhận yêu
                    cầu.
                  </span>
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h4 className='mb-2 font-semibold text-gray-900'>Phương thức xử lý:</h4>
              <p className='text-gray-700'>
                Nếu hai bên không đạt được thỏa thuận trong thời hạn 30 ngày, vụ việc có thể được
                đưa ra Tòa án Nhân dân TP. Hồ Chí Minh để giải quyết theo quy định của pháp luật
                Việt Nam.
              </p>
            </div>

            <p className='text-gray-700'>
              E-Motion có trách nhiệm cung cấp chứng từ, dữ liệu, lịch sử giao dịch và thông tin
              liên quan để hỗ trợ quá trình xử lý khiếu nại hoặc tranh chấp.
            </p>

            <div className='rounded-lg bg-yellow-50 p-4'>
              <h4 className='mb-2 font-semibold text-gray-900'>Chi phí phát sinh (nếu có):</h4>
              <p className='text-gray-700'>
                Mỗi bên tự chịu chi phí liên quan đến việc giải quyết tranh chấp của mình, trừ khi
                có phán quyết khác của cơ quan có thẩm quyền.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bảo mật thông tin */}
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Lock className='h-6 w-6 text-gray-600' />
              <CardTitle>Chính sách bảo mật thông tin</CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-gray-700'>
              Hệ thống thu thập thông tin cá nhân của người thuê, bao gồm: họ tên, CCCD/CMND, giấy
              phép lái xe, số điện thoại, địa chỉ email và thông tin thanh toán.
            </p>
            <p className='text-gray-700'>
              Dữ liệu được bảo mật tuyệt đối, chỉ sử dụng cho mục đích phục vụ hoạt động thuê xe và
              không tiết lộ cho bên thứ ba, trừ khi có yêu cầu hợp pháp từ cơ quan chức năng.
            </p>
            <p className='text-gray-700'>
              Khi hoàn tất việc đặt xe, người thuê được xem như đã đồng ý với chính sách bảo mật của
              E-Motion.
            </p>
          </CardContent>
        </Card>

        {/* Footer note */}
        <div className='bg-muted/50 rounded-lg p-6 text-center'>
          <p className='text-muted-foreground text-sm'>
            Bằng việc sử dụng dịch vụ của E-Motion, bạn đã đồng ý với các chính sách trên.
            <br />
            Mọi thắc mắc vui lòng liên hệ: <span className='font-semibold'>support@emotion.vn</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RentalPolicyPage
