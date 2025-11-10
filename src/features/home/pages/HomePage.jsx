import { Button } from '../../../components/ui/button'
import { useEffect, useState } from 'react'
import CarsSlider from '@/features/cars/components/CarsSlider'
import { Link } from 'react-router-dom'
import { Car, CreditCard, MapPin } from 'lucide-react'
import InfoCard from '@/components/InfoCard'
import { FaqSection } from '../components/FaqSection'
import { HowItWorksSection } from '../components/HowItWorksSection'
import { carService } from '@/features/cars/services/carService'
import SearchDialog from '@/components/Search/SearchDialog'
import SearchBar from '@/components/Search/SearchBar'

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
          className={`z-10 container ${
            isFixed
              ? 'fixed top-0 left-1/2 -translate-x-1/2'
              : 'absolute top-4 left-1/2 -translate-x-1/2'
          }`}
        >
          <SearchDialog
            triggerChildren={({ form, onSubmit }) => <SearchBar form={form} onSubmit={onSubmit} />}
          />
        </div>
      </section>

      <div className=''>
        <section className='min-h-screen bg-[#F6F6F6] py-16'>
          <div className='container mx-auto grid gap-8 pt-8 md:grid-cols-3'>
            {features.map((feature, index) => {
              const Icon = feature.icon
              return <InfoCard key={index} Icon={Icon} feature={feature} />
            })}
          </div>
        </section>

        <section className='min-h-screen w-full py-16'>
          <div className='container mx-auto'>
            <h2 className='text-secondary mb-8 text-center text-4xl font-bold md:text-5xl'>
              Danh sách xe
            </h2>
            <CarsSlider cars={cars} />
            <div className='mt-8 flex justify-center'>
              <Button className='bg-background text-secondary hover:text-background border-secondary hover:bg-secondary h-12 w-53 cursor-pointer border px-6 py-3 text-2xl'>
                <Link to='/cars'>Xem thêm xe</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className='min-h-screen bg-[#F6F6F6] py-16'>
          <div className='container mx-auto'>
            <HowItWorksSection />
          </div>
        </section>

        <section className='min-h-screen py-16'>
          <div className='container mx-auto'>
            <FaqSection />
          </div>
        </section>
      </div>
    </main>
  )
}

export default HomePage
