import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton
} from '@/components/ui/sidebar'

import { LayoutDashboard, User2, ChevronUp, SquarePen, BookOpen, Package } from 'lucide-react'
import { Link } from 'react-router-dom'

const staffMenuItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side='top' className='w-[--radix-popper-anchor-width] min-w-56'>
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
