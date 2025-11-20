import { BatteryCharging, MoreHorizontal, Edit2, Wrench, ShieldAlert, Trash2 } from 'lucide-react'
import Pagination from '@/components/Pagination'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { carStatusOptions } from '../constants/carConfig'
import { carService } from '@/features/cars/services/carService'
import { useNavigate } from 'react-router-dom'

const CarsTable = ({
  cars,
  limitPerPage,
  setLimitPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
  setMode,
  setShowCarForm,
  setIsLoading,
  fetchCars
}) => {
  const paginationProps = { limitPerPage, setLimitPerPage, currentPage, setCurrentPage, totalPages }

  const navigate = useNavigate()

  const handleClickEdit = async (cid) => {
    try {
      const car = await carService.getUpdateCar(cid)
      setMode({ type: 'edit', car: car })
      setShowCarForm(true)
    } catch (error) {
      setShowCarForm(false)
      toast.error('Lỗi: ' + error.message)
    }
  }

  const handleDeleteCar = async (cid) => {
    setIsLoading(true)
    try {
      await carService.deleteCar(cid)
      toast.success('Xóa xe thành công!')
      await fetchCars()
    } catch (error) {
      toast.error('Lỗi khi xóa xe: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNavigateToCarDetail = (cid) => {
    navigate(`/dashboard/cars/${cid}`)
  }

  return (
    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='border-b border-gray-200 bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Car Name</th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Plate</th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Brand</th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>
                Battery(%)
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Station</th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Status</th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'></th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {cars.map((car, index) => (
              <tr
                key={index}
                onClick={() => handleNavigateToCarDetail(car.id)}
                className='transition hover:cursor-pointer hover:bg-gray-50'
              >
                <td className='px-6 py-4 text-sm text-gray-900'>{car.name}</td>
                <td className='px-6 py-4 text-sm text-gray-600'>{car.plate}</td>
                <td className='px-6 py-4 text-sm text-gray-600'>{car.brand}</td>
                <td className='px-6 py-4 text-sm text-gray-900'>{car.battery}%</td>
                <td className='px-6 py-4'>{car.station}</td>
                <td className='px-6 py-4'>
                  {(() => {
                    const status = carStatusOptions.find((s) => s.value === car.status)
                    const color = status ? status.color : 'bg-gray-50 text-gray-700'
                    return (
                      <span className={`rounded-full px-2 py-1 text-sm font-medium ${color}`}>
                        {car.status}
                      </span>
                    )
                  })()}
                </td>
                <td className='relative px-6 py-4' onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <button className='p-1 text-gray-500 hover:text-gray-700'>
                        <MoreHorizontal className='h-5 w-5' />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align='end' className='w-45'>
                      <DropdownMenuItem
                        onClick={() => handleClickEdit(car.id)}
                        className='flex justify-between text-blue-600 hover:text-blue-700'
                      >
                        Chỉnh sửa <Edit2 className='h-4 w-4' />
                      </DropdownMenuItem>
                      {car.status == 'Sẵn sàng' && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className='flex justify-between text-green-600 hover:text-green-700'>
                            Xạc pin <BatteryCharging className='h-4 w-4' />
                          </DropdownMenuItem>
                        </>
                      )}

                      {car.status == 'Đang kiểm tra' && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className='flex justify-between text-orange-600 hover:text-orange-700'>
                            Bảo trì <Wrench className='h-4 w-4' />
                          </DropdownMenuItem>
                        </>
                      )}

                      {car.status == 'Đang bảo trì' && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className='flex justify-between text-green-600 hover:text-green-700'>
                            Hoàn thành bảo trì
                            <Wrench className='h-4 w-4' />
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className='flex justify-between text-yellow-600 hover:text-yellow-700'>
                        Báo lỗi <ShieldAlert className='h-4 w-4' />
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteCar(car.id)}
                        className='flex justify-between text-red-600 hover:text-red-700'
                      >
                        Xóa xe <Trash2 className='h-4 w-4' />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination {...paginationProps} />
    </div>
  )
}

export default CarsTable
