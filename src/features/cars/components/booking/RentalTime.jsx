import { selectSearchForm } from '@/store/selectors/searchSelectors'
import { setDefaultTime, setSearchForm } from '@/store/slices/searchSlice'
import { Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog'
import SearchForm from '@/components/Search/SearchForm'

const RentalTime = () => {
  const dispatch = useDispatch()
  const searchForm = useSelector(selectSearchForm)
  const { startDate, endDate, startHour, endHour } = searchForm
  const [open, setOpen] = useState(false)
  const form = useForm({
    defaultValues: searchForm
  })

  const onSubmit = async (values) => {
    dispatch(setSearchForm(values))
    setOpen(false)
  }

  useEffect(() => {
    if (!searchForm.startDate || !searchForm.startHour) dispatch(setDefaultTime())
  }, [dispatch, searchForm])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className='cursor-pointer'>
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

export default RentalTime
