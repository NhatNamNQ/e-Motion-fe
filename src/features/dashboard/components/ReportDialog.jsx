import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { userService } from '../services/userService'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'

const reportSchema = z.object({
  title: z.string().min(1, 'Tiêu đề không được để trống'),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  type: z.enum(['REPORT_USER', 'VEHICLE_TRANSFER', 'STAFF_TRANSFER'], {
    required_error: 'Loại báo cáo không hợp lệ'
  })
})

const REPORT_TYPE_LABELS = {
  REPORT_USER: 'Báo cáo người dùng',
  VEHICLE_TRANSFER: 'Chuyển giao xe',
  STAFF_TRANSFER: 'Chuyển giao nhân viên'
}

const ReportDialog = ({ open, onOpenChange, userEmail = null, type = null, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false)

  const isUserReport = !!userEmail

  const form = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: '',
      description: '',
      type: type || (isUserReport ? 'REPORT_USER' : 'VEHICLE_TRANSFER')
    }
  })

  useEffect(() => {
    if (open) {
      if (type) {
        form.setValue('type', type)
      } else if (isUserReport) {
        form.setValue('type', 'REPORT_USER')
      }
    }
  }, [open, type, isUserReport, form])

  const onSubmit = async (values) => {
    setIsLoading(true)
    try {
      const reportData = {
        ...values,
        ...(userEmail && { userEmail })
      }
      await userService.makeReport(reportData)

      const successMessage = isUserReport
        ? 'Tạo khiếu nại thành công'
        : 'Tạo đơn điều phối thành công'

      toast.success(successMessage)
      onOpenChange(false)
      form.reset()
      if (onSuccess) onSuccess()
    } catch (error) {
      const errorMessage = isUserReport
        ? 'Tạo khiếu nại thất bại: '
        : 'Tạo đơn điều phối thất bại: '
      toast.error(errorMessage + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    form.reset()
    onOpenChange(false)
  }

  const dialogTitle = isUserReport ? 'Tạo khiếu nại' : 'Tạo đơn điều phối'
  const dialogDescription = isUserReport
    ? `Tạo khiếu nại cho người dùng: ${userEmail}`
    : 'Tạo yêu cầu chuyển giao xe hoặc nhân viên giữa các trạm'

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại {isUserReport ? 'khiếu nại' : 'điều phối'}</FormLabel>
                  {isUserReport ? (
                    <FormControl>
                      <Input
                        value={REPORT_TYPE_LABELS[field.value] || field.value}
                        disabled
                        className='bg-gray-50'
                      />
                    </FormControl>
                  ) : (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn loại điều phối' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='VEHICLE_TRANSFER'>
                          {REPORT_TYPE_LABELS.VEHICLE_TRANSFER}
                        </SelectItem>
                        <SelectItem value='STAFF_TRANSFER'>
                          {REPORT_TYPE_LABELS.STAFF_TRANSFER}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Nhập tiêu đề ${isUserReport ? 'khiếu nại' : 'đơn điều phối'}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả chi tiết</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Nhập mô tả chi tiết về ${isUserReport ? 'khiếu nại' : 'yêu cầu điều phối'}`}
                      className='min-h-[120px] resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type='button' variant='outline' onClick={handleClose} disabled={isLoading}>
                Hủy
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? <Spinner className='h-4 w-4' /> : 'Tạo'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ReportDialog
