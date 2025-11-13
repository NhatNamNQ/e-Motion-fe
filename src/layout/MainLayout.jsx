import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from '@/components/ui/sonner'

const MainLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
      <Toaster expand={true} richColors />
      <ScrollRestoration />
    </div>
  )
}

export default MainLayout
