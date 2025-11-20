import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import { getStatusColor } from '@/lib/utils'
import { rentalService } from '../services/rentalService'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import DataTableToolbar from '../components/DataTableToolbar'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import Pagination from '@/components/Pagination'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Loader from '@/components/Loader'
import { userService } from '../services/userService'
import { useDispatch } from 'react-redux'
import { setRenter } from '@/store/slices/renterSlice'

const columnHelper = createColumnHelper()

const RentalsPage = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [rentals, setRentals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [emailLoading, setEmailLoading] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [debouncedFilter] = useDebounce(searchKey, 500)
  const [statusFilter, setStatusFilter] = useState([])
  const [email, setEmail] = useState('')
  const [showRenterForm, setShowRenterForm] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limitPerPage, setLimitPerPage] = useState(10)

  const statusOptions = [
    'ONGOING',
    'COMPLETED',
    'PENDING_FEE',
    'CONFIRM',
    'OVERDUE',
    'CONTRACTING',
    'CANCELLED'
  ]

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
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
    columnHelper.accessor('startTime', {
      header: 'Thời gian bắt đầu',
      cell: (info) => new Date(info.getValue()).toLocaleDateString('vi-VN')
    }),
    columnHelper.accessor('endTime', {
      header: 'Thời gian kết thúc',
      cell: (info) => new Date(info.getValue()).toLocaleDateString('vi-VN')
    })
  ]

  const table = useReactTable({
    data: rentals,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const handleRowClick = (row) => {
    navigate(`/dashboard/rentals/${row.id}`)
  }

  const handleSubmit = async () => {
    setEmailLoading(true)
    try {
      const renter = await userService.getRenterByEmail(email)
      dispatch(setRenter(renter))
      navigate('/dashboard/cars?model=rental')
      setEmailLoading(false)
    } catch (e) {
      setEmailLoading(false)
      toast.error('Lỗi: ' + e.message)
    }
  }

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setIsLoading(true)
        const response = await rentalService.getRentals({
          search: debouncedFilter,
          status: statusFilter,
          page: currentPage,
          limit: limitPerPage
        })

        setRentals(response.content || response.data || response)
        setTotalPages(response.totalPages || 1)
      } catch (error) {
        toast.error(error.message)
        setRentals([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchRentals()
  }, [debouncedFilter, statusFilter, currentPage, limitPerPage])

  return (
    <div className='flex h-full flex-col space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Hợp đồng thuê xe</h2>
          <p className='text-muted-foreground'>Quản lý các hợp đồng thuê xe</p>
        </div>
        <Button onClick={() => setShowRenterForm(true)}>+ Tạo đơn thuê</Button>
      </div>

      <DataTableToolbar
        table={table}
        searchPlaceholder='Tìm kiếm theo email khách hàng...'
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

        <div className='mt-auto pt-4'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            limitPerPage={limitPerPage}
            setLimitPerPage={setLimitPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <Dialog open={showRenterForm} onOpenChange={setShowRenterForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Người thuê xe</DialogTitle>
              <DialogDescription>Nhập email của người thuê xe</DialogDescription>
            </DialogHeader>
            {emailLoading ? (
              <Loader />
            ) : (
              <div className='px-6 py-4'>
                <div className='space-y-3'>
                  <div className='flex items-start gap-4'>
                    <Label className='mt-3 w-32' htmlFor='email'>
                      Email người thuê
                    </Label>
                    <div className='flex-1 flex-col'>
                      <Input
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='john.doe@gmail.com'
                      />
                    </div>
                  </div>
                </div>
                <div onClick={handleSubmit} className='mt-6 flex justify-end'>
                  <Button>Xác nhận</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default RentalsPage
