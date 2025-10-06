const SkeletonCard = () => {
  return (
    <div className='animate-pulse cursor-pointer rounded-md border'>
      <div className='relative'>
        <div className='h-56 w-full rounded-t-md bg-gray-200' />
        <div className='absolute top-4 right-4 h-6 w-16 rounded-sm bg-gray-300' />
      </div>
      <div className='p-4'>
        <div className='mb-2 h-6 w-3/4 rounded bg-gray-200' />
        <div className='mb-4 h-4 w-1/2 rounded bg-gray-200' />
        <div className='mb-4 text-end'>
          <div className='mb-2 ml-auto h-6 w-1/2 rounded bg-gray-200' />
          <div className='ml-auto h-4 w-3/4 rounded bg-gray-200' />
        </div>
        <div className='flex items-center justify-evenly border-t-2 border-t-slate-100 pt-4'>
          <div className='h-8 w-16 rounded bg-gray-200' />
          <div className='h-8 w-16 rounded bg-gray-200' />
          <div className='h-8 w-16 rounded bg-gray-200' />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard
