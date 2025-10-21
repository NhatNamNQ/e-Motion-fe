import { useEffect } from 'react'
import CarList from '../components/CarList'
import SkeletonCard from '@/components/SkeletonCard'
import { useDispatch, useSelector } from 'react-redux'
import { selectCars, selectCarsLoading } from '@/store/selectors/carsSelectors'
import { getCars } from '@/store/actions/carsActions'
import { toast } from 'sonner'

const CarListPage = () => {
  const dispatch = useDispatch()
  const cars = useSelector(selectCars)
  const isLoading = useSelector(selectCarsLoading)

  useEffect(() => {
    const loadCars = async () => {
      try {
        await dispatch(getCars())
      } catch (error) {
        toast.error(error)
      }
    }
    loadCars()
  }, [dispatch])

  return (
    <div className='relative container mx-auto p-4'>
      <h1 className='mb-4 text-3xl font-bold'>Danh sách xe điện</h1>

      {isLoading ? (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <CarList cars={cars} />
      )}
    </div>
  )
}

export default CarListPage
