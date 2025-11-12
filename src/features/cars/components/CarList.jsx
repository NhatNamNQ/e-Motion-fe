import CarCard from './CarCard'

const CarList = ({ cars, isUnavailabel, handleViewSchedule }) => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          isUnavailabel={isUnavailabel}
          handleViewSchedule={handleViewSchedule}
        />
      ))}
    </div>
  )
}

export default CarList
