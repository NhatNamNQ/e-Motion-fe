import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { AppSidebar } from '@/features/dashboard/components/AppSidebar'
import DashboardHeader from '@/features/dashboard/components/DashboardHeader'
import DashboardMain from '@/features/dashboard/components/DashboardMain'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <DashboardMain>
          <Outlet />
        </DashboardMain>
      </SidebarInset>
      <Toaster expand={true} richColors />
    </SidebarProvider>
  )
}

export default DashboardLayout
