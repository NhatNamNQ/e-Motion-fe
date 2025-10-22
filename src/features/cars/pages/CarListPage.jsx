import { useEffect } from 'react'
import CarList from '../components/CarList'
import SkeletonCard from '@/components/SkeletonCard'
import { useDispatch, useSelector } from 'react-redux'
import { selectCars, selectCarsLoading } from '@/store/selectors/carsSelectors'
import { getCars } from '@/store/actions/carsActions'
import { selectSearchResults, selectSearchLoading } from '@/store/selectors/searchSelectors'
import { toast } from 'sonner'
import SearchDialog from '@/components/Search/SearchDialog'

const CarListPage = () => {
  const dispatch = useDispatch()
  const cars = useSelector(selectCars)
  const searchResults = useSelector(selectSearchResults)
  const isLoading = useSelector(selectCarsLoading)
  const isSearchLoading = useSelector(selectSearchLoading)

  const displayCars = searchResults.length > 0 ? searchResults : cars
  const loading = isLoading || isSearchLoading

  useEffect(() => {
    if (searchResults.length === 0) {
      const loadCars = async () => {
        try {
          await dispatch(getCars())
        } catch (error) {
          toast.error(error)
        }
      }
      loadCars()
    }
  }, [dispatch, searchResults.length])

  return (
    <div className='relative container mx-auto p-4'>
      <SearchDialog />
      <h1 className='mb-4 text-3xl font-bold'>
        {searchResults.length > 0 ? 'Kết quả tìm kiếm' : 'Danh sách xe điện'}
      </h1>

      {loading ? (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : displayCars.length > 0 ? (
        <CarList cars={displayCars} />
      ) : (
        <div className='py-8 text-center'>
          <p className='text-gray-500'>Không tìm thấy xe nào phù hợp.</p>
        </div>
      )}
    </div>
  )
}

export default CarListPage
