import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const MainLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
