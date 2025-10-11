import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/scrollbar'
import CarCard from '@/features/cars/components/CarCard'
import SkeletonCard from '@/components/SkeletonCard'

const CarsSlider = ({ cars }) => {
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
      {cars
        ? cars.map((car) => (
            <SwiperSlide className='mb-4'>
              <CarCard car={car} />
            </SwiperSlide>
          ))
        : Array.from({ length: 4 }).map((_, index) => (
            <SwiperSlide className='mb-4'>
              <SkeletonCard key={index} />
            </SwiperSlide>
          ))}
    </Swiper>
  )
}

export default CarsSlider
