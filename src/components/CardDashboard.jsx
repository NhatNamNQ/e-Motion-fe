const CardDashboard = ({ card }) => {
  return (
    <div className='flex flex-col gap-2 rounded-xl border bg-white p-8 shadow-md transition-shadow duration-300 hover:shadow-lg'>
      <div className='flex items-center justify-between'>
        <div>
          <h4 className='mb-1 text-sm font-medium text-gray-600'>{card.title}</h4>
          {card.value !== undefined && (
            <p className='text-3xl font-bold text-gray-900'>{card.value}</p>
          )}
          {card.peakHours !== undefined && (
            <div className='flex'>
              {card.peakHours.map((hour) => (
                <span
                  key={hour}
                  className='mr-1 mb-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-800'
                >
                  {hour}h
                </span>
              ))}
            </div>
          )}
        </div>
        {card.icon && <div>{card.icon}</div>}
      </div>
    </div>
  )
}

export default CardDashboard
