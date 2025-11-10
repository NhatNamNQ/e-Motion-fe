import { MapPin, Users, Zap, CheckCircle } from 'lucide-react'

const guides = [
  {
    number: '01',
    title: 'Đặt xe trên nền tảng e-Motion',
    description: 'Dễ dàng lựa chọn xe phù hợp với nhu cầu của bạn',
    icon: MapPin,
    image: '/step1.png'
  },
  {
    number: '02',
    title: 'Nhận xe',
    description: 'Nhận xe tại địa điểm đã đặt với đầy đủ tài liệu',
    icon: Users,
    image: '/step2.png'
  },
  {
    number: '03',
    title: 'Bắt đầu hành trình',
    description: 'Khởi hành và tận hưởng chuyến đi thoải mái',
    icon: Zap,
    image: '/step3.png'
  },
  {
    number: '04',
    title: 'Trả xe & kết thúc chuyến đi',
    description: 'Trả xe đúng giờ và nhận lại tiền cọc',
    icon: CheckCircle,
    image: '/step4.png'
  }
]

export function HowItWorksSection() {
  return (
    <section className='bg-background flex min-h-screen items-center justify-center px-8 py-20'>
      <div className='mx-auto w-full max-w-7xl'>
        <div className='mb-16 text-center'>
          <h2 className='text-secondary mb-4 text-4xl font-bold md:text-5xl'>Hướng Dẫn Thuê Xe</h2>
          <p className='text-lg text-gray-600'>
            Chỉ với 4 bước đơn giản để trải nghiệm thuê xe e-Motion một cách nhanh chóng
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {guides.map((guide) => {
            const Icon = guide.icon
            return (
              <div key={guide.number} className='flex flex-col'>
                <div className='relative mb-6 h-64 overflow-hidden rounded-xl shadow-lg transition-shadow hover:shadow-2xl'>
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'></div>
                </div>

                <div className='mb-3 flex items-center space-x-3'>
                  <span className='text-secondary text-xl font-bold'>{guide.number}</span>
                  <Icon className='text-secondary mt-1 h-6 w-6 flex-shrink-0' />
                </div>

                <h3 className='mb-2 text-xl font-bold text-gray-900'>{guide.title}</h3>

                <p className='text-sm leading-relaxed text-gray-600'>{guide.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
