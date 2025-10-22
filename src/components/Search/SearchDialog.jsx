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

const SearchDialog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchForm = useSelector(selectSearchForm)
  const [open, setOpen] = useState(false)
  const form = useForm({
    defaultValues: searchForm
  })

  useEffect(() => {
    if (!searchForm.startDate || !searchForm.startHour) dispatch(setDefaultTime())
  }, [dispatch, searchForm])

  const onSubmit = async (values) => {
    dispatch(setSearchForm(values))
    setOpen(false)
    navigate('/cars')
    await dispatch(
      searchCars({
        city: values.location,
        startTime: `${formatDate(values.startDate)}T${values.startHour}:00`,
        endTime: `${formatDate(values.endDate)}T${values.endHour}:00`
      })
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SearchBar form={form} onSubmit={onSubmit} />
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
