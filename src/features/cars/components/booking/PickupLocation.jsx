import { MapPin } from 'lucide-react'

const PickupLocation = ({ car }) => {
  return (
    <div className='border-secondary mb-6 rounded-lg border-2 p-4'>
      <div className='mb-4 flex items-center gap-3'>
        <div className='bg-secondary h-5 w-5 rounded-full'>
          <div className='m-1.25 h-2.5 w-2.5 rounded-full bg-white' />
        </div>
        <span className='text-sm font-bold text-gray-700'>Khách nhận tại vị trí xe đậu</span>
      </div>
      <div className='flex items-start gap-3'>
        <MapPin className='text-secondary mt-1 h-5 w-5' />
        <div>
          <p className='mb-2 text-base font-semibold text-gray-700'>{car.address}</p>
          <p className='text-sm text-gray-500'>
            Địa điểm cụ thể sẽ được hiển thị sau khi thanh toán thành công, thời gian lấy xe 24/24.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PickupLocation
