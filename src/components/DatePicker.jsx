import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { FormControl, FormField, FormItem } from './ui/form'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from './ui/calendar'
import { useState } from 'react'

const DatePicker = ({ form, handleSelect, title, name }) => {
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
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date)
                  handleSelect(date)
                  setOpen(false)
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
