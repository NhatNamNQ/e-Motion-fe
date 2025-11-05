import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
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
  ChevronUp,
  SquarePen,
  BookOpen,
  Package,
  ClipboardPenLine,
  MapPin
} from 'lucide-react'
import { Link } from 'react-router-dom'

const staffMenuItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Stations',
    url: '/dashboard/stations',
    icon: MapPin
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
  }
]
export function AppSidebar() {
  return (
    <Sidebar variant='inset' collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>e-Motion</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {staffMenuItems.map((item) => (
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
