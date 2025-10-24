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

const columnHelper = createColumnHelper()

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchKey, setSearchKey] = useState('')
  const [debouncedFilter] = useDebounce(searchKey, 500)
  const [statusFilter, setStatusFilter] = useState([])
  const navigate = useNavigate()

  const statusOptions = ['FAILED', 'COMPLETED', 'PENDING']

  const columns = [
    columnHelper.accessor('code', {
      header: 'Code',
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
    columnHelper.accessor('createdAt', {
      header: 'Created Date',
      cell: (info) => new Date(info.getValue()).toLocaleDateString()
    }),
    columnHelper.accessor('endTime', {
      header: 'End Time',
      cell: (info) => new Date(info.getValue()).toLocaleDateString()
    })
  ]

  const table = useReactTable({
    data: reservations,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const handleRowClick = (code) => {
    navigate(`/dashboard/reservations/${code}`)
  }

  useEffect(() => {
    const searchReservations = async (searchKey) => {
      try {
        setIsLoading(true)
        const data =
          !searchKey.trim() && !statusFilter.length === 0
            ? await reservationService.getAllReservations()
            : await reservationService.searchReservations({
                keyword: searchKey,
                status: statusFilter
              })
        setReservations(data)
      } catch (error) {
        toast.error(error.message)
        setReservations([])
      } finally {
        setIsLoading(false)
      }
    }
    searchReservations(debouncedFilter)
  }, [debouncedFilter, statusFilter])

  return (
    <div className='space-y-4'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Reservations</h2>
        <p className='text-muted-foreground'>Manage your reservation operations</p>
      </div>

      <DataTableToolbar
        table={table}
        searchPlaceholder='Search by reservation code...'
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

export default ReservationsPage
