import { useCallback, useEffect, useReducer } from 'react'
import CarList from '../components/CarList'
import SkeletonCard from '@/components/SkeletonCard'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectSearchResults,
  selectSearchLoading,
  selectCity,
  selectStartTime,
  selectEndTime
} from '@/store/selectors/searchSelectors'
import SearchDialog from '@/components/Search/SearchDialog'
import SearchBar from '@/components/Search/SearchBar'
import { searchCars } from '@/store/actions/searchActions'
import FilterSidebar from '../components/FilterSidebar'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { carService } from '../services/carService'
import SchedulePopup from '../components/SchedulePopup'
import CarNameSearchBar from '../components/CarNameSearchBar'

const initialState = {
  currentPage: 1,
  totalPages: 1,
  selectedBrands: [],
  selectedCategories: [],
  priceRange: [],
  selectedSeat: null,
  search: '',
  availableCars: [],
  unavailableCars: [],
  schedulePopup: {
    open: false,
    carId: null,
    data: null,
    loading: false,
    error: null
  }
}

// Reducer
const carListReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload }
    case 'SET_TOTAL_PAGES':
      return { ...state, totalPages: action.payload }
    case 'SET_FILTERS':
      return {
        ...state,
        selectedBrands: action.payload.brands,
        selectedCategories: action.payload.categories,
        priceRange: action.payload.priceRange,
        selectedSeat: action.payload.seat,
        currentPage: 1,
        availableCars: [],
        unavailableCars: []
      }
    case 'SET_SEARCH':
      return { ...state, search: action.payload }
    case 'SET_AVAILABLE_CARS':
      return { ...state, availableCars: action.payload }
    case 'SET_UNAVAILABLE_CARS':
      return { ...state, unavailableCars: action.payload }
    case 'APPEND_AVAILABLE_CARS':
      return {
        ...state,
        availableCars: [
          ...state.availableCars,
          ...action.payload.filter(
            (newCar) => !state.availableCars.some((prevCar) => prevCar.id === newCar.id)
          )
        ]
      }
    case 'APPEND_UNAVAILABLE_CARS':
      return {
        ...state,
        unavailableCars: [
          ...state.unavailableCars,
          ...action.payload.filter(
            (newCar) => !state.unavailableCars.some((prevCar) => prevCar.id === newCar.id)
          )
        ]
      }
    case 'RESET_CARS':
      return {
        ...state,
        currentPage: 1,
        availableCars: [],
        unavailableCars: []
      }
    case 'OPEN_SCHEDULE_POPUP':
      return {
        ...state,
        schedulePopup: {
          open: true,
          carId: action.payload,
          data: null,
          loading: true,
          error: null
        }
      }
    case 'SET_SCHEDULE_DATA':
      return {
        ...state,
        schedulePopup: {
          ...state.schedulePopup,
          data: action.payload,
          loading: false,
          error: null
        }
      }
    case 'SET_SCHEDULE_ERROR':
      return {
        ...state,
        schedulePopup: {
          ...state.schedulePopup,
          data: null,
          loading: false,
          error: action.payload
        }
      }
    case 'CLOSE_SCHEDULE_POPUP':
      return {
        ...state,
        schedulePopup: {
          open: false,
          carId: null,
          data: null,
          loading: false,
          error: null
        }
      }
    default:
      return state
  }
}

