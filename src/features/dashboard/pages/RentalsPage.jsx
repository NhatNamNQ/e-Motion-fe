import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import { getStatusColor } from '@/lib/utils'
import { rentalService } from '../services/rentalService'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import DataTableToolbar from '../components/DataTableToolbar'
import { useNavigate } from 'react-router-dom'

const columnHelper = createColumnHelper()

const RentalsPage = () => {
  const [rentals, setRentals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [globalFilter, setGlobalFilter] = useState('')
  const navigate = useNavigate()

  const statusOptions = ['ONGOING', 'COMPLETED', 'PENDING']

  useEffect(() => {
    const fetchAllRentals = async () => {
      try {
        setIsLoading(true)
        const res = await rentalService.getRentals()
        setRentals(res)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAllRentals()
  }, [])

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('email', {
      header: 'Customer Email',
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => {
        return <Badge className={getStatusColor(info.getValue())}>{info.getValue()}</Badge>
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
    state: {
      globalFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    manualFiltering: true //Disable client-side filtering
  })

  const handleGlobalFilterChange = (value) => {
    setGlobalFilter(value)
  }

  const handleClearSearch = () => {
    setGlobalFilter('')
  }

  const handleRowClick = (id) => {
    navigate(`/dashboard/rentals/${id}`)
  }

  return (
    <div className='space-y-4'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Rentals</h2>
        <p className='text-muted-foreground'>Manage your rental operations</p>
      </div>

      <DataTableToolbar
        table={table}
        searchPlaceholder='Search by rental ID...'
        globalFilter={globalFilter}
        setGlobalFilter={handleGlobalFilterChange}
        onClearSearch={handleClearSearch}
        statusOptions={statusOptions}
      />
      <DataTable
        table={table}
        columns={columns}
        globalFilter={globalFilter}
        isLoading={isLoading}
        onRowClick={handleRowClick}
      />
    </div>
  )
}

export default RentalsPage
