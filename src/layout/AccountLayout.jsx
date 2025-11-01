import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { AppSidebar } from '@/features/dashboard/components/AppSidebar'
import DashboardHeader from '@/features/dashboard/components/DashboardHeader'
import DashboardMain from '@/features/dashboard/components/DashboardMain'
import Header from './Header'
import Footer from './Footer'
import AccountSidebar from './AccountSidebar'
import { Outlet } from 'react-router-dom'

const AccountLayout = () => {
  return (
    <>
      <Header />
      <main className='container mx-auto flex flex-col lg:flex-row'>
        <AccountSidebar classname='w-full lg:w-1/4 pt-8 pr-0 md:pr-8' />
        <section className='w-full flex-1 px-0 md:px-4'>
          <Outlet />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default AccountLayout
