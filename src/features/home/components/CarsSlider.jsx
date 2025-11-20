import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/scrollbar'
import CarCard from '@/features/cars/components/CarCard'
import SkeletonCard from '@/components/SkeletonCard'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const CarsSlider = ({ cars, isLoading }) => {
  return (
    <Swiper
      modules={[Scrollbar]}
      spaceBetween={24}
      slidesPerView={1.5}
      scrollbar={{ draggable: true }}
      breakpoints={{
        768: {
          slidesPerView: 2.5,
          spaceBetween: 30
        },
        1024: {
          slidesPerView: 3.5,
          spaceBetween: 30
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 30
        }
      }}
    >
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <SwiperSlide key={index} className='mb-4'>
              <SkeletonCard />
            </SwiperSlide>
          ))
        : cars?.map((car) => (
            <SwiperSlide key={car.id} className='mb-4'>
              <CarCard car={car} />
            </SwiperSlide>
          ))}

      {/* View More Card */}
      {!isLoading && cars && cars.length > 0 && (
        <SwiperSlide>
          <Link
            to='/cars'
            className='border-secondary bg-secondary/5 hover:bg-secondary/10 flex h-[458px] min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed transition-all hover:border-solid'
          >
            <div className='bg-secondary/10 flex h-20 w-20 items-center justify-center rounded-full'>
              <ArrowRight className='text-secondary h-10 w-10' />
            </div>
            <div className='text-center'>
              <h3 className='text-secondary text-xl font-semibold'>Xem thêm xe</h3>
              <p className='mt-2 text-sm text-gray-600'>Khám phá thêm nhiều xe khác</p>
            </div>
          </Link>
        </SwiperSlide>
      )}
    </Swiper>
  )
}

export default CarsSlider
