import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/features/dashboard/components/AppSidebar'
import DashboardHeader from '@/features/dashboard/components/DashboardHeader'
import DashboardMain from '@/features/dashboard/components/DashboardMain'
import { getCurrentUser } from '@/store/actions/authActions'
import {
  selectAuthError,
  selectIsAuthenticated,
  selectToken
} from '@/store/selectors/authSelectors'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { toast } from 'sonner'

const DashboardLayout = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const error = useSelector(selectAuthError)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    const fetchUser = async () => {
      if (token && isAuthenticated) {
        const result = await dispatch(getCurrentUser())
        if (getCurrentUser.fulfilled.match(result)) {
          toast.success(`Chào mừng tới với e-Motion`)
        } else {
          toast.error(error)
        }
      }
    }
    fetchUser()
  }, [dispatch, token, isAuthenticated, error])

  return (
    <SidebarProvider
    // style={{
    //   '--sidebar-width': '20rem',
    //   '--sidebar-width-mobile': '20rem'
    // }}
    >
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <DashboardMain>
          <Outlet />
        </DashboardMain>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
