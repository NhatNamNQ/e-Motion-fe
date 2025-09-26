import { Car } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='text-foreground bg-gray-100 py-12'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          <div className='space-y-2'>
            <div className='flex items-center space-x-2'>
              <img src='/logo.svg' alt='e-Motion' className='h-[80px] w-[150px]' />
            </div>
            <p className='text-sm text-gray-400'>
              Premium car rental services with the best vehicles and customer experience.
            </p>
          </div>
          <div className='space-y-1'>
            <h3 className='font-semibold'>Address</h3>
            <p className='text-sm text-gray-400'>
              Trạm Vincom Center Đồng Khởi. <br />
              72 Lê Thánh Tôn, P. Bến Nghé, Quận 1
            </p>
          </div>
          <div className='space-y-1'>
            <h3 className='font-semibold'>Email</h3>
            <p className='text-sm text-gray-400'>e.motion.vehicle1@gmail.com</p>
          </div>
          <div className='space-y-1'>
            <h3 className='font-semibold'>Phone</h3>
            <p className='text-sm text-gray-400'>(+84) 961825067</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
