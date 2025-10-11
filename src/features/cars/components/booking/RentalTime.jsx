import { Calendar } from 'lucide-react'

const RentalTime = () => {
  return (
    <section className='mb-6 rounded-lg border-2 border-yellow-400 p-4'>
      <div className='mb-2 flex items-center gap-3'>
        <Calendar className='text-secondary h-5 w-5' />
        <div>
          <p className='text-xs text-gray-500'>Thời gian thuê</p>
          <p className='text-sm font-bold text-gray-700'>18:00, 07/10/2025 đến 22:00, 09/10/2025</p>
        </div>
      </div>
      <p className='text-sm text-yellow-600'>
        Đây là chuyến đặt sát giờ. Để xe được chuẩn bị tốt và vệ sinh chu đáo, vui lòng đặt trước 2
        tiếng.
      </p>
    </section>
  )
}

export default RentalTime
