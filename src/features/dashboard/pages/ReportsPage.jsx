import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Loader from '@/components/Loader'
import { formatHourDate, getStatusColor } from '@/lib/utils'
import ReportDialog from '../components/ReportDialog'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/selectors/authSelectors'
import { Search, X } from 'lucide-react'
import { useDebounce } from 'use-debounce'
import { Spinner } from '@/components/ui/spinner'

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
  const navigate = useNavigate()
  const currentUser = useSelector(selectUser)
  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [processingId, setProcessingId] = useState(null)
  const [showReportDialog, setShowReportDialog] = useState(false)

  // Filter states
  const [searchTitle, setSearchTitle] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  // Debounce search input
  const [debouncedSearchTitle] = useDebounce(searchTitle, 500)

  const isAdmin = currentUser?.role === 'ROLE_ADMIN'

  const fetchReports = useCallback(async () => {
    try {
      setIsLoading(true)
      const filters = {
        title: debouncedSearchTitle,
        type: filterType === 'all' ? null : filterType,
        status: filterStatus === 'all' ? null : filterStatus
      }
      const data = await adminService.getReports(filters)
      setReports(data)
    } catch (error) {
      toast.error('Không thể tải danh sách báo cáo: ' + error.message)
    } finally {
      setIsLoading(false)
      setIsInitialLoad(false)
    }
  }, [debouncedSearchTitle, filterStatus, filterType])

  useEffect(() => {
    fetchReports()
  }, [debouncedSearchTitle, filterType, filterStatus, fetchReports])

  const handleClearFilters = () => {
    setSearchTitle('')
    setFilterType('all')
    setFilterStatus('all')
  }

  const handleApprove = async (e, reportId, reportType) => {
    e.stopPropagation()
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

  const handleReject = async (e, reportId, reportType) => {
    e.stopPropagation()
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

  const handleRowClick = (reportId) => {
    navigate(`/dashboard/reports/${reportId}`)
  }

  // Chỉ show full page loader lần đầu load
  if (isInitialLoad && isLoading) {
    return <Loader />
  }

  return (
    <div>
      <div className='mb-4'>
        <div className='flex items-start justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Đơn báo cáo</h1>
          </div>
          <div>
            <Button onClick={() => setShowReportDialog(true)}>Tạo đơn điều phối</Button>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className='mb-4 flex gap-4'>
        <div className='relative'>
          <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
          <Input
            placeholder='Tìm kiếm theo tiêu đề...'
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className='pl-10'
          />
        </div>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger>
            <SelectValue placeholder='Loại báo cáo' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả loại</SelectItem>
            <SelectItem value='REPORT_USER'>{REPORT_TYPE_LABELS.REPORT_USER}</SelectItem>
            <SelectItem value='VEHICLE_TRANSFER'>{REPORT_TYPE_LABELS.VEHICLE_TRANSFER}</SelectItem>
            <SelectItem value='STAFF_TRANSFER'>{REPORT_TYPE_LABELS.STAFF_TRANSFER}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger>
            <SelectValue placeholder='Trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả trạng thái</SelectItem>
            <SelectItem value='PENDING'>{STATUS_LABELS.PENDING}</SelectItem>
            <SelectItem value='APPROVED'>{STATUS_LABELS.APPROVED}</SelectItem>
            <SelectItem value='REJECTED'>{STATUS_LABELS.REJECTED}</SelectItem>
          </SelectContent>
        </Select>

        {(searchTitle || filterType !== 'all' || filterStatus !== 'all') && (
          <Button onClick={handleClearFilters} variant='outline'>
            <X className='mr-2' />
            Xóa bộ lọc
          </Button>
        )}
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Loại báo cáo</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tạo</TableHead>
                {isAdmin && <TableHead className='text-right'>Hành động</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={isAdmin ? 5 : 4} className='py-8 text-center'>
                    <Spinner className='mx-auto h-8 w-8' />
                  </TableCell>
                </TableRow>
              ) : reports.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={isAdmin ? 5 : 4}
                    className='text-muted-foreground text-center'
                  >
                    Không có báo cáo nào
                  </TableCell>
                </TableRow>
              ) : (
                reports.map((report) => (
                  <TableRow
                    key={report.id}
                    className='cursor-pointer hover:bg-gray-50'
                    onClick={() => handleRowClick(report.id)}
                  >
                    <TableCell className='font-medium'>{report.title}</TableCell>
                    <TableCell>{REPORT_TYPE_LABELS[report.type] || report.type}</TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell>{formatHourDate(report.createdAt)}</TableCell>
                    {isAdmin && (
                      <TableCell className='text-right'>
                        {report.status === 'PENDING' ? (
                          <div className='flex justify-end gap-2'>
                            <Button
                              size='sm'
                              className='bg-green-600 hover:bg-green-700'
                              onClick={(e) => handleApprove(e, report.id, report.type)}
                              disabled={processingId === report.id}
                            >
                              Duyệt
                            </Button>
                            <Button
                              size='sm'
                              variant='destructive'
                              onClick={(e) => handleReject(e, report.id, report.type)}
                              disabled={processingId === report.id}
                            >
                              Từ chối
                            </Button>
                          </div>
                        ) : (
                          <span className='text-muted-foreground text-sm'>Đã xử lý</span>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ReportDialog
        open={showReportDialog}
        onOpenChange={setShowReportDialog}
        onSuccess={fetchReports}
      />
    </div>
  )
}

export default ReportsPage
