import { cn } from '@/lib/utils'
import { Outlet } from 'react-router-dom'

const DashboardMain = ({ className, ...props }) => {
  return (
    <main className={cn('px-4 py-6', className)} {...props}>
      <Outlet />
    </main>
  )
}

export default DashboardMain
