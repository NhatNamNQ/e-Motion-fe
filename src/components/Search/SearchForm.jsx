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
  const { startDate, endDate, location, startHour, endHour } = form.watch()

  const handleLocationSelect = (location) => {
    form.setValue('location', location)
  }

  const handleStartHourSelect = (time) => {
    form.setValue('startHour', time)
  }
  const handleEndHourSelect = (time) => {
    form.setValue('endHour', time)
  }

  const handleStartDateSelect = (date) => {
    form.setValue('startDate', format(date, 'dd/MM/yyyy'))
  }
  const handleEndDateSelect = (date) => {
    form.setValue('endDate', format(date, 'dd/MM/yyyy'))
  }

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
              title={startDate || 'Ngày nhận xe'}
              name='startDate'
            />
            <Combobox
              form={form}
              name='startHour'
              title={startHour ? startHour : 'Giờ nhận xe'}
              list={hours}
              handleSelect={handleStartHourSelect}
            />
          </div>
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700'>Thời gian trả xe</label>
          <div className='grid grid-cols-2 gap-3'>
            <DatePicker
              form={form}
              handleSelect={handleEndDateSelect}
              title={endDate || 'Ngày trả xe'}
              name='endDate'
            />
            <Combobox
              form={form}
              name='endHour'
              title={endHour ? endHour : 'Giờ trả xe'}
              list={hours}
              handleSelect={handleEndHourSelect}
            />
          </div>
        </div>

        <div className='pt-4'>
          <Button
            type='submit'
            className='bg-secondary hover:bg-secondary/80 h-11 w-full font-medium text-white'
          >
            TÌM XE
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SearchForm
