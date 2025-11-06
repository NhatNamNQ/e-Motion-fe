import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import { getStatusColor } from '@/lib/utils'
import { rentalService } from '../services/rentalService'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import DataTableToolbar from '../components/DataTableToolbar'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import Pagination from '@/components/Pagination'

const columnHelper = createColumnHelper()

const RentalsPage = () => {
  const [rentals, setRentals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchKey, setSearchKey] = useState('')
  const [debouncedFilter] = useDebounce(searchKey, 500)
  const [statusFilter, setStatusFilter] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limitPerPage, setLimitPerPage] = useState(10)

  const navigate = useNavigate()

  const statusOptions = ['ONGOING', 'COMPLETED', 'PENDING_FEE', 'CONFIRM']

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('userEmail', {
      header: 'User Email',
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => {
        const status = info.getValue()
        return <Badge className={getStatusColor(status)}>{status}</Badge>
      }
    }),
    columnHelper.accessor('startTime', {
      header: 'Start Time',
      cell: (info) => new Date(info.getValue()).toLocaleDateString()
    }),
    columnHelper.accessor('endTime', {
      header: 'End Time',
      cell: (info) => new Date(info.getValue()).toLocaleDateString()
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
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Rentals</h2>
        <p className='text-muted-foreground'>Manage your rental operations</p>
      </div>

      <DataTableToolbar
        table={table}
        searchPlaceholder='Search by customer email...'
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
      </div>
    </div>
  )
}

export default RentalsPage
