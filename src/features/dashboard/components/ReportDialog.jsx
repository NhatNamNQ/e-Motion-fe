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

const ReportDialog = ({ open, onOpenChange, userEmail, type }) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: '',
      description: '',
      type: type || 'REPORT_USER'
    }
  })

  useEffect(() => {
    if (open && type) {
      form.setValue('type', type)
    }
  }, [open, type, form])

  const onSubmit = async (values) => {
    setIsLoading(true)
    try {
      const reportData = {
        ...values,
        userEmail: userEmail
      }
      await userService.makeReport(reportData)
      toast.success('Tạo khiếu nại thành công')
      onOpenChange(false)
      form.reset()
    } catch (error) {
      toast.error('Tạo khiếu nại thất bại: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Tạo khiếu nại</DialogTitle>
          <DialogDescription>
            Tạo khiếu nại cho người dùng: <span className='font-semibold'>{userEmail}</span>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại khiếu nại</FormLabel>
                  <FormControl>
                    <Input
                      value={REPORT_TYPE_LABELS[field.value] || field.value}
                      disabled
                      className='bg-gray-50'
                    />
                  </FormControl>
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
                    <Input placeholder='Nhập tiêu đề khiếu nại' {...field} />
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
                      placeholder='Nhập mô tả chi tiết về khiếu nại'
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
                {isLoading ? <Spinner className='h-4 w-4' /> : 'Tạo khiếu nại'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ReportDialog
