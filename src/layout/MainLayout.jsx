import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from '@/components/ui/sonner'

const MainLayout = () => {
  return (
    <>
      <div className='min-h-screen'>
        <Header />
        <Outlet />
      </div>
      <Footer />
      <Toaster position='top-center' expand={true} richColors />
    </>
  )
}

export default MainLayout
