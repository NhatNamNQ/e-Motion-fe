import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const MainLayout = () => {
  return (
    <>
      <div className='min-h-screen'>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default MainLayout
