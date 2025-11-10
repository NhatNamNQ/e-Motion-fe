import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Clock } from 'lucide-react'
import { format, addHours } from 'date-fns'
import { vi } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { profileService } from '../service/profileService'
import { Spinner } from '@/components/ui/spinner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const ExtendDialog = ({ open, onOpenChange, reservation, onSuccess }) => {
  const [newEndDate, setNewEndDate] = useState(null)
  const [newEndTime, setNewEndTime] = useState('')
  const [schedule, setSchedule] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Generate time options (00:00 to 23:00)
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0')
    return `${hour}:00`
  })

  useEffect(() => {
    if (open && reservation) {
      fetchVehicleSchedule()
    }
  }, [open, reservation])

  const fetchVehicleSchedule = async () => {
    try {
      setLoading(true)
      const data = await profileService.getVehicleSchedule(reservation.vehicle.id)
      setSchedule(data || [])
    } catch (error) {
      toast.error('Không thể tải lịch bận của xe')
    } finally {
      setLoading(false)
    }
  }

  const isTimeDisabled = (time) => {
    if (!newEndDate || !reservation?.endTime) return false

    const currentEndTime = new Date(reservation.endTime)
    const selectedDate = new Date(newEndDate)
    const [hours] = time.split(':')

    // Chỉ kiểm tra nếu cùng ngày với endTime hiện tại
    const isSameDay =
      selectedDate.getFullYear() === currentEndTime.getFullYear() &&
      selectedDate.getMonth() === currentEndTime.getMonth() &&
      selectedDate.getDate() === currentEndTime.getDate()

    if (!isSameDay) return false

    // Disable nếu giờ <= giờ kết thúc hiện tại
    return parseInt(hours) <= currentEndTime.getHours()
  }

  const handleSubmit = async () => {
    if (!newEndDate || !newEndTime) {
      toast.error('Vui lòng chọn ngày và giờ kết thúc mới')
      return
    }

    const newEndDateTime = new Date(newEndDate)
    const [hours, minutes] = newEndTime.split(':')
    newEndDateTime.setHours(parseInt(hours), parseInt(minutes), 0)

    const currentEndTime = new Date(reservation.endTime)

    // Kiểm tra thời gian mới phải sau thời gian hiện tại
    if (newEndDateTime <= currentEndTime) {
      toast.error('Thời gian gia hạn phải sau thời gian kết thúc hiện tại')
      return
    }

    // Kiểm tra xung đột với lịch bận
    const hasConflict = schedule.some((booking) => {
      const bookingStart = new Date(booking.startTime)
      const bookingEnd = new Date(booking.endTime)

      // Kiểm tra nếu thời gian mới nằm trong khoảng đã đặt
      return newEndDateTime > bookingStart && newEndDateTime <= bookingEnd
    })

    if (hasConflict) {
      toast.error('Thời gian gia hạn trùng với lịch bận của xe')
      return
    }

    try {
      setSubmitting(true)

      console.log('Sending request:', {
        code: reservation.code,
        newReturnTime: newEndDateTime.toISOString()
      })

      const response = await profileService.extendReservation(
        reservation.code,
        newEndDateTime.toISOString() // Gửi string ISO datetime
      )

      console.log('Response:', response)

      // Backend có thể trả về reservation response hoặc payment URL
      if (response && response.url) {
        toast.success('Đang chuyển đến trang thanh toán...')
        window.location.href = response.url
      } else {
        toast.success('Gia hạn đặt chỗ thành công')
        onOpenChange(false)
        onSuccess()
      }
    } catch (error) {
      console.error('Extend error:', error)
      toast.error(error.message || 'Không thể gia hạn đặt chỗ')
    } finally {
      setSubmitting(false)
    }
  }

  const isDateDisabled = (date) => {
    const currentEndTime = new Date(reservation?.endTime)
    const currentEndDate = new Date(
      currentEndTime.getFullYear(),
      currentEndTime.getMonth(),
      currentEndTime.getDate()
    )
    const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

    // Chỉ disable các ngày TRƯỚC ngày kết thúc hiện tại
    if (checkDate < currentEndDate) return true

    // Kiểm tra xung đột với lịch bận (chỉ disable nếu cả ngày bận)
    const dateStr = format(date, 'yyyy-MM-dd')
    return schedule.some((booking) => {
      const bookingStart = new Date(booking.startTime)
      const bookingEnd = new Date(booking.endTime)
      const bookingStartDate = format(bookingStart, 'yyyy-MM-dd')
      const bookingEndDate = format(bookingEnd, 'yyyy-MM-dd')

      // Chỉ disable nếu booking bắt đầu từ 00:00 của ngày đó
      if (
        dateStr === bookingStartDate &&
        bookingStart.getHours() === 0 &&
        bookingStart.getMinutes() === 0
      ) {
        return true
      }

      // Disable các ngày nằm giữa khoảng booking
      if (dateStr > bookingStartDate && dateStr < bookingEndDate) {
        return true
      }

      return false
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] max-w-2xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Gia hạn đặt chỗ</DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Current Info */}
          <div className='bg-muted rounded-lg p-4'>
            <h3 className='mb-2 font-semibold'>Thông tin hiện tại</h3>
            <div className='space-y-1 text-sm'>
              <p>
                Mã đặt chỗ: <span className='font-medium'>#{reservation?.code}</span>
              </p>
              <p>
                Xe: <span className='font-medium'>{reservation?.vehicle.name}</span>
              </p>
              <p>
                Bắt đầu:{' '}
                <span className='font-medium'>
                  {reservation?.startTime &&
                    format(new Date(reservation.startTime), 'dd/MM/yyyy HH:mm', { locale: vi })}
                </span>
              </p>
              <p>
                Kết thúc:{' '}
                <span className='font-medium'>
                  {reservation?.endTime &&
                    format(new Date(reservation.endTime), 'dd/MM/yyyy HH:mm', { locale: vi })}
                </span>
              </p>
            </div>
          </div>

          {/* Vehicle Schedule */}
          {loading ? (
            <div className='flex justify-center py-8'>
              <Spinner />
            </div>
          ) : schedule.length > 0 ? (
            <div className='space-y-2'>
              <h3 className='font-semibold'>Lịch bận của xe</h3>
              <div className='max-h-40 space-y-2 overflow-y-auto rounded-lg border p-3'>
                {schedule.map((booking, index) => (
                  <div key={index} className='bg-muted rounded-md p-3 text-sm'>
                    <div className='flex items-center justify-between'>
                      <span className='font-medium'>Từ:</span>
                      <span>
                        {format(new Date(booking.startTime), 'dd/MM/yyyy HH:mm', { locale: vi })}
                      </span>
                    </div>
                    <div className='mt-1 flex items-center justify-between'>
                      <span className='font-medium'>Đến:</span>
                      <span>
                        {format(new Date(booking.endTime), 'dd/MM/yyyy HH:mm', { locale: vi })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className='rounded-lg bg-green-50 p-4 text-sm text-green-700'>
              Xe hiện không có lịch bận trong tương lai
            </div>
          )}

          {/* New End Date Selection */}
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='new-end-date'>Ngày kết thúc mới</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id='new-end-date'
                    variant='outline'
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !newEndDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {newEndDate ? format(newEndDate, 'dd/MM/yyyy', { locale: vi }) : 'Chọn ngày'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={newEndDate}
                    onSelect={setNewEndDate}
                    disabled={isDateDisabled}
                    initialFocus
                    locale={vi}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='new-end-time'>Giờ kết thúc mới</Label>
              <Select value={newEndTime} onValueChange={setNewEndTime}>
                <SelectTrigger id='new-end-time' className='w-full'>
                  <div className='flex items-center gap-2'>
                    <Clock className='text-muted-foreground h-4 w-4' />
                    <SelectValue placeholder='Chọn giờ' />
                  </div>
                </SelectTrigger>
                <SelectContent className='max-h-[200px]'>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time} disabled={isTimeDisabled(time)}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Warning Notice */}
          <div className='rounded-lg bg-yellow-50 p-4 text-sm text-yellow-700'>
            Lưu ý: Thời gian gia hạn phải sau{' '}
            {reservation?.endTime &&
              format(addHours(new Date(reservation.endTime), 1), 'HH:mm dd/MM/yyyy', {
                locale: vi
              })}
          </div>

          {/* Payment Notice */}
          <div className='rounded-lg bg-blue-50 p-4 text-sm text-blue-700'>
            Sau khi xác nhận, bạn sẽ được chuyển đến trang thanh toán để hoàn tất gia hạn.
          </div>
        </div>

        <DialogFooter className='gap-2'>
          <Button variant='outline' onClick={() => onOpenChange(false)} disabled={submitting}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={submitting || !newEndDate || !newEndTime}>
            {submitting ? (
              <>
                <Spinner className='mr-2' />
                Đang xử lý...
              </>
            ) : (
              'Xác nhận và thanh toán'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ExtendDialog
