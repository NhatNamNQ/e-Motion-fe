import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDebounce } from 'use-debounce'

const CarNameSearchBar = ({ onSearch, placeholder = 'Tìm kiếm theo tên xe...' }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)

  useEffect(() => {
    onSearch(debouncedSearchTerm)
  }, [debouncedSearchTerm, onSearch])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  return (
    <div className='relative'>
      <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
      <Input
        type='text'
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        className='pr-10 pl-10'
      />
      {searchTerm && (
        <Button
          variant='ghost'
          size='sm'
          onClick={handleClear}
          className='absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 p-0'
        >
          <X className='h-4 w-4' />
        </Button>
      )}
    </div>
  )
}

export default CarNameSearchBar
