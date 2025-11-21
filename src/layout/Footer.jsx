import { MapPin } from 'lucide-react'

const Footer = () => {
  const stations = {
    hcm: [
      {
        name: 'E-Motion Tân Bình',
        address: '396 Đ. Lý Thường Kiệt, Phường 7, Tân Bình'
      },
      {
        name: 'E-Motion Thủ Đức',
        address: '5 Đ. Đỗ Xuân Hợp, Phước Long B, Thủ Đức'
      },
      {
        name: 'E-Motion Trần Hưng Đạo',
        address: '34 Trần Hưng Đạo, P. Phạm Ngũ Lão, Q1'
      }
    ],
    hanoi: [
      {
        name: 'E-Motion Hoàn Kiếm',
        address: '66 Tràng Tiền, Hoàn Kiếm'
      },
      {
        name: 'E-Motion Cầu Giấy',
        address: '69 P. Vũ Phạm Hàm, Trung Hoà, Cầu Giấy'
      },
      {
        name: 'E-Motion Thanh Xuân',
        address: '183 Đ. Nguyễn Trãi, Thượng Đình, Thanh Xuân'
      }
    ]
  }

  return (
    <footer className='text-foreground bg-gray-100 py-12'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          {/* Thông tin công ty */}
          <div className='space-y-2'>
            <div className='flex items-center space-x-2'>
              <img src='/logo.svg' alt='e-Motion' className='h-[80px] w-[150px]' />
            </div>
            <p className='text-sm text-gray-400'>
              Dịch vụ cho thuê xe điện cao cấp với đội xe đa dạng và trải nghiệm khách hàng tốt
              nhất.
            </p>
          </div>

          {/* Trạm HCM */}
          <div className='space-y-3'>
            <h3 className='font-semibold'>Hồ Chí Minh</h3>
            <div className='space-y-2'>
              {stations.hcm.map((station, index) => (
                <div key={index} className='flex gap-2'>
                  <MapPin className='mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400' />
                  <div>
                    <p className='text-sm font-medium'>{station.name}</p>
                    <p className='text-xs text-gray-400'>{station.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trạm Hà Nội */}
          <div className='space-y-3'>
            <h3 className='font-semibold'>Hà Nội</h3>
            <div className='space-y-2'>
              {stations.hanoi.map((station, index) => (
                <div key={index} className='flex gap-2'>
                  <MapPin className='mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400' />
                  <div>
                    <p className='text-sm font-medium'>{station.name}</p>
                    <p className='text-xs text-gray-400'>{station.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div className='space-y-3'>
            <h3 className='font-semibold'>Liên hệ</h3>
            <div className='space-y-2'>
              <div>
                <p className='text-sm font-medium'>Email</p>
                <p className='text-sm text-gray-400'>e.motion.vehicle1@gmail.com</p>
              </div>
              <div>
                <p className='text-sm font-medium'>Điện thoại</p>
                <p className='text-sm text-gray-400'>(+84) 961825067</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bản quyền */}
        <div className='mt-8 border-t border-gray-200 pt-6'>
          <p className='text-center text-sm text-gray-400'>
            © {new Date().getFullYear()} e-Motion. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
