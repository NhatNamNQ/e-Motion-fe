import { Form } from '../ui/form'
import { Button } from '../ui/button'
import DatePicker from '../DatePicker'
import Combobox from '../Combobox'
import { format } from 'date-fns'

const locations = [
  {
    value: 'Hồ Chí Minh'
  },
  {
    value: 'Hà Nội'
  },
  {
    value: 'Đà Nẵng'
  },
  {
    value: 'Cần Thơ'
  }
]

const generateHours = () => {
  const hours = []
  for (let i = 0; i < 24; i++) {
    const hourString = i.toString().padStart(2, '0')
    hours.push({
      value: `${hourString}:00`,
      label: `${hourString}:00`
    })
  }
  return hours
}

const SearchForm = ({ form, onSubmit }) => {
  const hours = generateHours()
  const { startDate, endDate, location, startTime, endTime } = form.watch()

  const handleLocationSelect = (location) => {
    form.setValue('location', location)
  }

  const handleStartTimeSelect = (time) => {
    form.setValue('startTime', time)
  }
  const handleEndTimeSelect = (time) => {
    form.setValue('endTime', time)
  }

  const handleStartDateSelect = (date) => {
    form.setValue('startDate', date)
  }
  const handleEndDateSelect = (date) => {
    form.setValue('endDate', date)
  }

  const startDateTitle = startDate ? format(startDate, 'dd/MM/yyyy') : 'Ngày nhận xe'
  const endDateTitle = endDate ? format(endDate, 'dd/MM/yyyy') : 'Ngày trả xe'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700'>Địa điểm nhận xe</label>
          <Combobox
            handleSelect={handleLocationSelect}
            list={locations}
            title={location ? location : 'Chọn địa điểm cần thuê'}
            name='location'
            form={form}
            width={320}
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700'>Thời gian nhận xe</label>
          <div className='grid grid-cols-2 gap-3'>
            <DatePicker
              form={form}
              handleSelect={handleStartDateSelect}
              title={startDateTitle}
              name='startDate'
            />
            <Combobox
              form={form}
              name='startTime'
              title={startTime ? startTime : 'Giờ nhận xe'}
              list={hours}
              handleSelect={handleStartTimeSelect}
            />
          </div>
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700'>Thời gian trả xe</label>
          <div className='grid grid-cols-2 gap-3'>
            <DatePicker
              form={form}
              handleSelect={handleEndDateSelect}
              title={endDateTitle}
              name='endDate'
            />
            <Combobox
              form={form}
              name='endTime'
              title={endTime ? endTime : 'Giờ trả xe'}
              list={hours}
              handleSelect={handleEndTimeSelect}
            />
          </div>
        </div>

        <div className='pt-4'>
          <Button
            type='submit'
            className='h-11 w-full bg-[#51C09F] font-medium text-white hover:bg-[#51C09F]/90'
          >
            TÌM XE
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SearchForm
