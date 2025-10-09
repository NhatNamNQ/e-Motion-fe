import { Link } from 'react-router-dom'
import CarCard from './CarCard'

const CarList = ({ cars }) => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
      {cars.map((car) => (
        <Link to={`/cars/${car.id}`}>
          <CarCard key={car.id} car={car} />
        </Link>
      ))}
    </div>
  )
}

export default CarList
