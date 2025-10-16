import ProfileDropdown from '@/components/ProfileDropdown'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

const DashboardHeader = ({ className, ...props }) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setOffset(window.scrollY || document.documentElement.scrollTop)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        'z-50 h-16',
        'sticky top-0 w-[inherit]',
        offset > 10 ? 'shadow-md' : 'shadow-none',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'bg-background/20 relative inset-0 -z-10 flex h-full items-center gap-3 p-4 backdrop-blur-lg sm:gap-4'
        )}
      >
        <SidebarTrigger variant='outline' className='max-md:scale-125' />
        <Separator orientation='vertical' className='h-6' />
        <ProfileDropdown />
      </div>
    </header>
  )
}

export default DashboardHeader
