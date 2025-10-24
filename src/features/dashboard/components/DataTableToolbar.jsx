import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CheckIcon, CirclePlus, Search, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { cn, getStatusColor } from '@/lib/utils'

const DataTableToolbar = ({
  table,
  searchPlaceholder = 'Filter...',
  searchKey = '',
  setSearchKey,
  statusOptions,
  statusFilter = [],
  setStatusFilter
}) => {
  const isFiltered = searchKey?.length > 0 || statusFilter.length > 0
  const selectedValues = new Set(statusFilter)

  const clearFilters = () => {
    setSearchKey('')
    setStatusFilter([])
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <div className='relative'>
          <Search className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
          <Input
            placeholder={searchPlaceholder}
            value={searchKey ?? ''}
            onChange={(e) => setSearchKey(e.target.value)}
            className='h-8 w-[150px] pl-8 lg:w-[250px]'
          />
        </div>

        {statusOptions && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' size='sm' className='h-8 border-dashed'>
                <CirclePlus className='size-4' />
                Status
                {selectedValues?.size > 0 && (
                  <>
                    <Separator orientation='vertical' className='mx-2 h-4' />
                    {statusFilter.map((status) => (
                      <Badge key={status} variant='secondary' className={getStatusColor(status)}>
                        {status}
                      </Badge>
                    ))}
                  </>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0' align='start'>
              <Command>
                <CommandList>
                  <CommandGroup>
                    {statusOptions.map((option) => {
                      const isSelected = selectedValues.has(option)
                      return (
                        <CommandItem
                          key={option}
                          onSelect={() => {
                            if (isSelected) {
                              selectedValues.delete(option)
                            } else {
                              selectedValues.add(option)
                            }
                            setStatusFilter(Array.from(selectedValues))
                          }}
                        >
                          <div
                            className={cn(
                              'border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                              isSelected
                                ? 'bg-primary text-primary-foreground'
                                : 'opacity-50 [&_svg]:invisible'
                            )}
                          >
                            <CheckIcon className={`${getStatusColor(option)} h-4 w-4`} />
                          </div>
                          <Badge className={getStatusColor(option)}>{option}</Badge>
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                  {selectedValues.size > 0 && (
                    <>
                      <CommandSeparator />
                      <CommandGroup>
                        <CommandItem
                          onSelect={() => setStatusFilter([])}
                          className='justify-center text-center'
                        >
                          Clear filters
                        </CommandItem>
                      </CommandGroup>
                    </>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}

        {isFiltered && (
          <Button type='button' variant='ghost' onClick={clearFilters} className='h-8 px-2 lg:px-3'>
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
