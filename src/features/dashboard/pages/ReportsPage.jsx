import { useState, useEffect } from 'react'
import { adminService } from '../services/adminService'
import { toast } from 'sonner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Loader from '@/components/Loader'
import { formatHourDate, getStatusColor } from '@/lib/utils'

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

const ReportsPage = () => {
  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [processingId, setProcessingId] = useState(null)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      setIsLoading(true)
      const data = await adminService.getReports()
      setReports(data)
    } catch (error) {
      toast.error('Không thể tải danh sách báo cáo: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (reportId, reportType) => {
    try {
      setProcessingId(reportId)
      await adminService.updateReportStatus({
        id: reportId,
        type: reportType,
        status: 'APPROVED'
      })
      toast.success('Đã duyệt báo cáo thành công')
      fetchReports()
    } catch (error) {
      toast.error('Duyệt báo cáo thất bại: ' + error.message)
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (reportId, reportType) => {
    try {
      setProcessingId(reportId)
      await adminService.updateReportStatus({
        id: reportId,
        type: reportType,
        status: 'REJECTED'
      })
      toast.success('Đã từ chối báo cáo')
      fetchReports()
    } catch (error) {
      toast.error('Từ chối báo cáo thất bại: ' + error.message)
    } finally {
      setProcessingId(null)
    }
  }

  const getStatusBadge = (status) => {
    return <Badge className={getStatusColor(status)}>{STATUS_LABELS[status] || status}</Badge>
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách báo cáo</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Loại báo cáo</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className='text-right'>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className='text-muted-foreground text-center'>
                  Không có báo cáo nào
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className='font-medium'>{report.title}</TableCell>
                  <TableCell>{REPORT_TYPE_LABELS[report.type] || report.type}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>{formatHourDate(report.createdAt)}</TableCell>
                  <TableCell className='text-right'>
                    {report.status === 'PENDING' ? (
                      <div className='flex justify-end gap-2'>
                        <Button
                          size='sm'
                          className='bg-green-600 hover:bg-green-700'
                          onClick={() => handleApprove(report.id, report.type)}
                          disabled={processingId === report.id}
                        >
                          Duyệt
                        </Button>
                        <Button
                          size='sm'
                          variant='destructive'
                          onClick={() => handleReject(report.id, report.type)}
                          disabled={processingId === report.id}
                        >
                          Từ chối
                        </Button>
                      </div>
                    ) : (
                      <span className='text-muted-foreground text-sm'>Đã xử lý</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ReportsPage
