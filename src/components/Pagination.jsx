import { ChevronDownIcon, CheckIcon } from 'lucide-react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

const Pagination = ({ currentPage, totalPages, limitPerPage, setLimitPerPage, setCurrentPage }) => {
  const limitOptions = [10, 20, 30, 40, 50]

  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          '...',
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        )
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    return pages
  }

  return (
    <div className='flex items-center justify-between border-t border-gray-200 px-6 py-4'>
      {/* Rows per page */}
      <div className='flex items-center gap-2'>
        <Listbox value={limitPerPage} onChange={setLimitPerPage}>
          <ListboxButton className='relative flex cursor-pointer items-center justify-between gap-3 rounded-md border border-gray-300 px-3 py-1 text-left text-sm'>
            {limitPerPage}
            <ChevronDownIcon className='w-4' />
          </ListboxButton>
          <ListboxOptions
            anchor='top start'
            className='absolute mt-1 w-24 rounded-md border border-gray-300 bg-white shadow-lg'
          >
            {limitOptions.map((option) => (
              <ListboxOption key={option} value={option}>
                {({ selected, active }) => (
                  <div
                    className={`flex cursor-pointer justify-between px-2 py-1 text-sm ${
                      active ? 'bg-gray-200' : ''
                    }`}
                  >
                    {option}
                    {selected && <CheckIcon className='h-4 w-4 text-gray-500' />}
                  </div>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>

        <p className='text-sm text-gray-600 sm:block'>Rows per page</p>
      </div>

      {/* Page info */}
      <div className='text-sm text-gray-600'>
        Page {currentPage} of {totalPages}
      </div>

      {/* Page navigation */}
      <div className='flex items-center gap-2'>
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className='cursor-pointer rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
        >
          «
        </button>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className='cursor-pointer rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
        >
          ‹
        </button>

        {getPageNumbers().map((page, idx) =>
          page === '...' ? (
            <span key={idx} className='px-2 text-gray-500'>
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => setCurrentPage(page)}
              className={`cursor-pointer rounded-md px-3 py-1 ${
                page === currentPage
                  ? 'bg-black text-white'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='cursor-pointer rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
        >
          ›
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className='cursor-pointer rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
        >
          »
        </button>
      </div>
    </div>
  )
}

export default Pagination
