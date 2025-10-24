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

const columnHelper = createColumnHelper()

const RentalsPage = () => {
  const [rentals, setRentals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchKey, setSearchKey] = useState('')
  const [debouncedFilter] = useDebounce(searchKey, 500)
  const [statusFilter, setStatusFilter] = useState([])
  const navigate = useNavigate()

  const statusOptions = ['ONGOING', 'COMPLETED', 'PENDING', 'CONFIRM']

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

  const handleRowClick = (id) => {
    navigate(`/dashboard/rentals/${id}`)
  }

  useEffect(() => {
    const searchRentals = async (searchKey) => {
      try {
        setIsLoading(true)
        const data =
          !searchKey.trim() && !statusFilter.length > 0
            ? await rentalService.getRentals()
            : await rentalService.searchRentals({
                email: searchKey,
                status: statusFilter
              })
        setRentals(data)
      } catch (error) {
        toast.error(error.message)
        setRentals([])
      } finally {
        setIsLoading(false)
      }
    }
    searchRentals(debouncedFilter)
  }, [debouncedFilter, statusFilter])

  return (
    <div className='space-y-4'>
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

export default RentalsPage
