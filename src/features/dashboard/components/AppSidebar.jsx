import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

import {
  LayoutDashboard,
  User2,
  SquarePen,
  BookOpen,
  Package,
  ClipboardPenLine,
  MapPin,
  Car
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/selectors/authSelectors'

export function AppSidebar() {
  const user = useSelector(selectUser)
  const menuItems = [
    {
      title: 'Dashboard',
      url: user?.role === 'ROLE_STAFF' ? `/dashboard/stations/${user.station?.id}` : '/dashboard',
      icon: LayoutDashboard
    },
    {
      title: 'Stations',
      url: '/dashboard/stations',
      icon: MapPin,
      role: 'ROLE_ADMIN'
    },
    {
      title: 'Reservations',
      url: '/dashboard/reservations',
      icon: BookOpen
    },
    {
      title: 'Rentals',
      url: '/dashboard/rentals',
      icon: Package
    },
    {
      title: 'Check List',
      url: '/dashboard/check-list',
      icon: SquarePen
    },
    {
      title: 'Vehicle logs',
      url: '/dashboard/vehicle-logs',
      icon: ClipboardPenLine
    },
    {
      title: 'Users',
      url: '/dashboard/users',
      icon: User2
    },
    {
      title: 'Cars',
      url: '/dashboard/cars',
      icon: Car
    }
  ]

  const filteredMenuItems = menuItems.filter((item) => !item.role || item.role === user?.role)
  return (
    <Sidebar variant='inset' collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>e-Motion</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
