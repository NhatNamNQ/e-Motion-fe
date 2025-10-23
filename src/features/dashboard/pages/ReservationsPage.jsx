import instance from '@/lib/axios'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useCallback, useEffect, useState } from 'react'

import DataTableToolbar from '../components/DataTableToolbar'
import { useDebounce } from 'use-debounce'
import DataTable from '../components/DataTable'
import { getStatusColor } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'

const columnHelper = createColumnHelper()

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [globalFilter, setGlobalFilter] = useState('')
  const [debouncedFilter] = useDebounce(globalFilter, 500)
  const navigate = useNavigate()

  const statusOptions = ['FAILED', 'CONFIRM', 'COMPLETED', 'PENDING']

  const columns = [
    columnHelper.accessor('code', {
      header: 'Code',
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('email', {
      header: 'Customer Email',
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
    state: {
      globalFilter
    },
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    manualFiltering: true //Disable client-side filtering
  })

  const fetchAllReservations = async () => {
    try {
      setIsLoading(true)
      const { data } = await instance.get('/reservations')
      const reservationsData = data.data.map((reservation) => ({
        code: reservation.code,
        email: reservation.userEmail,
        status: reservation.status,
        createdAt: reservation.createdAt,
        endTime: reservation.endTime
      }))
      setReservations(reservationsData)
    } catch (error) {
      console.error('Error fetching reservations:', error)
      setReservations([])
    } finally {
      setIsLoading(false)
    }
  }

  const searchReservations = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      fetchAllReservations()
      return
    }

    try {
      setIsLoading(true)
      const { data } = await instance.get(`/reservations/search`, {
        params: {
          code: searchQuery
        }
      })

      const reservationData = data.data.map((reservation) => ({
        code: reservation.code,
        email: reservation.userEmail,
        status: reservation.status,
        createdAt: reservation.createdAt,
        endTime: reservation.endTime
      }))

      setReservations(reservationData)
    } catch (error) {
      console.error('Error searching reservation:', error)
      setReservations([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleGlobalFilterChange = (value) => {
    setGlobalFilter(value)
  }

  const handleClearSearch = () => {
    setGlobalFilter('')
    fetchAllReservations()
  }

  const handleRowClick = (code) => {
    navigate(`/dashboard/reservations/${code}`)
  }

  // Initial load
  useEffect(() => {
    fetchAllReservations()
  }, [])

  useEffect(() => {
    searchReservations(debouncedFilter)
  }, [debouncedFilter, searchReservations])

  return (
    <div className='space-y-4'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Reservations</h2>
        <p className='text-muted-foreground'>Manage your reservation operations</p>
      </div>

      <DataTableToolbar
        table={table}
        searchPlaceholder='Search by reservation code...'
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

export default ReservationsPage
