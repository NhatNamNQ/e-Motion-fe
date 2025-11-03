import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { FormControl, FormField, FormItem } from './ui/form'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { ScrollArea } from './ui/scroll-area'
import { Clock } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'

const TimePicker = ({ form, handleSelect, title, name, selectedDate, type }) => {
  const [open, setOpen] = useState(false)
  const scrollAreaRef = useRef(null)

  const generateHours = () => {
    const hours = []
    const currentDate = new Date()
    const currentHour = currentDate.getHours()
    const isToday =
      selectedDate &&
      new Date(selectedDate.split('/').reverse().join('-')).toDateString() ===
        currentDate.toDateString()

    for (let i = 0; i < 24; i++) {
      const hourString = i.toString().padStart(2, '0')
      const timeValue = `${hourString}:00`

      let disabled = false

      if (isToday) {
        if (type === 'startHour') {
          disabled = i < currentHour + 2
        } else {
          disabled = i < currentHour + 6
        }
      }

      hours.push({
        value: timeValue,
        label: timeValue,
        disabled
      })
    }
    return hours
  }

  const hours = generateHours()

  const scrollToCurrentTime = useCallback(() => {
    if (scrollAreaRef.current) {
      const currentHour = new Date().getHours()
      const targetHour = Math.min(type === 'startHour' ? currentHour + 2 : currentHour + 6, 23)
      const hourElement = scrollAreaRef.current.querySelector(`[data-hour="${targetHour}"]`)
      if (hourElement) {
        hourElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [type])

  useEffect(() => {
    if (open) {
      setTimeout(scrollToCurrentTime, 100)
    }
  }, [open, scrollToCurrentTime])

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
                  <Clock className='mr-2 h-4 w-4' />
                  {title}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <ScrollArea className='h-60 w-32' ref={scrollAreaRef}>
                <div className='p-1'>
                  {hours.map((hour) => (
                    <Button
                      key={hour.value}
                      variant={field.value === hour.value ? 'default' : 'ghost'}
                      className={cn(
                        'w-full justify-start font-normal',
                        hour.disabled && 'cursor-not-allowed opacity-50',
                        field.value === hour.value &&
                          'bg-secondary hover:bg-secondary/80 text-primary-foreground'
                      )}
                      data-hour={parseInt(hour.value.split(':')[0])}
                      disabled={hour.disabled}
                      onClick={() => {
                        if (!hour.disabled) {
                          field.onChange(hour.value)
                          handleSelect(hour.value)
                          setOpen(false)
                        }
                      }}
                    >
                      {hour.label}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  )
}

export default TimePicker
