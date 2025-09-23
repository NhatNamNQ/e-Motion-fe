import { useEffect, useState } from 'react'
import CarList from '../components/CarList'
import { cars as mockCars } from '../constants/mockData'

const CarListPage = () => {
  const [cars, setCars] = useState([])
  useEffect(() => {
    setCars(mockCars)
  }, [])
  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-4 text-3xl font-bold'>Danh sách xe điện</h1>
      <CarList cars={cars} />
    </div>
  )
}

export default CarListPage
