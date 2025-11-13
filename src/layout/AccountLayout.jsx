import Header from './Header'
import Footer from './Footer'
import AccountSidebar from './AccountSidebar'
import { Outlet } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'

const AccountLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='container mx-auto flex flex-1 flex-col lg:flex-row'>
        <AccountSidebar classname='w-full lg:w-1/4 pt-8 pr-0 md:pr-8' />
        <section className='w-full flex-1 px-0 md:px-4'>
          <Outlet />
        </section>
      </main>
      <Footer />
      <Toaster expand={true} richColors />
    </div>
  )
}

export default AccountLayout
