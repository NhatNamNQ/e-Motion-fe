import { useEffect, useState, useCallback } from 'react'
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

const CarListPage = () => {
  const dispatch = useDispatch()
  const searchResults = useSelector(selectSearchResults)
  const city = useSelector(selectCity)
  const startTime = useSelector(selectStartTime)
  const endTime = useSelector(selectEndTime)
  const isSearchLoading = useSelector(selectSearchLoading)

  const [currentPage, setCurrentPage] = useState(1)
  const [cars, setCars] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(() => {
    if (searchResults?.content) {
      setTotalPages(searchResults?.totalPages || 1)
      setCars((prev) =>
        currentPage === 1 ? searchResults.content : [...prev, ...searchResults.content]
      )
    }
    // eslint-disable-next-line
  }, [searchResults])

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
    // eslint-disable-next-line
  }, [currentPage, selectedBrands, selectedCategories, dispatch])

  useEffect(() => {
    setCurrentPage(1)
    setCars([])
  }, [city, startTime, endTime, selectedBrands, selectedCategories])

  const handleFilterChange = ({ brands, categories }) => {
    setSelectedBrands(brands)
    setSelectedCategories(categories)
    setCurrentPage(1)
    setCars([])
  }

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      !isSearchLoading &&
      currentPage < totalPages
    ) {
      setCurrentPage((prev) => {
        setCurrentPage(prev + 1)
      })
    }
  }, [isSearchLoading, currentPage, totalPages])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

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
          {cars.length === 0 && isSearchLoading ? (
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : cars.length > 0 ? (
            <>
              <CarList cars={cars} />
              {isSearchLoading && currentPage > 1 && (
                <div className='mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
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
