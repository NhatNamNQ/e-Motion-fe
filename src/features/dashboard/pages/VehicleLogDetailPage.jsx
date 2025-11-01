import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Loader from '@/components/Loader'
import { rentalService } from '../services/rentalService'
import { formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'

const InfoRow = ({ label, children }) => (
  <div className='space-y-1'>
    <p className='text-muted-foreground text-sm font-medium'>{label}</p>
    <p className='text-sm font-semibold'>{children || 'N/A'}</p>
  </div>
)

const VehicleLogDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [log, setLog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLogDetail = async () => {
      if (!id) return
      try {
        setLoading(true)
        setError(null)
        const data = await rentalService.getVehicleLogDetail(id)
        setLog(data)
      } catch (err) {
        toast.error('Failed to fetch vehicle log details')
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchLogDetail()
  }, [id])

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A'
    return new Date(dateTimeString).toLocaleString()
  }

  if (loading) return <Loader />
  if (error) return <div>Error</div>
  if (!log) {
    return (
      <div className='flex h-64 flex-col items-center justify-center space-y-4'>
        <p>Không tìm thấy nhật ký xe</p>
        <Button onClick={() => navigate('/dashboard/vehicle-logs')}>Quay lại danh sách</Button>
      </div>
    )
  }

  return (
    <div className='container mx-auto p-4 md:p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' onClick={() => navigate('/dashboard/vehicle-logs')}>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Quay lại danh sách
          </Button>
        </div>
        <div>
          <Button
            variant='outline'
            size='sm'
            onClick={() =>
              navigate(`/dashboard/rentals/${log.rentalId}/vehicle-log/edit/${log.id}`)
            }
          >
            Chỉnh sửa nhật ký xe
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className='flex flex-col gap-2 md:flex-row md:items-start md:justify-between'>
            <div>
              <CardTitle className='text-2xl'>Chi tiết nhật ký xe #{log.id}</CardTitle>
              <CardDescription>Tạo lúc: {formatDateTime(log.createdAt)}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className='my-4' />
          <div className='grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2'>
            <InfoRow label='Mã xe'>{log.vehicleId}</InfoRow>
            <InfoRow label='Mã nhân viên'>{log.staffId}</InfoRow>
            <InfoRow label='Mã hợp đồng thuê'>{log.rentalId}</InfoRow>
            <InfoRow label='Tổng chi phí'>{formatCurrency(log.cost)}</InfoRow>
          </div>
          <Separator className='my-4' />
          <div>
            <p className='mb-2 font-semibold'>Chi tiết chi phí sửa chữa:</p>
            {log.repairCost && log.repairCost.length > 0 ? (
              <ul className='space-y-2'>
                {log.repairCost.map((item, idx) => (
                  <li key={idx} className='flex justify-between'>
                    <span>{item.description}</span>
                    <span>{formatCurrency(item.cost)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-muted-foreground'>Không có chi phí sửa chữa</p>
            )}
          </div>
          <Separator className='my-4' />
          <div>
            <p className='mb-2 font-semibold'>Hình ảnh liên quan:</p>
            <div className='flex flex-wrap gap-3'>
              {log.imgs && log.imgs.length > 0 ? (
                log.imgs.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`vehicle-log-img-${idx}`}
                    className='h-32 w-32 rounded border object-cover'
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                ))
              ) : (
                <p className='text-muted-foreground'>Không có hình ảnh</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VehicleLogDetailPage
