import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from '@/components/ui/sonner'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/selectors/authSelectors'
import ChatBox from '@/components/ChatBox'

const MainLayout = () => {
  const user = useSelector(selectUser)
  const shouldShowChat = user?.role === 'ROLE_USER' || !user

  return (
    <div className='min-h-screen'>
      <Header />
      <Outlet />
      <Footer />
      <Toaster expand={true} richColors />
      <ScrollRestoration />
      {shouldShowChat && <ChatBox />}
    </div>
  )
}

export default MainLayout
