import { useEffect, useState } from 'react'
import CarList from '../components/CarList'
import { carService } from '../services/carService'
import { useLocation } from 'react-router-dom'

const CarListPage = () => {
  const [cars, setCars] = useState([])
  const location = useLocation()

  useEffect(() => {
    if (location.state?.cars) {
      setCars(location.state.cars)
    } else {
      try {
        const getCars = async () => {
          const res = await carService.getCars()
          setCars(res.data)
        }
        getCars()
      } catch (error) {
        console.error(error)
      }
    }
  }, [location.state])
  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-4 text-3xl font-bold'>Danh sách xe điện</h1>
      <CarList cars={cars} />
    </div>
  )
}

export default CarListPage
