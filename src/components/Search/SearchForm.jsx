import { Form } from '../ui/form'
import { Button } from '../ui/button'
import DatePicker from '../DatePicker'
import Combobox from '../Combobox'
import TimePicker from '../TimePicker'
import { format } from 'date-fns'

const locations = [
  {
    value: 'Hồ Chí Minh'
  },
  {
    value: 'Hà Nội'
  }
]

const SearchForm = ({ form, onSubmit }) => {
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
            <TimePicker
              form={form}
              name='startHour'
              title={startHour ? startHour : 'Giờ nhận xe'}
              type='startHour'
              handleSelect={handleStartHourSelect}
              selectedDate={startDate}
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
            <TimePicker
              form={form}
              name='endHour'
              title={endHour ? endHour : 'Giờ trả xe'}
              type='endHour'
              handleSelect={handleEndHourSelect}
              selectedDate={endDate}
            />
          </div>
        </div>

        <div className='pt-4'>
          <Button
            type='submit'
            className='bg-secondary hover:bg-secondary/80 h-11 w-full font-medium text-white'
          >
            XÁC NHẬN
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SearchForm
