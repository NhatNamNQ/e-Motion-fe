import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { checkListService } from '../services/checkListService'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Loader from '@/components/Loader'
import { ArrowLeft, Battery } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'

const InfoRow = ({ label, children }) => (
  <div className='space-y-1'>
    <p className='text-muted-foreground text-sm font-medium'>{label}</p>
    <p className='text-sm font-semibold'>{children || 'N/A'}</p>
  </div>
)

const CheckListCard = ({ checklist, typeLabel, badgeColor }) => {
  const getBatteryStatus = (battery) => {
    if (battery >= 80) return { label: 'Tốt', variant: 'default', color: 'text-green-600' }
    if (battery >= 50)
      return { label: 'Trung bình', variant: 'secondary', color: 'text-yellow-600' }
    return { label: 'Thấp', variant: 'destructive', color: 'text-red-600' }
  }
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A'
    return format(new Date(dateTimeString), 'dd/MM/yyyy HH:mm')
  }
  return (
    <Card className='mb-8'>
      <CardHeader>
        <div className='flex flex-col gap-2 md:flex-row md:items-start md:justify-between'>
          <div>
            <CardTitle className='text-2xl'>{typeLabel}</CardTitle>
            <CardDescription>
              {checklist && `Tạo lúc: ${formatDateTime(checklist.createdAt)}`}
            </CardDescription>
          </div>
          <Badge className={badgeColor}>{typeLabel.toUpperCase()}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Separator className='my-4' />
        <div className='grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2'>
          <InfoRow label='ID Biên bản'>#{checklist.id}</InfoRow>
          <InfoRow label='Mã hợp đồng thuê'>#{checklist.rentalId}</InfoRow>
          <InfoRow label='Nhân viên xử lý'>{checklist.staffEmail}</InfoRow>
          <InfoRow label='Thời gian tạo'>{formatDateTime(checklist.createdAt)}</InfoRow>
          <InfoRow label='Phí phát sinh'>
            <span className={checklist.fee > 0 ? 'text-red-600' : ''}>
              {checklist.fee > 0 ? formatCurrency(checklist.fee) : '0 VND'}
            </span>
          </InfoRow>
          <InfoRow label='Mức pin xe'>
            <div className='flex items-center gap-2'>
              <span
                className={`text-lg font-bold ${getBatteryStatus(checklist.currentBattery).color}`}
              >
                {checklist.currentBattery?.toFixed(0)}%
              </span>
              <Badge variant={getBatteryStatus(checklist.currentBattery).variant}>
                {getBatteryStatus(checklist.currentBattery).label}
              </Badge>
            </div>
          </InfoRow>
        </div>
        <Separator className='my-4' />
        <div className='mb-6'>
          <div className='mb-4 flex items-center gap-2'>
            <Battery className='text-muted-foreground h-5 w-5' />
            <p className='font-semibold'>Trạng thái pin:</p>
          </div>
          <div className='flex items-center gap-4'>
            <div className='relative h-8 flex-1 overflow-hidden rounded-full bg-gray-200'>
              <div
                className={`h-full transition-all ${
                  checklist.currentBattery >= 80
                    ? 'bg-green-500'
                    : checklist.currentBattery >= 50
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${checklist.currentBattery}%` }}
              />
            </div>
            <span className='text-2xl font-bold'>{checklist.currentBattery?.toFixed(0)}%</span>
          </div>
        </div>
        <Separator className='my-4' />
        <div>
          <p className='mb-2 font-semibold'>Hình ảnh xe:</p>
          {checklist.img ? (
            <div className='flex flex-wrap gap-3'>
              <img
                src={checklist.img}
                alt={`Vehicle ${typeLabel}`}
                className='h-auto max-w-md rounded border object-cover'
                onError={(e) => (e.target.style.display = 'none')}
              />
            </div>
          ) : (
            <p className='text-muted-foreground'>Không có hình ảnh</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const CheckListDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [checkLists, setCheckLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getCheckListDetail = async () => {
      try {
        setLoading(true)
        const data = await checkListService.getCheckListDetail(id)
        setCheckLists(Array.isArray(data) ? data : [data])
      } catch (error) {
        console.error(error)
        setError('Failed to load checklist details')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      getCheckListDetail()
    }
  }, [id])

  if (loading) return <Loader />

  if (error) return <div>Error</div>

  if (!checkLists || checkLists.length === 0) {
    return (
      <div className='flex h-64 flex-col items-center justify-center space-y-4'>
        <p>Không tìm thấy checklist</p>
        <Button onClick={() => navigate('/dashboard/check-list')}>Quay lại danh sách</Button>
      </div>
    )
  }

  const checkInList = checkLists.find((item) => item.type === 'CHECK_IN')
  const checkOutList = checkLists.find((item) => item.type === 'CHECK_OUT')
  const rentalId = checkLists[0]?.rentalId

  const batteryDifference =
    checkInList && checkOutList
      ? (checkOutList.currentBattery - checkInList.currentBattery).toFixed(1)
      : null

  return (
    <div className='container mx-auto p-4 md:p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' onClick={() => navigate('/dashboard/check-list')}>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Quay lại danh sách
          </Button>
        </div>
        <div>
          <Button
            variant='outline'
            size='sm'
            onClick={() => navigate(`/dashboard/rentals/${rentalId}`)}
          >
            Xem hợp đồng thuê
          </Button>
        </div>
      </div>

      {/* Card Check In */}
      {checkInList && (
        <CheckListCard
          checklist={checkInList}
          typeLabel='Check In'
          badgeColor='bg-green-100 text-green-800 hover:bg-green-100'
        />
      )}

      {/* Card Check Out */}
      {checkOutList && (
        <CheckListCard
          checklist={checkOutList}
          typeLabel='Check Out'
          badgeColor='bg-blue-100 text-blue-800 hover:bg-blue-100'
        />
      )}

      {/* Battery Difference */}
      {batteryDifference !== null && (
        <Card>
          <CardContent>
            <div className='bg-muted/40 mt-4 rounded-lg p-4'>
              <p className='mb-2 font-semibold'>Chênh lệch mức pin:</p>
              <div className='flex items-center gap-2'>
                <span className='text-muted-foreground'>Pin khi nhận:</span>
                <span className='font-bold'>{checkInList.currentBattery?.toFixed(0)}%</span>
                <span className='text-muted-foreground'>→</span>
                <span className='text-muted-foreground'>Pin khi trả:</span>
                <span className='font-bold'>{checkOutList.currentBattery?.toFixed(0)}%</span>
                <span className='text-muted-foreground'>=</span>
                <span
                  className={`text-lg font-bold ${
                    Number(batteryDifference) < 0 ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {batteryDifference > 0 ? '+' : ''}
                  {batteryDifference}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default CheckListDetailPage
