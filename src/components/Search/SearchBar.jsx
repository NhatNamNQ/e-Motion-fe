import { Button } from '../ui/button'
import { MapPin, Calendar, Clock } from 'lucide-react'

const SearchBar = ({ form, onSubmit, ...props }) => {
  const { startDate, endDate, location, startHour, endHour } = form.watch()

  return (
    <div className='bg-background rounded-lg border border-gray-200 shadow-md transition-all duration-300 ease-in-out'>
      {/* Desktop Layout */}
      <div className='hidden items-center p-2 md:grid md:grid-cols-11 md:gap-2'>
        <div
          className='col-span-3 w-full cursor-pointer rounded-md p-3 text-center transition-colors hover:bg-gray-50'
          {...props}
          role='button'
        >
          <p className='mb-1 text-xs font-medium text-gray-500'>Địa điểm nhận xe</p>
          <p className='text-sm font-semibold text-gray-900'>{location || 'Chọn địa điểm'}</p>
        </div>

        <div
          className='col-span-3 flex w-full cursor-pointer items-center justify-evenly rounded-md p-3 transition-colors hover:bg-gray-50'
          {...props}
          role='button'
        >
          <div>
            <p className='text-xs font-medium text-gray-500'>Ngày nhận xe</p>
            <p className='text-sm font-semibold text-gray-900'>{startDate || 'Chọn ngày'}</p>
          </div>
          <div>
            <p className='text-xs font-medium text-gray-500'>Giờ nhận xe</p>
            <p className='text-sm font-semibold text-gray-900'>{startHour || 'Chọn giờ'}</p>
          </div>
        </div>

        <div
          className='col-span-3 flex w-full cursor-pointer items-center justify-evenly rounded-md p-3 transition-colors hover:bg-gray-50'
          {...props}
          role='button'
        >
          <div>
            <p className='text-xs font-medium text-gray-500'>Ngày trả xe</p>
            <p className='text-sm font-semibold text-gray-900'>{endDate || 'Chọn ngày'}</p>
          </div>
          <div>
            <p className='text-xs font-medium text-gray-500'>Giờ trả xe</p>
            <p className='text-sm font-semibold text-gray-900'>{endHour || 'Chọn giờ'}</p>
          </div>
        </div>

        <Button
          onClick={form.handleSubmit(onSubmit)}
          className='bg-secondary hover:bg-secondary/80 col-span-2 h-12 w-full cursor-pointer font-semibold shadow-sm'
        >
          TÌM XE
        </Button>
      </div>

      {/* Mobile Layout */}
      <div className='flex flex-col gap-3 p-4 md:hidden'>
        <div
          className='flex cursor-pointer items-center gap-3 rounded-md border border-gray-200 p-3 transition-colors hover:bg-gray-50'
          {...props}
          role='button'
        >
          <MapPin className='text-secondary h-5 w-5 flex-shrink-0' />
          <div className='flex-1'>
            <p className='mb-1 text-xs font-medium text-gray-500'>Địa điểm nhận xe</p>
            <p className='text-sm font-semibold text-gray-900'>{location || 'Chọn địa điểm'}</p>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <div
            className='flex cursor-pointer flex-col gap-2 rounded-md border border-gray-200 p-3 transition-colors hover:bg-gray-50'
            {...props}
            role='button'
          >
            <div className='flex items-center gap-2'>
              <Calendar className='text-secondary h-4 w-4' />
              <p className='text-xs font-medium text-gray-500'>Ngày nhận</p>
            </div>
            <p className='text-sm font-semibold text-gray-900'>{startDate || 'Chọn ngày'}</p>
          </div>

          <div
            className='flex cursor-pointer flex-col gap-2 rounded-md border border-gray-200 p-3 transition-colors hover:bg-gray-50'
            {...props}
            role='button'
          >
            <div className='flex items-center gap-2'>
              <Clock className='text-secondary h-4 w-4' />
              <p className='text-xs font-medium text-gray-500'>Giờ nhận</p>
            </div>
            <p className='text-sm font-semibold text-gray-900'>{startHour || 'Chọn giờ'}</p>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <div
            className='flex cursor-pointer flex-col gap-2 rounded-md border border-gray-200 p-3 transition-colors hover:bg-gray-50'
            {...props}
            role='button'
          >
            <div className='flex items-center gap-2'>
              <Calendar className='text-secondary h-4 w-4' />
              <p className='text-xs font-medium text-gray-500'>Ngày trả</p>
            </div>
            <p className='text-sm font-semibold text-gray-900'>{endDate || 'Chọn ngày'}</p>
          </div>

          <div
            className='flex cursor-pointer flex-col gap-2 rounded-md border border-gray-200 p-3 transition-colors hover:bg-gray-50'
            {...props}
            role='button'
          >
            <div className='flex items-center gap-2'>
              <Clock className='text-secondary h-4 w-4' />
              <p className='text-xs font-medium text-gray-500'>Giờ trả</p>
            </div>
            <p className='text-sm font-semibold text-gray-900'>{endHour || 'Chọn giờ'}</p>
          </div>
        </div>

        <Button
          onClick={form.handleSubmit(onSubmit)}
          className='bg-secondary hover:bg-secondary/80 h-12 w-full cursor-pointer font-semibold shadow-sm'
        >
          TÌM XE
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
