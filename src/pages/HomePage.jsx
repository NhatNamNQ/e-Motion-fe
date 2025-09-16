import { MapPin } from 'lucide-react'
import { Button } from '../components/ui/button'
import SelectItems from '../components/SelectItems'
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
    <div>
      <header className='flex h-30 items-center border-b'>
        <div className='container mx-auto flex justify-between px-4'>
          <h1 className='text-3xl'>Logo</h1>
          <nav className='flex items-center space-x-4'>
            <p>Xem danh sách xe</p>
            <div className='flex'>
              <SelectItems children={<MapPin color='#51C09F' />} />
            </div>
            <Button className='bg-[#51C09F] px-6 py-2 hover:bg-[#51C09F]/80'>Đăng Nhập</Button>
          </nav>
        </div>
      </header>
      <main>
        <div className='relative h-[calc(100vh-7.5rem)]'>
          <img
            src='https://cafefcdn.com/thumb_w/640//203337114487263232/2023/7/5/photo1688544877204-1688544877323214353911-1688547910777263205056.png'
            className='h-full w-full opacity-80'
          />
          {/* search bar */}
          <div
            className={`grid grid-cols-11 place-items-center rounded-lg bg-white p-4 shadow-md transition-all duration-300 ease-in-out ${isFixed ? 'fixed top-0 left-0 w-full rounded-none' : 'absolute top-4 left-1/2 w-[80vw] -translate-x-1/2'}`}
          >
            {/*-translate-x-1/2 shift back half by its own */}
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
        <div>Noi dung tiep theo</div>
      </main>
    </div>
  )
}

export default HomePage
