import { Button } from '../../../components/ui/button'
import { useEffect, useState } from 'react'
import { cars as mockCars } from '@/features/cars/constants/mockData'
import { stations as mockStations } from '@/features/cars/constants/mockData'
import CarsSlider from '@/features/cars/components/CarsSlider'
import { Link } from 'react-router-dom'
import MapboxMap from '@/components/MapboxMap'
import { Car, CreditCard, MapPin } from 'lucide-react'
import InfoCard from '@/components/InfoCard'

const features = [
  {
    icon: MapPin,
    title: 'Tiện Lợi',
    description: 'Dịch vụ chuyển đổi số cho sự tiện lợi tối đa'
  },
  {
    icon: Car,
    title: 'Thoải Mái',
    description: 'Các giải pháp cao cấp với trải nghiệm người dùng vượt trội'
  },
  {
    icon: CreditCard,
    title: 'Tiết Kiệm',
    description: 'Giá cả hiệu quả cho giá trị sử dụng tối đa'
  }
]

function HomePage() {
  const [isFixed, setIsFixed] = useState(false)
  const [cars, setCars] = useState([])
  const [stations, setStations] = useState([])

  useEffect(() => {
    setCars(mockCars)
    setStations(mockStations)
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
      <section className='relative h-[calc(100vh-7.5rem)] w-full'>
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
      </section>

      <div className='container mx-auto px-4 md:px-0'>
        <div className='grid gap-8 pt-4 md:grid-cols-3'>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return <InfoCard key={index} Icon={Icon} feature={feature} />
          })}
        </div>
        {/* View slider cars list */}
        <section className='my-10'>
          <h1 className='mb-4 text-center text-3xl font-bold'>Danh sách xe điện</h1>
          <CarsSlider cars={cars} />
          <div className='mt-6 flex justify-center'>
            <Button className='bg-background text-secondary hover:text-background border-secondary hover:bg-secondary h-12 w-53 cursor-pointer border p-3 text-2xl'>
              <Link to='/cars'>Xem thêm xe</Link>
            </Button>
          </div>
        </section>

        {/* Show map */}
        <section>{stations.length > 0 && <MapboxMap station={stations[0]} />}</section>
      </div>
    </main>
  )
}

export default HomePage
