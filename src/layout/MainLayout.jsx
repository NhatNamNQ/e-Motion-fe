import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from '@/components/ui/sonner'

const MainLayout = () => {
  return (
    <div className='min-h-screen'>
      <Header />
      <Outlet />
      <Footer />
      <Toaster expand={true} richColors />
      <ScrollRestoration />
    </div>
  )
}

export default MainLayout
