const CardDashboard = ({ card }) => {
  return (
    <div
      key={card.title}
      className='flex items-center gap-4 rounded-xl border bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg'
    >
      {card.icon}
      <div>
        <h4 className='mb-1 text-sm font-medium text-gray-600'>{card.title}</h4>
        <p className='text-3xl font-bold text-gray-900'>{card.value}</p>
      </div>
    </div>
  )
}

export default CardDashboard
