import { useEffect, useState } from 'react'
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

const CarListPage = () => {
  const dispatch = useDispatch()
  const searchResults = useSelector(selectSearchResults)
  const city = useSelector(selectCity)
  const startTime = useSelector(selectStartTime)
  const endTime = useSelector(selectEndTime)
  const isSearchLoading = useSelector(selectSearchLoading)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [availableCars, setAvailableCars] = useState([])
  const [unavailableCars, setUnavailableCars] = useState([])

  useEffect(() => {
    setCurrentPage(1)
    setAvailableCars([])
    setUnavailableCars([])
  }, [city, startTime, endTime, selectedBrands, selectedCategories])

  useEffect(() => {
    dispatch(
      searchCars({
        brands: selectedBrands,
        categories: selectedCategories,
        page: currentPage,
        limit: 8,
        search: '',
        city,
        startTime,
        endTime
      })
    )
  }, [currentPage, selectedBrands, selectedCategories, city, startTime, endTime, dispatch])

  useEffect(() => {
    if (searchResults?.content?.availableVehicles && searchResults?.content?.unavailableVehicles) {
      setTotalPages(searchResults?.totalPages || 1)

      if (currentPage === 1) {
        setAvailableCars(searchResults.content.availableVehicles)
        setUnavailableCars(searchResults.content.unavailableVehicles)
      } else {
        setAvailableCars((prev) => {
          const newCars = searchResults.content.availableVehicles.filter(
            (newCar) => !prev.some((prevCar) => prevCar.id === newCar.id)
          )
          return [...prev, ...newCars]
        })
        setUnavailableCars((prev) => {
          const newCars = searchResults.content.unavailableVehicles.filter(
            (newCar) => !prev.some((prevCar) => prevCar.id === newCar.id)
          )
          return [...prev, ...newCars]
        })
      }
    } else if (searchResults?.content) {
      setTotalPages(searchResults?.totalPages || 1)

      if (currentPage === 1) {
        setAvailableCars(searchResults.content)
        setUnavailableCars([])
      } else {
        setAvailableCars((prev) => {
          const newCars = searchResults.content.filter(
            (newCar) => !prev.some((prevCar) => prevCar.id === newCar.id)
          )
          return [...prev, ...newCars]
        })
        setUnavailableCars([])
      }
    }
  }, [searchResults, currentPage])

  const handleFilterChange = ({ brands, categories }) => {
    setSelectedBrands(brands)
    setSelectedCategories(categories)
  }

  const handleLoadMore = () => {
    if (currentPage < totalPages && !isSearchLoading) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const totalCars = availableCars.length + unavailableCars.length
  const hasMorePages = currentPage < totalPages

  return (
    <div className='container mx-auto p-4'>
      <SearchDialog
        triggerChildren={({ form, onSubmit }) => <SearchBar form={form} onSubmit={onSubmit} />}
      />

      <div className='mt-6'>
        <div className='mb-6'>
          <FilterSidebar
            onFilterChange={handleFilterChange}
            selectedBrands={selectedBrands}
            selectedCategories={selectedCategories}
          />
        </div>

        {/* Car List */}
        <div>
          {isSearchLoading && currentPage === 1 ? (
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : totalCars > 0 ? (
            <>
              <CarList cars={availableCars} />

              {hasMorePages && (
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

              {unavailableCars.length > 0 && (
                <>
                  <h2 className='mt-8 mb-4 text-xl font-semibold text-gray-600'>Xe đang thuê</h2>
                  <CarList cars={unavailableCars} />
                </>
              )}
            </>
          ) : (
            <div className='py-12 text-center'>
              <p className='text-lg text-gray-500'>Không tìm thấy xe nào phù hợp.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CarListPage
