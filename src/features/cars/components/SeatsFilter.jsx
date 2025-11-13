import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const SEAT_OPTIONS = [4, 5, 7, 8, 16]

const SeatsFilter = ({ selectedSeat, onSeatChange, isOpen, onOpenChange }) => {
  const [localSeat, setLocalSeat] = useState(selectedSeat)

  const handleSeatChange = (seat) => {
    setLocalSeat(parseInt(seat))
  }

  const handleApply = () => {
    onSeatChange(localSeat)
    onOpenChange(false)
  }

  const handleClear = () => {
    setLocalSeat(null)
  }

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={`flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium transition-all ${
            selectedSeat
              ? 'border-secondary bg-secondary/10 text-secondary'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Số chỗ ngồi
          {selectedSeat && (
            <span className='bg-secondary flex h-5 w-5 items-center justify-center rounded-full text-xs text-white'>
              {selectedSeat}
            </span>
          )}
          <ChevronDown className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80 p-4' align='start'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h3 className='font-semibold text-gray-800'>Chọn số chỗ ngồi</h3>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleClear}
              className='text-sm text-gray-500 hover:text-gray-700'
            >
              Xóa
            </Button>
          </div>
          <RadioGroup value={localSeat?.toString()} onValueChange={handleSeatChange}>
            <div className='grid grid-cols-3 gap-3'>
              {SEAT_OPTIONS.map((seat) => (
                <div key={seat} className='flex items-center space-x-2'>
                  <RadioGroupItem value={seat.toString()} id={`seat-${seat}`} />
                  <Label htmlFor={`seat-${seat}`} className='cursor-pointer text-sm font-normal'>
                    {seat} chỗ
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
          <Button onClick={handleApply} className='bg-secondary hover:bg-secondary/80 w-full'>
            Áp dụng
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default SeatsFilter
