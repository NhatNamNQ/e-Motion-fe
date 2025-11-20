import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { FormControl, FormField, FormItem } from './ui/form'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from './ui/calendar'
import { useState } from 'react'

const DatePicker = ({ form, handleSelect, title, name, minDate, maxDate }) => {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon />
                  {title}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto p-0'
              align='start'
              side={name === 'startDate' ? 'bottom' : 'top'}
              sideOffset={4}
              avoidCollisions={false}
            >
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date)
                  handleSelect(date)
                  setOpen(false)
                }}
                disabled={(date) => {
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  const checkDate = new Date(date)
                  checkDate.setHours(0, 0, 0, 0)

                  if (checkDate < today) return true

                  if (minDate) {
                    const min = new Date(minDate)
                    min.setHours(0, 0, 0, 0)
                    if (checkDate < min) return true
                  }

                  if (maxDate) {
                    const max = new Date(maxDate)
                    max.setHours(0, 0, 0, 0)
                    if (checkDate > max) return true
                  }

                  return false
                }}
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  )
}

export default DatePicker
