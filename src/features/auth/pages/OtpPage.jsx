import usePageTitle from '@/hooks/usePageTitle'
import OtpForm from '../components/OtpForm'
import { Link } from 'react-router-dom'

const OtpPage = () => {
  usePageTitle('Verify OTP')

  const onOtpSubmit = (values) => {
    console.log('OTP submitted:', values)
    // Handle OTP verification logic here
  }

  return (
    <main className='flex min-w-screen flex-1 items-center justify-center bg-[#51C09F] py-12'>
      <div className='w-full max-w-lg'>
        <div className='w-full rounded-2xl bg-white p-8 shadow-lg'>
          <div>
            <h1 className='text-center text-2xl font-bold tracking-tight'>Nhập mã xác thực</h1>
            <div className='mt-8'>
              <OtpForm onSubmit={onOtpSubmit} />
            </div>

            <p className='text-muted-foreground mt-6 text-center text-sm'>
              Không nhận được mã?{' '}
              <Link
                to='#'
                className='font-medium text-teal-500 transition-colors hover:text-teal-600'
              >
                Gửi lại
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default OtpPage
