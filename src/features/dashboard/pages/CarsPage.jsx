import React, { useCallback, useEffect, useState } from 'react'
import { Car, CirclePlus, X } from 'lucide-react'
import { toast } from 'sonner'
import Loader from '@/components/Loader'
import CarForm from '../components/CarForm'
import { carStatusOptions } from '../constants/carConfig'
import { createDefaultTimes } from '@/store/slices/searchSlice'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { useForm, FormProvider } from 'react-hook-form'
import DatePicker from '@/components/DatePicker'
import TimePicker from '@/components/TimePicker'
import { format } from 'date-fns'

import CarsTable from '../components/CarsTable'
import { useDebounce } from 'use-debounce'
import { stationService } from '../services/stationService'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '@/store/selectors/authSelectors'
import { setSearchForm } from '@/store/slices/searchSlice'
import { carService } from '@/features/cars/services/carService'
import { useSearchParams } from 'react-router-dom'

const CarsPage = () => {
  const [searchParams] = useSearchParams()
  const model = searchParams.get('model')

  const dispatch = useDispatch()
  const currentUser = useSelector(selectUser)
  const isAdmin = currentUser.role === 'ROLE_ADMIN'
  const form = useForm({
    defaultValues: {
      startDate: '',
      startHour: '',
      endDate: '',
      endHour: ''
    }
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limitPerPage, setLimitPerPage] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const [cars, setCars] = useState([])
  const [selectedStatuses, setSelectedStatuses] = useState(model === 'rental' ? ['Sẵn sàng'] : [])
  const [selectedStation, setSelectedStation] = useState(null)
  const [mode, setMode] = useState({
    type: 'add',
    car: null
  })
  const [showCarForm, setShowCarForm] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [debouncedSearch] = useDebounce(searchKey, 500)
  const [stations, setStations] = useState([])

  const handleStartDateSelect = (date) => {
    const formattedDate = format(date, 'dd/MM/yyyy')
    form.setValue('startDate', formattedDate)
    dispatch(
      setSearchForm({
        startDate: formattedDate
      })
    )
  }

  const handleStartHourSelect = (time) => {
    form.setValue('startHour', time)
    dispatch(
      setSearchForm({
        startHour: time
      })
    )
  }

  const handleEndDateSelect = (date) => {
    const formattedDate = format(date, 'dd/MM/yyyy')
    form.setValue('endDate', formattedDate)
    dispatch(
      setSearchForm({
        endDate: formattedDate
      })
    )
  }

  const handleEndHourSelect = (time) => {
    form.setValue('endHour', time)
    dispatch(
      setSearchForm({
        endHour: time
      })
    )
  }

  const fetchCars = useCallback(async () => {
    setIsLoading(true)
    try {
      const { startDate, startHour, endDate, endHour } = form.watch()

      // Convert dd/MM/yyyy HH:mm to ISO format
      const startDateTime =
        startDate && startHour
          ? `${startDate.split('/').reverse().join('-')}T${startHour}:00`
          : null

      const endDateTime =
        endDate && endHour ? `${endDate.split('/').reverse().join('-')}T${endHour}:00` : null

      const res = await carService.getManageCars(
        currentPage,
        limitPerPage,
        selectedStatuses,
        debouncedSearch,
        selectedStation?.id,
        startDateTime,
        endDateTime
      )

      const carData = res.content.map((car) => ({
        id: car.id,
        name: car.name,
        plate: car.plateNumber,
        battery: car.batteryLevel,
        brand: car.brand,
        station: car.station.name,
        status: car.status
      }))

      setCars(carData)
      setTotalPages(res.totalPages)
    } catch (error) {
      toast.error('Lỗi khi tải danh sách xe: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, debouncedSearch, limitPerPage, selectedStation?.id, selectedStatuses, form])

  const handleClickFilterStatus = (status) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status))
    } else {
      setSelectedStatuses([...selectedStatuses, status])
    }
  }

  const clearFilters = () => {
    setSelectedStatuses([])
    setSelectedStation(null)
    form.reset({
      startDate: '',
      startHour: '',
      endDate: '',
      endHour: ''
    })
    dispatch(
      setSearchForm({
        startDate: null,
        startHour: null,
        endDate: null,
        endHour: null
      })
    )
  }

  const handleCLickAddUserBtn = () => {
    setMode({ type: 'add', car: null })
    setShowCarForm(true)
  }

  const handleSubmitAddCar = async (carData) => {
    setShowCarForm(false)
    setIsLoading(true)
    try {
      await carService.addNewCar(carData)
      toast.success('Thêm xe thành công!')
      await fetchCars()
    } catch (error) {
      setShowCarForm(true)
      toast.error('Lỗi khi thêm xe: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitEditCar = async (carData) => {
    setShowCarForm(false)
    setIsLoading(true)
    try {
      await carService.updateCar(carData)
      toast.success('Cập nhật xe thành công!')
      await fetchCars()
    } catch (error) {
      setShowCarForm(true)
      toast.error('Lỗi khi cập nhật xe: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterStation = (station) => {
    setSelectedStation(station)
  }

  useEffect(() => {
    const fetchStationNames = async () => {
      setIsLoading(true)
      try {
        const res = await stationService.getAllStations()
        setStations(res)
      } catch (error) {
        toast.error('Lỗi khi tải danh sách trạm: ' + error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStationNames()
  }, [])

  useEffect(() => {
    if (model === 'rental') {
      const defaultTimes = createDefaultTimes()
      form.reset({
        startDate: defaultTimes.startDate,
        startHour: defaultTimes.startHour,
        endDate: defaultTimes.endDate,
        endHour: defaultTimes.endHour
      })
      dispatch(setSearchForm(defaultTimes))
    }
  }, [model, form, dispatch])

  useEffect(() => {
    fetchCars()
  }, [currentPage, limitPerPage, fetchCars, selectedStatuses, debouncedSearch, selectedStation])

  const tableProps = {
    cars,
    limitPerPage,
    setLimitPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    setMode,
    setShowCarForm,
    setIsLoading,
    fetchCars
  }

  const { startDate, startHour, endDate, endHour } = form.watch()

  return (
    <div className='min-h-screen'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-8'>
          <div className='mb-2 flex items-start justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Quản lý xe</h1>
              <p className='mt-1 text-gray-500'>Quản lý xe của bạn ở đây</p>
            </div>
            <Button onClick={handleCLickAddUserBtn}>
              +<Car className='h-4 w-4' />
              Thêm xe
            </Button>
          </div>
        </div>

        {/* Filters */}
        <FormProvider {...form}>
          <div className='mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-1 items-center gap-4'>
                  <Input
                    placeholder='Tìm theo tên xe...'
                    value={searchKey ?? ''}
                    onChange={(e) => setSearchKey(e.target.value)}
                    className='h-8 w-[150px] lg:w-[250px]'
                  />
                  {/* Status Filter */}
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`flex items-center gap-2 rounded-lg border px-4 py-1 transition ${
                          selectedStatuses.length > 0
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <CirclePlus className='size-4' />
                        Trạng thái
                        {selectedStatuses.length > 0 && (
                          <span className='ml-2 flex flex-wrap gap-1'>
                            {selectedStatuses.map((status) => (
                              <span
                                key={status}
                                className='rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-700'
                              >
                                {carStatusOptions.find((s) => s.value === status)?.value || status}
                              </span>
                            ))}
                          </span>
                        )}
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align='start' className='w-60'>
                      <DropdownMenuItem>
                        <h3 className='font-semibold text-gray-900'>Lọc theo trạng thái</h3>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />
                      {carStatusOptions.map((status) => (
                        <Label key={status.value}>
                          <DropdownMenuItem className='w-full'>
                            <Checkbox
                              checked={selectedStatuses.includes(status.value)}
                              onCheckedChange={() => handleClickFilterStatus(status.value)}
                              className='data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 [&_svg]:!text-white'
                            />
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.color}`}
                            >
                              {status.value}
                            </span>
                          </DropdownMenuItem>
                        </Label>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {isAdmin && (
                    <Select
                      onValueChange={(stationId) => {
                        const station = stations.find((s) => s.id === stationId)
                        handleFilterStation(station)
                      }}
                      value={selectedStation?.id || ''}
                    >
                      <SelectTrigger className='w-60'>
                        <SelectValue placeholder='Chọn trạm' />
                      </SelectTrigger>
                      <SelectContent>
                        {stations.map((station) => (
                          <SelectItem key={station.id} value={station.id}>
                            {station.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {(selectedStatuses.length > 0 ||
                    selectedStation != null ||
                    startDate ||
                    startHour ||
                    endDate ||
                    endHour) && (
                    <button
                      onClick={clearFilters}
                      className='flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-200'
                    >
                      Đặt lại
                      <X className='h-5 w-5' />
                    </button>
                  )}
                </div>
              </div>

              {/* Date and Time Range Filter */}
              <div className='flex flex-wrap items-center gap-3'>
                <div className='w-40'>
                  <DatePicker
                    form={form}
                    handleSelect={handleStartDateSelect}
                    title={startDate || 'Ngày bắt đầu'}
                    name='startDate'
                  />
                </div>
                <div className='w-32'>
                  <TimePicker
                    form={form}
                    handleSelect={handleStartHourSelect}
                    title={startHour || 'Giờ bắt đầu'}
                    name='startHour'
                    selectedDate={startDate}
                    type='startHour'
                  />
                </div>
                <span className='text-gray-500'>→</span>
                <div className='w-40'>
                  <DatePicker
                    form={form}
                    handleSelect={handleEndDateSelect}
                    title={endDate || 'Ngày kết thúc'}
                    name='endDate'
                  />
                </div>
                <div className='w-32'>
                  <TimePicker
                    form={form}
                    handleSelect={handleEndHourSelect}
                    title={endHour || 'Giờ kết thúc'}
                    name='endHour'
                    selectedDate={endDate}
                    type='endHour'
                  />
                </div>
                {startDate && startHour && endDate && endHour && (
                  <Button
                    onClick={() => fetchCars()}
                    className='flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700'
                  >
                    Tìm kiếm
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          {isLoading ? <Loader /> : <CarsTable {...tableProps} />}

          {/* Add User Modal */}
          {showCarForm && (
            <CarForm
              mode={mode}
              handleSubmitCar={mode.type === 'add' ? handleSubmitAddCar : handleSubmitEditCar}
              setShowCarForm={setShowCarForm}
              stations={stations}
            />
          )}
        </FormProvider>
      </div>
    </div>
  )
}

export default CarsPage
