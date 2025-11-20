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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { carStatusOptions } from '../constants/carConfig'
import { carService } from '@/features/cars/services/carService'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

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

  const [showPinForm, setShowPinForm] = useState(false)
  const [pin, setPin] = useState('')
  const [carUpdate, setCarUpdate] = useState(null)

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

  const handleUpdateStatusCar = async (cid, status) => {
    setIsLoading(true)
    try {
      await carService.updateCarStatus(cid, status)
      toast.success('Cập nhật trạng thái xe thành công!')
      cars.forEach((car) => {
        if (car.id === cid) {
          car.status = status
        }
      })
    } catch (error) {
      toast.error('Lỗi khi cập nhật trạng thái xe: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdatePin = async () => {
    setIsLoading(true)
    try {
      await carService.updateCarBattery(carUpdate.id, pin)
      toast.success('Cập nhật pin xe thành công!')
      await fetchCars()
    } catch (error) {
      setShowPinForm(true)
      setIsLoading(false)
      toast.error('Lỗi khi cập nhật pin xe: ' + error.message)
    } finally {
      setShowPinForm(false)
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
                      {car.status == 'Sẵn sàng' && car.battery < 80 && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleUpdateStatusCar(car.id, 'Đang xạc pin')}
                            className='flex justify-between text-green-600 hover:text-green-700'
                          >
                            Xạc pin <BatteryCharging className='h-4 w-4' />
                          </DropdownMenuItem>
                        </>
                      )}

                      {car.status == 'Đang xạc pin' && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setCarUpdate(car)
                              setShowPinForm(true)
                            }}
                            className='flex justify-between text-green-600 hover:text-green-700'
                          >
                            Xạc hoàn tất <BatteryCharging className='h-4 w-4' />
                          </DropdownMenuItem>
                        </>
                      )}

                      {car.status == 'Đang kiểm tra' && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleUpdateStatusCar(car.id, 'Đang bảo trì')}
                            className='flex justify-between text-orange-600 hover:text-orange-700'
                          >
                            Bảo trì <Wrench className='h-4 w-4' />
                          </DropdownMenuItem>
                        </>
                      )}

                      {car.status == 'Đang bảo trì' && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleUpdateStatusCar(car.id, 'Sẵn sàng')}
                            className='flex justify-between text-green-600 hover:text-green-700'
                          >
                            Hoàn thành bảo trì
                            <Wrench className='h-4 w-4' />
                          </DropdownMenuItem>
                        </>
                      )}
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

      <Dialog open={showPinForm} onOpenChange={setShowPinForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật pin</DialogTitle>
            <DialogDescription>Fill battery of vehicle</DialogDescription>
          </DialogHeader>
          <div className='px-6 py-4'>
            <div className='space-y-3'>
              <div className='flex items-start gap-4'>
                <Label className='mt-3 w-32' htmlFor='pin'>
                  Pin (%)
                </Label>
                <div className='flex-1 flex-col'>
                  <Input
                    id='pin'
                    type='number'
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder='100'
                  />
                </div>
              </div>
            </div>
            <div onClick={handleUpdatePin} className='mt-6 flex justify-end'>
              <Button>Xác nhận</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CarsTable
