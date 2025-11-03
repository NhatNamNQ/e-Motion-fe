import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import { checkListService } from '../services/checkListService'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import DataTableToolbar from '../components/DataTableToolbar'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import Pagination from '@/components/Pagination'

const columnHelper = createColumnHelper()

const CheckListPage = () => {
  const [checkLists, setCheckLists] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchKey, setSearchKey] = useState('')
  const [debouncedFilter] = useDebounce(searchKey, 500)
  const [typeFilter, setTypeFilter] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limitPerPage, setLimitPerPage] = useState(10)

  const navigate = useNavigate()

  const columns = [
    columnHelper.accessor('rentalId', {
      header: 'Rental ID',
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('staffEmail', {
      header: 'Staff email',
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created At',
      cell: (info) => {
        const date = new Date(info.getValue())
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    })
  ]

  const table = useReactTable({
    data: checkLists,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const handleRowClick = (row) => {
    const rentalId = row.rentalId
    navigate(`/dashboard/check-list/${rentalId}`)
  }

  useEffect(() => {
    const fetchCheckLists = async () => {
      try {
        setIsLoading(true)
        const response = await checkListService.getCheckLists({
          type: typeFilter,
          page: currentPage,
          limit: limitPerPage,
          search: debouncedFilter
        })

        setCheckLists(response.content || response.data || response)
        setTotalPages(response.totalPages || 1)
      } catch (error) {
        toast.error(error.message)
        setCheckLists([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCheckLists()
  }, [debouncedFilter, typeFilter, currentPage, limitPerPage])

  return (
    <div className='flex h-full flex-col space-y-4'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Check Lists</h2>
        <p className='text-muted-foreground'>Manage vehicle check-in and check-out records</p>
      </div>

      <DataTableToolbar
        table={table}
        searchPlaceholder='Search by ID, Rental ID, or Type...'
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        statusFilter={typeFilter}
        setStatusFilter={setTypeFilter}
        filterLabel='Type'
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

export default CheckListPage
