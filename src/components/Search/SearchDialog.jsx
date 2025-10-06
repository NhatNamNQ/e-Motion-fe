import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog'
import SearchBar from './SearchBar'
import SearchForm from './SearchForm'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { carService } from '@/features/cars/services/carService'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const SearchDialog = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const form = useForm({
    defaultValues: { location: '', startDate: null, endDate: null, startTime: null, endTime: null }
  })
  useEffect(() => {
    if (location?.state?.date) {
      form.reset(location.state.date)
    }
  }, [form, location])

  const onSubmit = async (values) => {
    try {
      const { data } = await carService.searchCars({
        city: values.location,
        startTime: `${format(values.startDate, 'yyyy-MM-dd')}T${values.startTime}:00`,
        endTime: `${format(values.endDate, 'yyyy-MM-dd')}T${values.endTime}:00`
      })
      navigate('/cars', {
        state: {
          cars: data,
          date: values
        }
      })
    } catch (error) {
      console.error('Search failed', error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SearchBar form={form} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Tìm xe</DialogTitle>
          <DialogDescription>Nhập thông tin để tìm chiếc xe phù hợp với bạn.</DialogDescription>
        </DialogHeader>
        <SearchForm form={form} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}

export default SearchDialog
