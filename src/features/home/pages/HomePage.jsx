import { Button } from '../../../components/ui/button'
import { useEffect, useState } from 'react'

function HomePage() {
  const [isFixed, setIsFixed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 120) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main>
      <div className='relative h-[calc(100vh-7.5rem)] w-full'>
        <div className="absolute inset-0 bg-[url('/backgroundHero.webp')] bg-cover bg-center" />
        <div className='absolute inset-0 bg-black/30' />
        <div
          className={`z-10 container ${isFixed ? 'fixed top-0 left-1/2 -translate-x-1/2' : 'absolute top-4 left-1/2 -translate-x-1/2'}`}
        >
          {/*-translate-x-1/2 shift back half by its own */}
          <div className='bg-background grid grid-cols-11 place-items-center rounded-lg p-4 shadow-md transition-all duration-300 ease-in-out'>
            <div className='col-span-3'>
              <p>Địa điểm nhận xe</p>
              <p>Chọn địa điểm nhận xe</p>
            </div>
            <div className='col-span-3'>
              <p>Ngày nhận xe</p>
              <p>Giờ nhận xe</p>
            </div>
            <div className='col-span-3'>
              <p>Ngày trả xe</p>
              <p>Giờ trả xe</p>
            </div>
            <Button className='col-span-2 h-12 w-full cursor-pointer bg-[#51C09F] hover:bg-[#51C09F]/80'>
              TÌM XE
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage
