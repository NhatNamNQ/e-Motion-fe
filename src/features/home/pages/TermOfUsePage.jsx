import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Scale, Shield, AlertTriangle, FileText, Settings, Server } from 'lucide-react'

const TermOfUsePage = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-8 text-center'>
          <h1 className='mb-2 text-4xl font-bold text-gray-900'>Điều khoản sử dụng dịch vụ</h1>
          <p className='text-muted-foreground'>
            Vui lòng đọc kỹ các điều khoản trước khi sử dụng dịch vụ
          </p>
        </div>

        {/* Quyền và nghĩa vụ của các bên */}
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Scale className='h-6 w-6 text-blue-600' />
              <CardTitle>Quyền và nghĩa vụ của các bên</CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div>
              <h3 className='mb-3 text-lg font-semibold text-gray-900'>E-Motion có quyền:</h3>
              <ul className='space-y-2 text-gray-700'>
                <li className='flex gap-2'>
                  <span className='text-blue-600'>•</span>
                  <span>
                    Tạm ngừng hoặc từ chối cung cấp dịch vụ nếu phát hiện hành vi vi phạm.
                  </span>
                </li>
                <li className='flex gap-2'>
                  <span className='text-blue-600'>•</span>
                  <span>Thu giữ hoặc yêu cầu hoàn trả xe khi người thuê vi phạm điều khoản.</span>
                </li>
                <li className='flex gap-2'>
                  <span className='text-blue-600'>•</span>
                  <span>Thu hồi, khấu trừ tiền cọc và yêu cầu bồi thường nếu có thiệt hại.</span>
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className='mb-3 text-lg font-semibold text-gray-900'>E-Motion có nghĩa vụ:</h3>
              <ul className='space-y-2 text-gray-700'>
                <li className='flex gap-2'>
                  <span className='text-blue-600'>•</span>
                  <span>
                    Đảm bảo xe đạt tiêu chuẩn an toàn, sạch sẽ, đầy pin, và đủ giấy tờ hợp pháp.
                  </span>
                </li>
                <li className='flex gap-2'>
                  <span className='text-blue-600'>•</span>
                  <span>Hỗ trợ kỹ thuật, bảo mật thông tin và hoàn tiền đúng quy định.</span>
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className='mb-3 text-lg font-semibold text-gray-900'>Người thuê có nghĩa vụ:</h3>
              <ul className='space-y-2 text-gray-700'>
                <li className='flex gap-2'>
                  <span className='text-blue-600'>•</span>
                  <span>Cung cấp thông tin chính xác, hợp pháp.</span>
                </li>
                <li className='flex gap-2'>
                  <span className='text-blue-600'>•</span>
                  <span>
                    Sử dụng xe đúng mục đích, không cho thuê lại, không vận chuyển hàng cấm.
                  </span>
                </li>
                <li className='flex gap-2'>
                  <span className='text-blue-600'>•</span>
                  <span>Tuân thủ luật giao thông và các hướng dẫn của E-Motion.</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Điều khoản về bồi hoàn thiệt hại */}
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <AlertTriangle className='h-6 w-6 text-orange-600' />
              <CardTitle>Điều khoản về bồi hoàn thiệt hại và thanh toán phát sinh</CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div>
              <h3 className='mb-3 text-lg font-semibold text-gray-900'>
                Xác định chi phí phát sinh:
              </h3>
              <p className='mb-3 text-gray-700'>
                Sau khi kết thúc hợp đồng thuê xe, E-Motion sẽ tiến hành kiểm tra tình trạng xe, dữ
                liệu hành trình và các khoản chi phí liên quan (nếu có), bao gồm nhưng không giới
                hạn:
              </p>
              <ul className='space-y-2 text-gray-700'>
                <li className='flex gap-2'>
                  <span className='text-orange-600'>•</span>
                  <span>Hư hỏng, mất mát phụ tùng hoặc thiết bị của xe;</span>
                </li>
                <li className='flex gap-2'>
                  <span className='text-orange-600'>•</span>
                  <span>
                    Phí vệ sinh, phí sạc điện, cầu đường, gửi xe, hoặc phí xử lý vi phạm giao thông;
                  </span>
                </li>
                <li className='flex gap-2'>
                  <span className='text-orange-600'>•</span>
                  <span>Chi phí bảo trì, sửa chữa hoặc thay thế do lỗi của người thuê.</span>
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className='mb-3 text-lg font-semibold text-gray-900'>
                Trường hợp chi phí ≤ tiền cọc:
              </h3>
              <p className='text-gray-700'>
                Toàn bộ chi phí phát sinh sẽ được khấu trừ trực tiếp vào tiền cọc trước khi hoàn lại
                phần còn dư cho khách hàng.
              </p>
            </div>

            <Separator />

            <div>
              <h3 className='mb-3 text-lg font-semibold text-gray-900'>
                Trường hợp chi phí &gt; tiền cọc:
              </h3>
              <p className='mb-3 text-gray-700'>
                Khách hàng có nghĩa vụ thanh toán phần chênh lệch vượt quá tiền cọc cho E-Motion
                trong vòng 03 ngày làm việc kể từ khi nhận được thông báo chi tiết chi phí.
              </p>
              <p className='text-gray-700'>
                Trường hợp khách hàng không thực hiện nghĩa vụ, E-Motion có thể tạm khóa tài khoản,
                từ chối cung cấp dịch vụ trong tương lai, hoặc chuyển hồ sơ cho cơ quan có thẩm
                quyền để xử lý theo quy định pháp luật.
              </p>
            </div>

            <Separator />

            <div>
              <h3 className='mb-3 text-lg font-semibold text-gray-900'>Thông báo & chứng từ:</h3>
              <p className='text-gray-700'>
                E-Motion sẽ cung cấp bảng chi tiết chi phí, hình ảnh, hóa đơn hoặc chứng cứ liên
                quan đến thiệt hại để khách hàng xác nhận trước khi tiến hành thanh toán bổ sung.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Điều khoản giới hạn trách nhiệm */}
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Shield className='h-6 w-6 text-red-600' />
              <CardTitle>Điều khoản giới hạn trách nhiệm</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className='mb-3 text-gray-700'>E-Motion không chịu trách nhiệm đối với:</p>
            <ul className='space-y-2 text-gray-700'>
              <li className='flex gap-2'>
                <span className='text-red-600'>•</span>
                <span>
                  Thiệt hại gián tiếp, mất lợi nhuận hoặc thiệt hại phát sinh do người thuê sử dụng
                  xe sai mục đích;
                </span>
              </li>
              <li className='flex gap-2'>
                <span className='text-red-600'>•</span>
                <span>
                  Các sự cố ngoài tầm kiểm soát (thiên tai, chiến tranh, lỗi hệ thống của bên thứ
                  ba...);
                </span>
              </li>
              <li className='flex gap-2'>
                <span className='text-red-600'>•</span>
                <span>Dữ liệu, vật dụng cá nhân bị mất trong xe trong quá trình thuê.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Điều khoản sửa đổi & cập nhật */}
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <FileText className='h-6 w-6 text-purple-600' />
              <CardTitle>Điều khoản sửa đổi & cập nhật chính sách</CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-3'>
            <p className='text-gray-700'>
              E-Motion có quyền thay đổi, cập nhật hoặc bổ sung chính sách và điều khoản sử dụng
              dịch vụ mà không cần báo trước.
            </p>
            <p className='text-gray-700'>
              Mọi thay đổi sẽ được công bố công khai trên trang web và có hiệu lực kể từ thời điểm
              đăng tải.
            </p>
            <p className='text-gray-700'>
              Khách hàng tiếp tục sử dụng dịch vụ sau khi thay đổi đồng nghĩa với việc chấp nhận các
              điều khoản cập nhật.
            </p>
          </CardContent>
        </Card>

        {/* Điều khoản cam kết hệ thống */}
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Server className='h-6 w-6 text-green-600' />
              <CardTitle>Điều khoản cam kết hệ thống & lỗi kỹ thuật</CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-3'>
            <p className='text-gray-700'>
              E-Motion cam kết duy trì hoạt động ổn định của hệ thống đặt xe.
            </p>
            <p className='text-gray-700'>
              Nếu xảy ra lỗi kỹ thuật, E-Motion sẽ khắc phục trong thời gian sớm nhất và đảm bảo
              quyền lợi của khách hàng.
            </p>
            <p className='text-gray-700'>
              Trường hợp lỗi từ phía E-Motion khiến giao dịch không thành công, khách hàng sẽ được
              hoàn lại toàn bộ số tiền đã thanh toán.
            </p>
          </CardContent>
        </Card>

        {/* Footer note */}
        <div className='bg-muted/50 rounded-lg p-6 text-center'>
          <p className='text-muted-foreground text-sm'>
            Bằng việc sử dụng dịch vụ của E-Motion, bạn đã đồng ý với các điều khoản trên.
            <br />
            Mọi thắc mắc vui lòng liên hệ: <span className='font-semibold'>support@emotion.vn</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default TermOfUsePage
