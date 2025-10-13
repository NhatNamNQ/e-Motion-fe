import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

const FailedBooking = () => {
  const navigate = useNavigate()
  return (
    <Card className='shadow-lg'>
      <CardContent className='p-8 text-center'>
        <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
          <span className='text-2xl text-red-500'>✕</span>
        </div>
        <h1 className='mb-4 text-3xl font-bold text-red-600'>Thanh toán thất bại!</h1>
        <p className='mb-6 text-gray-600'>
          Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.
        </p>

        <div className='flex justify-center gap-4'>
          <Button
            className='bg-secondary hover:bg-secondary/80'
            onClick={() => navigate('/booking/confirm')}
          >
            Thử lại
          </Button>
          <Button variant='outline' onClick={() => navigate('/')}>
            Về trang chủ
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default FailedBooking