const CarListPage = () => {
  const dispatch = useDispatch()
  const searchResults = useSelector(selectSearchResults)
  const city = useSelector(selectCity)
  const startTime = useSelector(selectStartTime)
  const endTime = useSelector(selectEndTime)
  const isSearchLoading = useSelector(selectSearchLoading)

  const [state, localDispatch] = useReducer(carListReducer, initialState)

  useEffect(() => {
    localDispatch({ type: 'RESET_CARS' })
  }, [
    city,
    startTime,
    endTime,
    state.search,
    state.selectedBrands,
    state.selectedCategories,
    state.priceRange,
    state.selectedSeat
  ])

  useEffect(() => {
    dispatch(
      searchCars({
        brands: state.selectedBrands,
        categories: state.selectedCategories,
        minPrice: state.priceRange[0] || 0.1,
        maxPrice: state.priceRange[1] || 100000000,
        seats: state.selectedSeat || null,
        page: state.currentPage,
        limit: 8,
        search: state.search,
        city,
        startTime,
        endTime
      })
    )
  }, [
    state.currentPage,
    state.selectedBrands,
    state.selectedCategories,
    state.priceRange,
    state.selectedSeat,
    state.search,
    city,
    startTime,
    endTime,
    dispatch
  ])

  useEffect(() => {
    if (searchResults?.content?.availableVehicles && searchResults?.content?.unavailableVehicles) {
      localDispatch({ type: 'SET_TOTAL_PAGES', payload: searchResults?.totalPages || 1 })

      if (state.currentPage === 1) {
        localDispatch({
          type: 'SET_AVAILABLE_CARS',
          payload: searchResults.content.availableVehicles
        })
        localDispatch({
          type: 'SET_UNAVAILABLE_CARS',
          payload: searchResults.content.unavailableVehicles
        })
      } else {
        localDispatch({
          type: 'APPEND_AVAILABLE_CARS',
          payload: searchResults.content.availableVehicles
        })
        localDispatch({
          type: 'APPEND_UNAVAILABLE_CARS',
          payload: searchResults.content.unavailableVehicles
        })
      }
    } else if (searchResults?.content) {
      localDispatch({ type: 'SET_TOTAL_PAGES', payload: searchResults?.totalPages || 1 })

      if (state.currentPage === 1) {
        localDispatch({ type: 'SET_AVAILABLE_CARS', payload: searchResults.content })
        localDispatch({ type: 'SET_UNAVAILABLE_CARS', payload: [] })
      } else {
        localDispatch({ type: 'APPEND_AVAILABLE_CARS', payload: searchResults.content })
        localDispatch({ type: 'SET_UNAVAILABLE_CARS', payload: [] })
      }
    }
  }, [searchResults, state.currentPage])

  const handleFilterChange = ({ brands, categories, priceRange: newPriceRange, seat }) => {
    localDispatch({
      type: 'SET_FILTERS',
      payload: {
        brands,
        categories,
        priceRange: newPriceRange,
        seat
      }
    })
  }

  const handeSearchCarName = useCallback((search) => {
    localDispatch({ type: 'SET_SEARCH', payload: search })
  }, [])

  const handleLoadMore = () => {
    if (state.currentPage < state.totalPages && !isSearchLoading) {
      localDispatch({ type: 'SET_CURRENT_PAGE', payload: state.currentPage + 1 })
    }
  }

  const handleViewSchedule = async (carId) => {
    localDispatch({ type: 'OPEN_SCHEDULE_POPUP', payload: carId })
    try {
      const data = await carService.viewCarSchedule(carId)
      localDispatch({ type: 'SET_SCHEDULE_DATA', payload: data })
    } catch (error) {
      localDispatch({
        type: 'SET_SCHEDULE_ERROR',
        payload: error.message || 'Lỗi khi tải lịch trình'
      })
    }
  }

  const closeSchedulePopup = () => {
    localDispatch({ type: 'CLOSE_SCHEDULE_POPUP' })
  }

  const totalCars = state.availableCars.length + state.unavailableCars.length
  const hasMorePages = state.currentPage < state.totalPages

  return (
    <div className='container mx-auto mb-12 h-full p-4'>
      <SearchDialog
        triggerChildren={({ form, onSubmit }) => <SearchBar form={form} onSubmit={onSubmit} />}
      />

      <div className='mt-6'>
        <div className='mb-6 flex justify-between'>
          <FilterSidebar
            onFilterChange={handleFilterChange}
            selectedBrands={state.selectedBrands}
            selectedCategories={state.selectedCategories}
            priceRange={state.priceRange}
            selectedSeat={state.selectedSeat}
          />
          <CarNameSearchBar onSearch={handeSearchCarName} />
        </div>

        {/* Car List */}
        <div>
          {isSearchLoading && state.currentPage === 1 ? (
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : totalCars > 0 ? (
            <>
              <CarList cars={state.availableCars} />

              {hasMorePages && !isSearchLoading && (
                <div className='mt-8 mb-8 flex justify-center'>
                  <Button
                    onClick={handleLoadMore}
                    disabled={isSearchLoading}
                    className='bg-secondary text-background hover:bg-secondary/80 min-w-[200px]'
                    size='lg'
                  >
                    {isSearchLoading ? '' : 'Xem thêm xe'}
                  </Button>
                </div>
              )}

              {isSearchLoading && (
                <div className='mt-8 mb-8 flex w-full justify-center'>
                  <Spinner className='text-secondary size-10' />
                </div>
              )}

              {state.unavailableCars.length > 0 && (
                <>
                  <h2 className='mt-8 mb-4 text-xl font-semibold text-gray-600'>
                    Xe đang thuê trong thời gian tìm kiếm
                  </h2>
                  <CarList
                    cars={state.unavailableCars}
                    isUnavailabel={true}
                    handleViewSchedule={handleViewSchedule}
                  />
                </>
              )}
            </>
          ) : (
            <div className='h-full py-12 text-center'>
              <p className='text-lg text-gray-500'>Không tìm thấy xe nào phù hợp.</p>
            </div>
          )}
        </div>
      </div>

      <SchedulePopup
        isOpen={state.schedulePopup.open}
        onClose={closeSchedulePopup}
        loading={state.schedulePopup.loading}
        error={state.schedulePopup.error}
        data={state.schedulePopup.data}
      />
    </div>
  )
}

export default CarListPage
