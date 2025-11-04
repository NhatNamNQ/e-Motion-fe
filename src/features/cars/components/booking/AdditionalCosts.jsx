import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'

const AdditionalCosts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-secondary text-base font-bold'>Các chi phí khác</CardTitle>
      </CardHeader>
      <CardContent className='px-6'>
        <div className='space-y-4'>
          <div>
            <div className='mb-1 flex items-center justify-between'>
              <span className='text-sm font-bold text-gray-500'>Phụ phí điện và pin</span>
              <span className='text-sm font-bold text-gray-500'>{formatCurrency(12000)} / 1%</span>
            </div>
            <div className='mb-1 flex items-center justify-between'>
              <span className='text-sm font-bold text-gray-500'>Phụ phí trễ</span>
              <span className='text-sm font-bold text-gray-500'>6% giá thuê ngày / 1 giờ</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdditionalCosts
