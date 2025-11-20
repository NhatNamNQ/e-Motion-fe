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

import { useDispatch, useSelector } from 'react-redux'
import { selectSearchForm } from '@/store/selectors/searchSelectors'
import { setDefaultTime, setSearchForm } from '@/store/slices/searchSlice'
import { searchCars } from '@/store/actions/searchActions'
import { formatDate } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const SearchDialog = ({ triggerChildren }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchForm = useSelector(selectSearchForm)
  const [open, setOpen] = useState(false)
  const form = useForm({
    defaultValues: searchForm
  })

  useEffect(() => {
    const now = new Date()
    if (
      !searchForm.startDate ||
      !searchForm.startHour ||
      new Date(searchForm.startDate?.split('/').reverse().join('-') + 'T' + searchForm.startHour) <
        now
    ) {
      dispatch(setDefaultTime())
    }
  }, [dispatch, searchForm])

  const onSubmit = async (values) => {
    try {
      dispatch(setSearchForm(values))
      setOpen(false)
      navigate('/cars')
      const result = await dispatch(
        searchCars({
          brands: [],
          categories: [],
          page: 1,
          limit: 8,
          search: '',
          city: values.location,
          startTime: `${formatDate(values.startDate)}T${values.startHour}:00`,
          endTime: `${formatDate(values.endDate)}T${values.endHour}:00`
        })
      )

      if (searchCars.rejected.match(result)) {
        toast.error('Có lỗi xảy ra khi tìm kiếm xe')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerChildren({ form, onSubmit })}</DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
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
