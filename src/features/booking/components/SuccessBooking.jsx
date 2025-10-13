import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SuccessBooking = ({ txnRef, car }) => {
  const navigate = useNavigate()
  return (
    <Card className='shadow-lg'>
      <CardContent className='p-8 text-center'>
        <CheckCircle className='mx-auto mb-4 h-16 w-16 text-green-500' />
        <h1 className='mb-4 text-3xl font-bold text-green-600'>Thanh toán thành công!</h1>
        <p className='mb-4 text-gray-600'>
          Cảm ơn bạn đã đặt xe. Đơn hàng của bạn đã được xác nhận.
        </p>

        {txnRef && (
          <div className='mb-6 rounded-lg bg-gray-50 p-4'>
            <p>
              <strong>Mã giao dịch:</strong> {txnRef}
            </p>
            <p>
              <strong>Xe:</strong> {car?.name}
            </p>
          </div>
        )}

        <div className='flex justify-center gap-4'>
          <Button
            className='bg-secondary hover:bg-secondary/80 cursor-pointer'
            onClick={() => navigate('/my-bookings')}
          >
            Xem đơn hàng
          </Button>
          <Button className='cursor-pointer' variant='outline' onClick={() => navigate('/')}>
            Về trang chủ
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default SuccessBooking
