import { format } from 'date-fns'
import { Button } from '../ui/button'

const SearchBar = ({ form, ...props }) => {
  const { startDate, endDate, location, startTime, endTime } = form.watch()

  return (
    <div className='bg-background grid grid-cols-11 items-center rounded-lg border border-gray-200 pr-4 shadow-md transition-all duration-300 ease-in-out'>
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
          <p className='text-sm font-semibold text-gray-900'>
            {startDate ? format(startDate, 'dd/MM/yyyy') : 'Chọn ngày'}
          </p>
        </div>
        <div>
          <p className='text-xs font-medium text-gray-500'>Giờ nhận xe</p>
          <p className='text-sm font-semibold text-gray-900'>{startTime || 'Chọn giờ'}</p>
        </div>
      </div>

      <div
        className='col-span-3 flex w-full cursor-pointer items-center justify-evenly rounded-md p-3 transition-colors hover:bg-gray-50'
        {...props}
        role='button'
      >
        <div>
          <p className='text-xs font-medium text-gray-500'>Ngày trả xe</p>
          <p className='text-sm font-semibold text-gray-900'>
            {endDate ? format(endDate, 'dd/MM/yyyy') : 'Chọn ngày'}
          </p>
        </div>
        <div>
          <p className='text-xs font-medium text-gray-500'>Giờ trả xe</p>
          <p className='text-sm font-semibold text-gray-900'>{endTime || 'Chọn giờ'}</p>
        </div>
      </div>

      <Button className='bg-secondary hover:bg-secondary/80 col-span-2 h-12 w-full cursor-pointer font-semibold shadow-sm'>
        TÌM XE
      </Button>
    </div>
  )
}

export default SearchBar
