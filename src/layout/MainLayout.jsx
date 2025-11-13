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
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
      <Toaster expand={true} richColors />
      <ScrollRestoration />
      {shouldShowChat && <ChatBox />}
    </div>
  )
}

export default MainLayout
