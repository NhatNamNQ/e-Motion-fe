import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import DataTableToolbar from '../components/DataTableToolbar'
import { useDebounce } from 'use-debounce'
import DataTable from '../components/DataTable'
import { getStatusColor } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { reservationService } from '../services/reservationService'
import { toast } from 'sonner'
import Pagination from '@/components/Pagination'

const columnHelper = createColumnHelper()

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchKey, setSearchKey] = useState('')
  const [debouncedFilter] = useDebounce(searchKey, 500)
  const [statusFilter, setStatusFilter] = useState([])
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limitPerPage, setLimitPerPage] = useState(10)

  const statusOptions = ['FAILED', 'COMPLETED', 'PENDING', 'CANCELLED']

  const columns = [
    columnHelper.accessor('code', {
      header: 'Mã đặt chỗ',
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('userEmail', {
      header: 'Email người dùng',
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('status', {
      header: 'Trạng thái',
      cell: (info) => {
        const status = info.getValue()
        return <Badge className={getStatusColor(status)}>{status}</Badge>
      }
    }),
    columnHelper.accessor('createdAt', {
      header: 'Ngày tạo',
      cell: (info) => new Date(info.getValue()).toLocaleDateString('vi-VN')
    }),
    columnHelper.accessor('startTime', {
      header: 'Ngày bắt đầu',
      cell: (info) => new Date(info.getValue()).toLocaleDateString('vi-VN')
    }),
    columnHelper.accessor('endTime', {
      header: 'Ngày kết thúc',
      cell: (info) => new Date(info.getValue()).toLocaleDateString('vi-VN')
    })
  ]

  const table = useReactTable({
    data: reservations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages
  })

  const handleRowClick = (row) => {
    navigate(`/dashboard/reservations/${row.code}`)
  }

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setIsLoading(true)
        const response = await reservationService.getReservations({
          keyword: debouncedFilter,
          status: statusFilter,
          page: currentPage,
          limit: limitPerPage
        })

        setReservations(response.content || response.data || response)
        setTotalPages(response.totalPages || 1)
      } catch (error) {
        toast.error(error.message)
        setReservations([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchReservations()
  }, [debouncedFilter, statusFilter, currentPage, limitPerPage])

  return (
    <div className='flex h-full flex-col space-y-4'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Đặt chỗ</h2>
        <p className='text-muted-foreground'>Quản lý các thao tác đặt chỗ của bạn</p>
      </div>

      <DataTableToolbar
        table={table}
        searchPlaceholder='Tìm kiếm theo mã đặt chỗ...'
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        statusOptions={statusOptions}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className='flex flex-1 flex-col'>
        <div className='min-h-[430px] flex-1'>
          <DataTable
            table={table}
            columns={columns}
            searchKey={searchKey}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </div>

        <div className='pt-4'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            limitPerPage={limitPerPage}
            setLimitPerPage={setLimitPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default ReservationsPage
