import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import { rentalService } from '../services/rentalService'
import { toast } from 'sonner'
import DataTableToolbar from '../components/DataTableToolbar'
import { useDebounce } from 'use-debounce'
import { useNavigate } from 'react-router-dom'
import Pagination from '@/components/Pagination'

const columnHelper = createColumnHelper()

const VehicleLogsPage = () => {
  const [logs, setLogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchKey, setSearchKey] = useState('')
  const [debouncedFilter] = useDebounce(searchKey, 500)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limitPerPage, setLimitPerPage] = useState(10)

  const navigate = useNavigate()

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('vehicleId', {
      header: 'Vehicle ID',
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('rentalId', {
      header: 'RentalId',
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created At',
      cell: (info) => new Date(info.getValue()).toLocaleString()
    })
  ]

  const table = useReactTable({
    data: logs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages
  })

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true)
        const response = await rentalService.getVehicleLogs({
          page: currentPage,
          limit: limitPerPage,
          search: debouncedFilter
        })
        setLogs(response.content || response.data || response)
        setTotalPages(response.totalPages || 1)
      } catch (error) {
        toast.error(error.message)
        setLogs([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchLogs()
  }, [debouncedFilter, currentPage, limitPerPage])

  const handleRowClick = (row) => {
    navigate(`/dashboard/vehicle-logs/${row.id}`)
  }

  return (
    <div className='flex h-full flex-col space-y-4'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Vehicle Logs</h2>
        <p className='text-muted-foreground'>View and manage vehicle activity logs</p>
      </div>

      <DataTableToolbar
        table={table}
        searchPlaceholder='Search by vehicle ID, action, or description...'
        searchKey={searchKey}
        setSearchKey={setSearchKey}
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

export default VehicleLogsPage
