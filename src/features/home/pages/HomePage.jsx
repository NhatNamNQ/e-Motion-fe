import { Button } from '../../../components/ui/button'
import { useEffect, useState } from 'react'
import CarsSlider from '@/features/cars/components/CarsSlider'
import { Link } from 'react-router-dom'
import { Car, CreditCard, MapPin } from 'lucide-react'
import InfoCard from '@/components/InfoCard'
import LogosSlider from '../../cars/components/LogosSlider'
import { FaqSection } from '../components/FaqSection'
import { HowItWorksSection } from '../components/HowItWorksSection'
import { carService } from '@/features/cars/services/carService'
import SearchDialog from '@/components/Search/SearchDialog'

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

  useEffect(() => {
    const getCarList = async () => {
      try {
        const res = await carService.getCars()
        setCars(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    getCarList()
  }, [])

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
      <section className='relative h-[calc(100vh-7.5rem)] w-full'>
        <div className="absolute inset-0 bg-[url('/backgroundHero.webp')] bg-cover bg-center" />
        <div className='absolute inset-0 bg-black/30' />
        <div
          className={`z-10 container ${isFixed ? 'fixed top-0 left-1/2 -translate-x-1/2' : 'absolute top-4 left-1/2 -translate-x-1/2'}`}
        >
          {/*-translate-x-1/2 shift back half by its own */}
          <SearchDialog />
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

        <section className='my-10'>
          <h1 className='mb-4 text-center text-3xl font-bold'>Tìm xe theo hãng</h1>
          <LogosSlider />
        </section>
        <HowItWorksSection />
        <FaqSection />
      </div>
    </main>
  )
}

export default HomePage
