const CarImageGallery = ({ car }) => {
  return (
    <section>
      <div className='grid max-h-[600px] grid-cols-3 grid-rows-3 gap-2 md:grid-cols-3'>
        {car.images.slice(0, 4).map((image, index) => (
          <div key={index} className={index === 0 ? 'col-span-3 row-span-2' : ''}>
            <img
              src={image}
              alt={`image ${index}`}
              className='h-full w-full cursor-pointer rounded-md object-cover'
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default CarImageGallery
