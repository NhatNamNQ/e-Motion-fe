import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const FilterPopover = ({
  label,
  items,
  selectedItems,
  onItemChange,
  onClear,
  onApply,
  isOpen,
  onOpenChange
}) => {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={`flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium transition-all ${
            selectedItems.length > 0
              ? 'border-secondary bg-secondary/10 text-secondary'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {label}
          {selectedItems.length > 0 && (
            <span className='bg-secondary flex h-5 w-5 items-center justify-center rounded-full text-xs text-white'>
              {selectedItems.length}
            </span>
          )}
          <ChevronDown className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80 p-4' align='start'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h3 className='font-semibold text-gray-800'>Chọn {label.toLowerCase()}</h3>
            <Button
              variant='ghost'
              size='sm'
              onClick={onClear}
              className='text-sm text-gray-500 hover:text-gray-700'
            >
              Xóa
            </Button>
          </div>
          <div className='max-h-80 space-y-3 overflow-y-auto'>
            {items.map((item, index) => (
              <div key={index} className='flex items-center space-x-3'>
                <Checkbox
                  id={`${label}-${index}`}
                  checked={selectedItems.includes(item)}
                  onCheckedChange={(checked) => onItemChange(item, checked)}
                />
                <Label
                  htmlFor={`${label}-${index}`}
                  className='flex-1 cursor-pointer text-sm font-normal'
                >
                  {item}
                </Label>
              </div>
            ))}
          </div>
          <Button onClick={onApply} className='bg-secondary hover:bg-secondary/80 w-full'>
            Áp dụng
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default FilterPopover
