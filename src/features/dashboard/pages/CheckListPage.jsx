import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import { checkListService } from '../services/checkListService'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import DataTableToolbar from '../components/DataTableToolbar'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

const columnHelper = createColumnHelper()

const CheckListPage = () => {
  const [checkLists, setCheckLists] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchKey, setSearchKey] = useState('')
  const [debouncedFilter] = useDebounce(searchKey, 500)
  const [typeFilter, setTypeFilter] = useState([])
  const navigate = useNavigate()

  const typeOptions = ['CHECK_IN', 'CHECK_OUT']

  const columns = [
    columnHelper.accessor('rentalId', {
      header: 'Rental ID',
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('type', {
      header: 'Type',
      cell: (info) => {
        const type = info.getValue()
        return (
          <Badge
            className={
              type === 'CHECK_IN' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
            }
          >
            {type}
          </Badge>
        )
      }
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

  const handleRowClick = (id) => {
    navigate(`/dashboard/check-list/${id}`)
  }

  useEffect(() => {
    const searchCheckLists = async (searchKey) => {
      try {
        setIsLoading(true)
        const data = await checkListService.getCheckList()

        // Filter data based on search and type filter
        let filteredData = data

        if (searchKey.trim()) {
          filteredData = filteredData.filter(
            (item) =>
              item.id.toString().includes(searchKey) ||
              item.rentalId.toString().includes(searchKey) ||
              item.type.toLowerCase().includes(searchKey.toLowerCase())
          )
        }

        if (typeFilter.length > 0) {
          filteredData = filteredData.filter((item) => typeFilter.includes(item.type))
        }

        setCheckLists(filteredData)
      } catch (error) {
        toast.error(error.message)
        setCheckLists([])
      } finally {
        setIsLoading(false)
      }
    }

    searchCheckLists(debouncedFilter)
  }, [debouncedFilter, typeFilter])

  return (
    <div className='space-y-4'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Check Lists</h2>
        <p className='text-muted-foreground'>Manage vehicle check-in and check-out records</p>
      </div>

      <DataTableToolbar
        table={table}
        searchPlaceholder='Search by ID, Rental ID, or Type...'
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        statusOptions={typeOptions}
        statusFilter={typeFilter}
        setStatusFilter={setTypeFilter}
        filterLabel='Type'
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

export default CheckListPage
