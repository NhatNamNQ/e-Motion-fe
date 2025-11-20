import { Button } from '../../../components/ui/button'
import { useEffect, useState } from 'react'
import CarsSlider from '../components/CarsSlider'
import { Link } from 'react-router-dom'
import { FaqSection } from '../components/FaqSection'
import { HowItWorksSection } from '../components/HowItWorksSection'
import SearchDialog from '@/components/Search/SearchDialog'
import SearchBar from '@/components/Search/SearchBar'
import Advantages from '../components/Advantages'
import { homeService } from '../services/homeService'

function HomePage() {
  const [isFixed, setIsFixed] = useState(false)
  const [cars, setCars] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getCarList = async () => {
      try {
        setIsLoading(true)
        const res = await homeService.getCars()
        setCars(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
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
        <div className="absolute inset-0 bg-[url('/backgroundHero.png')] bg-cover bg-center" />
        <div className='absolute inset-0 bg-black/30' />
        <div
          className={`z-10 container transition-all duration-500 ease-in-out ${
            isFixed
              ? 'top-0 left-1/2 -translate-x-1/2 opacity-100 md:fixed'
              : 'absolute top-4 left-1/2 -translate-x-1/2 opacity-100'
          }`}
          style={{
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <SearchDialog
            triggerChildren={({ form, onSubmit }) => <SearchBar form={form} onSubmit={onSubmit} />}
          />
        </div>
      </section>

      <div>
        <section className='bg-[#F6F6F6] py-16'>
          <Advantages />
        </section>

        <section className='w-full py-16'>
          <div className='container mx-auto'>
            <h2 className='text-secondary mb-8 text-center text-4xl font-bold md:text-5xl'>
              Danh sách xe
            </h2>
            <CarsSlider cars={cars} isLoading={isLoading} />
            <div className='mt-8 flex justify-center'>
              <Button className='bg-background text-secondary hover:text-background border-secondary hover:bg-secondary h-12 w-53 cursor-pointer border px-6 py-3 text-2xl'>
                <Link to='/cars'>Xem thêm xe</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className='bg-[#F6F6F6] py-16'>
          <div className='container mx-auto'>
            <HowItWorksSection />
          </div>
        </section>

        <section className='py-16'>
          <div className='container mx-auto'>
            <FaqSection />
          </div>
        </section>
      </div>
    </main>
  )
}

export default HomePage
