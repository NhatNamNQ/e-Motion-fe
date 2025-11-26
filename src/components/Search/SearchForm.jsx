import { Form } from '../ui/form'
import { Button } from '../ui/button'
import DatePicker from '../DatePicker'
import Combobox from '../Combobox'
import TimePicker from '../TimePicker'
import { format, parse, isBefore, isEqual, addMonths } from 'date-fns'
import { useEffect, useState } from 'react'

const locations = [
  {
    value: 'Hồ Chí Minh'
  },
  {
    value: 'Hà Nội'
  }
]

const SearchForm = ({ form, onSubmit, type }) => {
  const { startDate, endDate, location, startHour, endHour } = form.watch()
  const [dateTimeError, setDateTimeError] = useState('')

  useEffect(() => {
    if (startDate && endDate && startHour && endHour) {
      const startDateTime = parse(`${startDate} ${startHour}`, 'dd/MM/yyyy HH:mm', new Date())
      const endDateTime = parse(`${endDate} ${endHour}`, 'dd/MM/yyyy HH:mm', new Date())

      if (isBefore(endDateTime, startDateTime) || isEqual(endDateTime, startDateTime)) {
        setDateTimeError('Thời gian trả xe phải sau thời gian nhận xe')
      } else {
        setDateTimeError('')
      }
    }
  }, [startDate, endDate, startHour, endHour])

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

  const handleFormSubmit = (data) => {
    if (dateTimeError) {
      return
    }
    onSubmit(data)
  }

  const getEndDateConstraints = () => {
    if (!startDate) return {}

    const parsedStartDate = parse(startDate, 'dd/MM/yyyy', new Date())
    return {
      minDate: parsedStartDate,
      maxDate: addMonths(parsedStartDate, 6)
    }
  }

  const endDateConstraints = getEndDateConstraints()

  const getStartDateConstraints = () => {
    const today = new Date()
    return {
      minDate: today,
      maxDate: addMonths(today, 6)
    }
  }

  const startDateConstraints = getStartDateConstraints()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className='space-y-6'>
        {type !== 'calculateFees' && (
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
        )}

        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700'>Thời gian nhận xe</label>
          <div className='grid grid-cols-2 gap-3'>
            <DatePicker
              form={form}
              handleSelect={handleStartDateSelect}
              title={startDate || 'Ngày nhận xe'}
              name='startDate'
              minDate={startDateConstraints.minDate}
              maxDate={startDateConstraints.maxDate}
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
              minDate={endDateConstraints.minDate}
              maxDate={endDateConstraints.maxDate}
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
          {dateTimeError && <p className='text-sm text-red-500'>{dateTimeError}</p>}
        </div>

        <div className='pt-4'>
          <Button
            type='submit'
            disabled={!!dateTimeError}
            className='bg-secondary hover:bg-secondary/80 h-11 w-full font-medium text-white disabled:cursor-not-allowed disabled:opacity-50'
          >
            XÁC NHẬN
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SearchForm
