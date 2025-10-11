import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const AdditionalCosts = () => {
  return (
    <Card>
      <CardHeader className='bg-secondary/20'>
        <CardTitle className='text-base font-bold text-blue-500'>Các chi phí khác</CardTitle>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='space-y-4'>
          <div>
            <div className='mb-1 flex items-center justify-between'>
              <span className='text-sm font-bold text-gray-500'>Phụ phí điện và pin</span>
              <span className='text-sm font-bold text-gray-500'>2.000đ / km di chuyển</span>
            </div>
            <p className='text-xs text-gray-400'>Bonbon chỉ áp dụng phí này cho xe điện.</p>
          </div>
          <hr />
          <div>
            <div className='mb-1 flex items-center justify-between'>
              <span className='text-sm font-bold text-gray-500'>Phí vệ sinh</span>
              <span className='text-sm font-bold text-gray-500'>120,000₫ - 150,000₫</span>
            </div>
            <p className='text-xs text-gray-400'>
              Vui lòng trả lại hiện trạng xe được vệ sinh như lúc nhận để không mất phí này.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdditionalCosts
