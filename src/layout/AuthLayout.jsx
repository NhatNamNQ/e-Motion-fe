import { Toaster } from '@/components/ui/sonner'
import { Link, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='absolute top-8 left-8 z-10'>
        <Link to='/'>
          <img src='/logo.svg' alt='e-Motion' className='h-[50px] w-auto cursor-pointer' />
        </Link>
      </header>
      <main className='flex flex-1'>
        <div className='flex flex-1 items-center justify-center bg-gradient-to-br from-cyan-100 via-cyan-50 to-blue-100 p-12'>
          <img src='/auth-car.svg' alt='car' className='w-full max-w-[600px]' />
        </div>
        <div className='flex flex-1 items-center justify-center bg-white p-12'>
          <Outlet />
        </div>
      </main>
      <Toaster expand={true} richColors />
    </div>
  )
}

export default AuthLayout
