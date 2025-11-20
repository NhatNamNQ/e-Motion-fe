import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const StationFilter = ({ selectedStation, onStationChange, isOpen, onOpenChange, stations }) => {
  const [localStation, setLocalStation] = useState(selectedStation)

  useEffect(() => {
    setLocalStation(selectedStation)
  }, [selectedStation])

  const handleStationChange = (stationId) => {
    const newStationId = Number(stationId)
    const newStation = newStationId === localStation ? null : newStationId
    setLocalStation(newStation)
    onStationChange(newStation)
    onOpenChange(false)
  }

  const hasSelection = selectedStation !== null && selectedStation !== undefined

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={`flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium transition-all ${
            hasSelection
              ? 'border-secondary bg-secondary/10 text-secondary'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {hasSelection
            ? stations.find((s) => s.id === selectedStation)?.name || 'Trạm xe'
            : 'Trạm xe'}
          <ChevronDown className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-64' align='start'>
        <div className='space-y-4'>
          <h4 className='font-medium'>Chọn trạm xe</h4>
          <RadioGroup value={localStation?.toString() || ''} onValueChange={handleStationChange}>
            {stations.map((station) => (
              <div key={station.id} className='flex items-center space-x-2'>
                <RadioGroupItem value={station.id.toString()} id={`station-${station.id}`} />
                <Label htmlFor={`station-${station.id}`} className='flex-1 cursor-pointer'>
                  {station.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default StationFilter
