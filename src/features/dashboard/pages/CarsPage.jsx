import React, { useCallback, useEffect, useState } from 'react'
import { Car, CirclePlus, X } from 'lucide-react'
import { userService } from '../services/userService'
import { toast } from 'sonner'
import Loader from '@/components/Loader'
import CarForm from '../components/CarForm'
import { carStatusOptions } from '../constants/carConfig'
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

import CarsTable from '../components/CarsTable'
import { useDebounce } from 'use-debounce'
import { stationService } from '../services/stationService'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/selectors/authSelectors'
import { carService } from '@/features/cars/services/carService'

const CarsPage = () => {
  const currentUser = useSelector(selectUser)
  const isAdmin = currentUser.role === 'ROLE_ADMIN'

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limitPerPage, setLimitPerPage] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const [cars, setCars] = useState([])
  const [selectedStatuses, setSelectedStatuses] = useState([])
  const [selectedStation, setSelectedStation] = useState(null)
  const [mode, setMode] = useState({
    type: 'add',
    car: null
  })
  const [showCarForm, setShowCarForm] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [debouncedSearch] = useDebounce(searchKey, 500)
  const [stations, setStations] = useState([])

  const fetchCars = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await carService.getManageCars(
        currentPage,
        limitPerPage,
        selectedStatuses,
        debouncedSearch,
        selectedStation?.id
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
      toast.error('Error get users: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, debouncedSearch, limitPerPage, selectedStation?.id, selectedStatuses])
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
  }

  const handleCLickAddUserBtn = () => {
    setMode({ type: 'add', car: null })
    setShowCarForm(true)
  }

  const handleSubmitAddCar = async (carData) => {
    console.log(carData)
    setShowCarForm(false)
    setIsLoading(true)
    try {
      await carService.addNewCar(carData)
      toast.success('Car added successfully!')
      fetchCars()
    } catch (error) {
      setShowCarForm(true)
      toast.error('Error adding car: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitEditCar = async (carData) => {
    setShowCarForm(false)
    setIsLoading(true)
    try {
      await carService.updateCar(carData)
      await fetchCars()
      toast.success('Edit user successfully!')
    } catch (error) {
      setShowCarForm(true)
      toast.error('Error adding user: ' + error.message)
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
        toast.error('Error get users: ' + error.message)
      } finally {
        fetchCars()
      }
    }
    fetchStationNames()
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

  return (
    <div className='min-h-screen'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-8'>
          <div className='mb-2 flex items-start justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Manage Cars</h1>
              <p className='mt-1 text-gray-500'>Manage your cars here.</p>
            </div>
            <Button onClick={handleCLickAddUserBtn}>
              +<Car className='h-4 w-4' />
              Add New Car
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className='mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-1 items-center gap-4'>
              <Input
                placeholder='Filter car name...'
                value={searchKey ?? ''}
                onChange={(e) => setSearchKey(e.target.value)}
                className='h-8 w-[150px] pl-8 lg:w-[250px]'
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
                    Status
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
                    <h3 className='font-semibold text-gray-900'>Filter by Status</h3>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  {carStatusOptions.map((status) => (
                    <Label>
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
                    <SelectValue placeholder='Select Station' />
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

              {(selectedStatuses.length > 0 || selectedStation != null) && (
                <button
                  onClick={clearFilters}
                  className='flex items-center gap-2 rounded-lg p-3 px-4 py-2 hover:cursor-pointer hover:bg-gray-200'
                >
                  Reset
                  <X className='h-5 w-5' />
                </button>
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
      </div>
    </div>
  )
}

export default CarsPage
