import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/scrollbar'

const logos = [
  '/carLogos/bmw.svg',
  '/carLogos/ford.svg',
  '/carLogos/mec.svg',
  '/carLogos/tesla.svg',
  '/carLogos/toyota.svg',
  '/carLogos/vinfast.svg',
  '/carLogos/audi.svg',
  '/carLogos/honda.svg',
  '/carLogos/hyundai.svg',
  '/carLogos/nissan.svg'
]

const LogosSlider = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={8}
      loop={true}
      autoplay={{
        delay: 0,
        disableOnInteraction: false
      }}
      speed={2000}
    >
      {logos.map((logo, index) => (
        <SwiperSlide key={index}>
          <figure className='flex h-28 w-28 items-center justify-center rounded-2xl border p-6'>
            <img src={logo} alt={`logo-${index}`} className='h-14 cursor-pointer' />
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default LogosSlider
