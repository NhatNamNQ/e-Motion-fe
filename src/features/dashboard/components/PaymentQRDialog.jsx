import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader } from 'lucide-react'
import { rentalService } from '../services/rentalService'
import { toast } from 'sonner'
import { formatCurrency } from '@/lib/utils'

const PaymentQRDialog = ({ open, onOpenChange, qrCode, rentalId, onPaymentSuccess }) => {
  const [checking, setChecking] = useState(false)
  const [paymentData, setPaymentData] = useState(null)

  const handleCheckPaymentStatus = async () => {
    try {
      setChecking(true)
      const payment = await rentalService.getPaymentByRentalId(rentalId)
      console.log('Payment response:', payment)
      setPaymentData(payment)

      // Kiểm tra status từ payment response
      const status = payment?.status
      console.log('Payment status:', status)

      if (status === 'SUCCESS') {
        toast.success('Thanh toán thành công!')
        // Đợi 1.5s để user đọc thông báo, sau đó đóng popup và reload
        setTimeout(() => {
          onPaymentSuccess()
          onOpenChange(false)
        }, 1500)
      } else if (status === 'PENDING') {
        toast.info('Thanh toán đang chờ xử lý, vui lòng kiểm tra lại sau...')
        // Không đóng popup, để user có thể check lại
      } else if (status === 'FAILED') {
        toast.error('Thanh toán thất bại!')
        // Không đóng popup, để user thấy thông báo
      } else {
        toast.warning('Không tìm thấy thông tin thanh toán')
        // Không đóng popup
      }
    } catch (error) {
      console.error('Error checking payment status:', error)
      toast.error(error.message || 'Không thể kiểm tra trạng thái thanh toán')
      // Không đóng popup khi có lỗi
    } finally {
      setChecking(false)
    }
  }

  const getStatusBadge = (status) => {
    if (!status) return null

    const statusConfig = {
      SUCCESS: { label: 'Thành công', className: 'bg-green-600' },
      PENDING: { label: 'Đang chờ thanh toán', className: 'bg-yellow-600' },
      FAILED: { label: 'Thất bại', className: 'bg-red-600' }
    }

    const config = statusConfig[status] || { label: status, className: 'bg-gray-600' }

    return <Badge className={config.className}>{config.label}</Badge>
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Thanh toán nhận xe</DialogTitle>
          <DialogDescription>Quét mã QR bên dưới để thanh toán</DialogDescription>
        </DialogHeader>

        <div className='flex flex-col items-center gap-4 py-4'>
          {qrCode ? (
            <div className='rounded-lg border-2 border-gray-200 bg-white p-4'>
              <img src={qrCode} alt='Payment QR Code' className='h-64 w-64 object-contain' />
            </div>
          ) : (
            <div className='flex h-64 w-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300'>
              <p className='text-muted-foreground text-sm'>Đang tải mã QR...</p>
            </div>
          )}

          {paymentData && (
            <div className='bg-muted/40 w-full space-y-3 rounded-lg border p-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>Trạng thái:</span>
                {getStatusBadge(paymentData.status)}
              </div>

              {paymentData.amount && (
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>Số tiền:</span>
                  <span className='text-sm font-semibold'>
                    {formatCurrency(paymentData.amount)}
                  </span>
                </div>
              )}

              {paymentData.method && (
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>Phương thức:</span>
                  <span className='text-sm'>{paymentData.method}</span>
                </div>
              )}

              {paymentData.bankCode && (
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>Ngân hàng:</span>
                  <span className='text-sm'>{paymentData.bankCode}</span>
                </div>
              )}

              {paymentData.transactionNo && (
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>Mã giao dịch:</span>
                  <span className='font-mono text-sm'>{paymentData.transactionNo}</span>
                </div>
              )}

              {paymentData.description && (
                <div className='flex flex-col gap-1'>
                  <span className='text-sm font-medium'>Mô tả:</span>
                  <span className='text-muted-foreground text-sm'>{paymentData.description}</span>
                </div>
              )}
            </div>
          )}

          {!paymentData && (
            <p className='text-muted-foreground text-center text-sm'>
              Sau khi thanh toán, vui lòng nhấn nút bên dưới để kiểm tra trạng thái
            </p>
          )}
        </div>

        <DialogFooter className='flex-col gap-2 sm:flex-col'>
          <Button
            onClick={handleCheckPaymentStatus}
            disabled={checking}
            className='w-full'
            variant='default'
          >
            {checking && <Loader className='mr-2 h-4 w-4 animate-spin' />}
            {checking ? 'Đang kiểm tra...' : 'Kiểm tra trạng thái thanh toán'}
          </Button>
          <Button onClick={() => onOpenChange(false)} variant='outline' className='w-full'>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentQRDialog
