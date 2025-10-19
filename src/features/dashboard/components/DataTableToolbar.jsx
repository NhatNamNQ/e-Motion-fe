import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'

const DataTableToolbar = ({
  table,
  searchPlaceholder = 'Filter...',
  globalFilter = '',
  setGlobalFilter,
  onClearSearch
}) => {
  const handleClear = () => {
    onClearSearch()
  }

  const isFiltered = globalFilter?.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <div className='relative'>
          <Search className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className='h-8 w-[150px] pl-8 lg:w-[250px]'
          />
        </div>

        {isFiltered && (
          <Button type='button' variant='ghost' onClick={handleClear} className='h-8 px-2 lg:px-3'>
            Clear
          </Button>
        )}
      </div>

      <div className='flex items-center space-x-2'>
        <p className='text-muted-foreground text-sm'>
          {isFiltered
            ? `${table.getRowModel().rows.length} result(s) found`
            : `${table.getRowModel().rows.length} row(s)`}
        </p>
      </div>
    </div>
  )
}

export default DataTableToolbar
