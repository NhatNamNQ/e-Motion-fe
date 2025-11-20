import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { userService } from '../services/userService'
import { adminService } from '../services/adminService'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft } from 'lucide-react'
import Loader from '@/components/Loader'
import { formatHourDate, getStatusColor } from '@/lib/utils'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/selectors/authSelectors'

const REPORT_TYPE_LABELS = {
  REPORT_USER: 'Báo cáo người dùng',
  VEHICLE_TRANSFER: 'Chuyển giao xe',
  STAFF_TRANSFER: 'Chuyển giao nhân viên'
}

const STATUS_LABELS = {
  PENDING: 'Chờ duyệt',
  APPROVED: 'Đã duyệt',
  REJECTED: 'Đã từ chối'
}

const InfoRow = ({ label, children }) => (
  <div className='space-y-1'>
    <span className='text-muted-foreground text-sm'>{label}</span>
    <p className='font-medium'>{children || '-'}</p>
  </div>
)

const ReportDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const currentUser = useSelector(selectUser)
  const [report, setReport] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [processingAction, setProcessingAction] = useState(null)

  const isAdmin = currentUser?.role === 'ROLE_ADMIN'

  const fetchReportDetail = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await userService.getReportDetail(id)
      console.log(data)
      setReport(data)
    } catch (error) {
      toast.error('Không thể tải chi tiết báo cáo: ' + error.message)
      navigate('/dashboard/reports')
    } finally {
      setIsLoading(false)
    }
  }, [id, navigate])

  useEffect(() => {
    fetchReportDetail()
  }, [id, fetchReportDetail])

  const handleApprove = async () => {
    try {
      setProcessingAction('approve')
      await adminService.updateReportStatus({
        id: report.id,
        type: report.type,
        status: 'APPROVED'
      })
      toast.success('Đã duyệt báo cáo thành công')
      fetchReportDetail()
    } catch (error) {
      toast.error('Duyệt báo cáo thất bại: ' + error.message)
    } finally {
      setProcessingAction(null)
    }
  }

  const handleReject = async () => {
    try {
      setProcessingAction('reject')
      await adminService.updateReportStatus({
        id: report.id,
        type: report.type,
        status: 'REJECTED'
      })
      toast.success('Đã từ chối báo cáo')
      fetchReportDetail()
    } catch (error) {
      toast.error('Từ chối báo cáo thất bại: ' + error.message)
    } finally {
      setProcessingAction(null)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  if (!report) {
    return null
  }

  const isPending = report.status === 'PENDING'
  const isUserReport = report.type === 'REPORT_USER'

  return (
    <div className='w-full'>
      <div className='mb-6'>
        <Button variant='outline' size='sm' onClick={() => navigate('/dashboard/reports')}>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Quay lại danh sách
        </Button>
      </div>

      <div className='lg:col-span-2'>
        <Card className='h-full'>
          <CardHeader>
            <div className='flex flex-col gap-2 md:flex-row md:items-start md:justify-between'>
              <div>
                <CardTitle className='text-2xl'>Chi tiết báo cáo #{report.id}</CardTitle>
                <p className='text-muted-foreground text-sm'>
                  Tạo lúc: {formatHourDate(report.createdAt)}
                </p>
              </div>
              <Badge className={getStatusColor(report.status)}>
                {STATUS_LABELS[report.status] || report.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2'>
              <InfoRow label='Tiêu đề'>{report.title}</InfoRow>
              <InfoRow label='Loại báo cáo'>
                {REPORT_TYPE_LABELS[report.type] || report.type}
              </InfoRow>
              <InfoRow label='Trạng thái'>{STATUS_LABELS[report.status] || report.status}</InfoRow>
              <InfoRow label='Ngày tạo'>{formatHourDate(report.createdAt)}</InfoRow>
            </div>

            <Separator className='my-6' />

            <div className='space-y-1'>
              <span className='text-muted-foreground text-sm'>Mô tả chi tiết</span>
              <div className='bg-muted/40 rounded-lg'>
                <p className='text-sm leading-relaxed whitespace-pre-wrap'>{report.description}</p>
              </div>
            </div>

            {isUserReport && report.user && (
              <>
                <Separator className='my-6' />
                <div>
                  <h3 className='mb-4 text-lg font-semibold'>Thông tin người dùng bị báo cáo</h3>
                  <div className='grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2'>
                    <InfoRow label='Họ tên'>{report.user.fullName}</InfoRow>
                    <InfoRow label='Email'>{report.user.email}</InfoRow>
                    <InfoRow label='Số điện thoại'>{report.user.phone}</InfoRow>
                    <InfoRow label='Vai trò'>{report.user.role}</InfoRow>
                    <InfoRow label='Ngày tạo tài khoản'>
                      {formatHourDate(report.user.createdAt)}
                    </InfoRow>
                  </div>
                </div>
              </>
            )}

            {report.staff && (
              <>
                <Separator className='my-6' />
                <div>
                  <h3 className='mb-4 text-lg font-semibold'>Thông tin nhân viên tạo báo cáo</h3>
                  <div className='grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2'>
                    <InfoRow label='Họ tên'>{report.staff.fullName}</InfoRow>
                    <InfoRow label='Email'>{report.staff.email}</InfoRow>
                    <InfoRow label='Trạm làm việc'>{report.staff.stationName}</InfoRow>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {isAdmin && (
        <div className='lg:col-span-1'>
          <Card>
            <CardHeader>
              <CardTitle>Hành động</CardTitle>
            </CardHeader>
            <CardContent>
              {isPending ? (
                <div className='space-y-3'>
                  <Button
                    className='w-full bg-green-600 hover:bg-green-700'
                    onClick={handleApprove}
                    disabled={processingAction === 'approve'}
                  >
                    {processingAction === 'approve' ? 'Đang xử lý...' : 'Duyệt báo cáo'}
                  </Button>
                  <Button
                    className='w-full'
                    variant='destructive'
                    onClick={handleReject}
                    disabled={processingAction === 'reject'}
                  >
                    {processingAction === 'reject' ? 'Đang xử lý...' : 'Từ chối báo cáo'}
                  </Button>
                </div>
              ) : (
                <div className='text-center'>
                  <Badge className={getStatusColor(report.status)}>
                    {STATUS_LABELS[report.status] || report.status}
                  </Badge>
                  <p className='text-muted-foreground mt-4 text-sm'>Báo cáo đã được xử lý</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default ReportDetailPage
