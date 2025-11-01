import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import { rentalService } from '../services/rentalService'
import { toast } from 'sonner'
import DataTableToolbar from '../components/DataTableToolbar'
import { useDebounce } from 'use-debounce'
import { useNavigate } from 'react-router-dom'

const columnHelper = createColumnHelper()

const VehicleLogsPage = () => {
  const [logs, setLogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchKey, setSearchKey] = useState('')
  const navigate = useNavigate()
  const [debouncedFilter] = useDebounce(searchKey, 500)

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
    getCoreRowModel: getCoreRowModel()
  })

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true)
        const data = await rentalService.getVehicleLogs()
        setLogs(data)
      } catch (error) {
        toast.error(error.message)
        setLogs([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchLogs()
  }, [debouncedFilter])

  const handleRowClick = (row) => {
    navigate(`/dashboard/vehicle-logs/${row.id}`)
  }

  return (
    <div className='space-y-4'>
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
      <DataTable
        table={table}
        columns={columns}
        searchKey={searchKey}
        isLoading={isLoading}
        onRowClick={handleRowClick}
      />
    </div>
  )
}

export default VehicleLogsPage
