import { Calendar } from 'lucide-react'

const RentalTime = ({ searchForm }) => {
  const { startDate, endDate, startHour, endHour } = searchForm
  return (
    <section className='border-secondary mb-6 rounded-lg border-2 p-4'>
      <div className='mb-2 flex items-center gap-3'>
        <Calendar className='text-secondary h-5 w-5' />
        <div>
          <p className='text-xs text-gray-500'>Thời gian thuê</p>
          <p className='text-sm font-bold text-gray-700'>
            {`${startHour}, ${startDate} đến ${endHour}, ${endDate}`}
          </p>
        </div>
      </div>
    </section>
  )
}

export default RentalTime
