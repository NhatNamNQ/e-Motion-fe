import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  CommandGroup
} from './ui/command'
import { useState } from 'react'
import { ScrollArea } from './ui/scroll-area'

const Combobox = ({ form, name, title, list, handleSelect, width }) => {
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
                  role='combobox'
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {title}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              align='start'
              className='p-0'
              style={{ width: width ? `${width}px` : 'auto' }}
            >
              <Command>
                {name === 'location' && <CommandInput />}
                <CommandList>
                  <ScrollArea className='w-full' onWheel={(e) => e.stopPropagation()}>
                    <CommandEmpty>Không tìm thấy địa điểm</CommandEmpty>
                    <CommandGroup>
                      {list.map((item) => (
                        <CommandItem
                          value={item.value}
                          key={item.value}
                          onSelect={(item) => {
                            handleSelect(item)
                            setOpen(false)
                          }}
                        >
                          {item.value}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </ScrollArea>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  )
}

export default Combobox
