import { useEffect, useState } from 'react'
import CarList from '../components/CarList'
import { carService } from '../services/carService'
import SkeletonCard from '@/components/SkeletonCard'

const CarListPage = () => {
  const [cars, setCars] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const res = await carService.getCars()
        setCars(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

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
