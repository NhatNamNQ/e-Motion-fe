import React, { useCallback, useEffect, useState } from 'react'
import { History, ArrowDown, Building2, Car, User, Activity, Navigation } from 'lucide-react'
import CardDashboard from '@/components/CardDashboard'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { stationService } from '../services/stationService'
import { toast } from 'sonner'
import Loader from '@/components/Loader'
import { formatCurrency, formatProfileDate, formatHourDate } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

const StationsPage = () => {
  const [stationDataLoaded, setStationDataLoaded] = useState(false)
  const [stations, setStations] = useState([])
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [showDispatchModal, setShowDispatchModal] = useState(false)
  const [selectedStation, setSelectedStation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('day')
  const [day, setDay] = useState(new Date().getDate())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [revenue, setRevenue] = useState([])
  const [rentals, setRentals] = useState([])

  const navigate = useNavigate()

  // Dispatch form state
  const [dispatchForm, setDispatchForm] = useState({
    fromStation: '',
    toStation: '',
    type: 'vehicles',
    quantity: 1,
    selectedItem: ''
  })

  const vehicles = [
    { id: 1, name: 'Xe tải 01 - BMW' },
    { id: 2, name: 'Xe tải 02 - Mercedes' },
    { id: 3, name: 'Xe tải 03 - Volvo' },
    { id: 4, name: 'Xe tải 04 - Ford' },
    { id: 5, name: 'Xe tải 05 - Isuzu' }
  ]

  const staff = [
    { id: 1, name: 'Nguyễn Văn A - Tài xế' },
    { id: 2, name: 'Trần Thị B - Kỹ thuật viên' },
    { id: 3, name: 'Lê Văn C - Phục vụ' },
    { id: 4, name: 'Phạm Văn D - Tài xế' },
    { id: 5, name: 'Hoàng Thị E - Quản lý' }
  ]

  const totalVehicles = stations.reduce((sum, s) => sum + s.quantityCar, 0)
  const totalStaff = stations.reduce((sum, s) => sum + s.quantityStaff, 0)
  const activeStations = stations.filter((s) => s.status === 'ACTIVE').length

  const cards = [
    {
      title: 'Total Stations',
      value: stations.length,
      icon: <Building2 className='h-6 w-6 text-blue-500' />
    },
    {
      title: 'Total Cars',
      value: totalVehicles,
      icon: <Car className='h-6 w-6 text-green-500' />
    },
    {
      title: 'Total Staffs',
      value: totalStaff,
      icon: <User className='h-6 w-6 text-purple-500' />
    },
    {
      title: 'Active Stations',
      value: activeStations,
      icon: <Activity className='h-6 w-6 text-indigo-500' />
    }
  ]

  const handleOpenDispatchModal = () => {
    setDispatchForm({
      fromStation: '',
      toStation: '',
      type: 'vehicles',
      quantity: 1,
      selectedItem: ''
    })
    setShowDispatchModal(true)
  }

  const handleViewHistory = async (station) => {
    setIsLoading(true)
    try {
      const res = await stationService.getRentalOfStation(station.id)
      setRentals(res)
      setSelectedStation(station)
      setShowHistoryModal(true)
    } catch (error) {
      toast.error('Failed: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDispatchChange = (field, value) => {
    setDispatchForm((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmitDispatch = () => {
    console.log('Dispatch:', dispatchForm)
    alert(
      `Điều phối ${dispatchForm.quantity} ${dispatchForm.type === 'vehicles' ? 'xe' : 'nhân viên'} từ ${stations.find((s) => s.id == dispatchForm.fromStation)?.name} sang ${stations.find((s) => s.id == dispatchForm.toStation)?.name}`
    )
    setShowDispatchModal(false)
  }

  const handleNavigateToStationDetail = (stationId) => {
    navigate(`/dashboard/stations/${stationId}`)
  }

  const fetchStationData = async () => {
    setIsLoading(true)
    try {
      const data = await stationService.getDataManageStation()
      setStations(data)
    } catch (error) {
      toast.error('Failed: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRevenueStation = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await stationService.getRevenueStation(type, day, month, year)
      setRevenue(data)
    } catch (error) {
      toast.error('Failed: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }, [day, month, type, year])

  useEffect(() => {
    const init = async () => {
      await fetchStationData()
      setStationDataLoaded(true)
    }
    init()
  }, [])

  useEffect(() => {
    if (stationDataLoaded) {
      fetchRevenueStation()
    }
  }, [type, day, month, year, stationDataLoaded, fetchRevenueStation])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='min-h-screen'>
      <div className='mx-auto max-w-7xl px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-start justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Station</h1>
              <p className='mt-1 text-gray-500'>
                Manage stations and coordinate vehicles and staff.
              </p>
            </div>
            <Button
              onClick={handleOpenDispatchModal}
              className='gap-2 bg-blue-600 hover:bg-blue-700'
            >
              <Navigation className='h-4 w-4' />
              Điều phối
            </Button>
          </div>
        </div>

        <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-4'>
          {cards.map((card) => (
            <CardDashboard card={card} />
          ))}
        </div>

        {/* Table */}
        <div className='mb-8 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-gray-200 bg-gray-50'>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>
                  Station Name
                </th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Address</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>City</th>
                <th className='px-6 py-3 text-center text-sm font-semibold text-gray-900'>Car</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Staff</th>
                <th className='px-6 py-3 text-center text-sm font-semibold text-gray-900'>
                  Status
                </th>
                <th className='px-6 py-3 text-center text-sm font-semibold text-gray-900'>
                  History
                </th>
              </tr>
            </thead>
            <tbody>
              {stations.map((station) => (
                <tr
                  key={station.id}
                  onClick={() => handleNavigateToStationDetail(station.id)}
                  className='border-b border-gray-100 transition hover:bg-gray-50'
                >
                  <td className='px-6 py-4 text-sm font-medium text-gray-900'>{station.name}</td>
                  <td className='px-6 py-4 text-sm text-gray-600'>{station.address}</td>
                  <td className='px-6 py-4 text-sm text-gray-600'>{station.city}</td>
                  <td className='px-6 py-4 text-center text-sm text-gray-600'>
                    {station.quantityCar}
                  </td>
                  <td className='px-6 py-4 text-sm'>{station.quantityStaff}</td>
                  <td className='px-6 py-4 text-center text-sm text-gray-600'>{station.status}</td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center justify-center gap-2'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleViewHistory(station)
                        }}
                        title='Xem lịch sử'
                        className='rounded-md p-2 transition hover:bg-purple-100'
                      >
                        <History className='h-5 w-5 text-purple-600' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className='mb-6 text-2xl font-bold text-gray-900'>Phân tích</h2>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          <div className='col-span-2 rounded-2xl bg-white p-8 shadow-sm'>
            <div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
              <h1 className='text-3xl font-bold text-gray-900'>Revenue</h1>

              <div className='flex items-center gap-3'>
                {/* Chọn loại thống kê */}
                <Select onValueChange={(value) => setType(value)} value={type}>
                  <SelectTrigger className='w-30'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='day'>Theo ngày</SelectItem>
                    <SelectItem value='month'>Theo tháng</SelectItem>
                    <SelectItem value='year'>Theo năm</SelectItem>
                    <SelectItem value='total'>Tất cả</SelectItem>
                  </SelectContent>
                </Select>
                {type === 'day' && (
                  <input
                    type='date'
                    value={`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`}
                    onChange={(e) => {
                      const [y, m, d] = e.target.value.split('-').map(Number)
                      setYear(y)
                      setMonth(m)
                      setDay(d)
                    }}
                    className='rounded border border-gray-300 px-2 py-1 text-sm'
                  />
                )}

                {/* Chọn tháng */}
                {type === 'month' && (
                  <Select value={month} onValueChange={(value) => setMonth(value)}>
                    <SelectTrigger className='w-28'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <SelectItem
                          key={m}
                          value={m}
                          disabled={
                            year == new Date().getFullYear() && m > new Date().getMonth() + 1
                          }
                        >
                          Tháng {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {/* Chọn năm */}
                {type !== 'total' && (
                  <Select value={year} onValueChange={(value) => setYear(value)}>
                    <SelectTrigger className='w-20'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[2023, 2024, 2025].map((y) => (
                        <SelectItem key={y} value={y}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* Biểu đồ */}
            <ResponsiveContainer width='100%' height={400}>
              <BarChart data={revenue} margin={{ top: 20, right: 0, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray='0' stroke='#f0f0f0' vertical={false} />
                <XAxis
                  dataKey='stationName'
                  axisLine={false}
                  tickLine={false}
                  tick={({ x, y, payload }) => {
                    const lines = payload.value.match(/.{1,9}/g)
                    return (
                      <text x={x} y={y + 10} fill='#9ca3af' fontSize={14} textAnchor='middle'>
                        {lines.map((line, index) => (
                          <tspan x={x} dy={index === 0 ? 0 : 14} key={index}>
                            {line}
                          </tspan>
                        ))}
                      </text>
                    )
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 14 }}
                  tickFormatter={(revenue) => `${formatCurrency(revenue)}`}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '8px 12px'
                  }}
                  formatter={(revenue) => [`${formatCurrency(revenue)}`, 'Revenue']}
                />
                <Bar dataKey='revenue' fill='#1e293b' radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
            <h3 className='mb-4 text-lg font-semibold text-gray-900'>Phân bố Xe theo Trạm</h3>
            <div className='space-y-3'>
              {stations.map((s) => (
                <div key={s.id} className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600'>{s.name}</span>
                  <div className='flex items-center gap-2'>
                    <div className='h-2 w-45 rounded bg-gray-200'>
                      <div
                        className='h-2 rounded bg-blue-500'
                        style={{
                          width: `${(s.quantityCar / totalVehicles) * 100}%`
                        }}
                      ></div>
                    </div>
                    <span className='w-8 text-sm font-medium text-gray-900'>{s.quantityCar}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
            <h3 className='mb-4 text-lg font-semibold text-gray-900'>
              Phân bố Nhân viên theo Trạm
            </h3>
            <div className='space-y-3'>
              {stations.map((s) => (
                <div key={s.id} className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600'>{s.name}</span>
                  <div className='flex items-center gap-2'>
                    <div className='h-2 w-45 rounded bg-gray-200'>
                      <div
                        className='h-2 rounded bg-green-500'
                        style={{
                          width: `${(s.quantityStaff / totalStaff) * 100}%`
                        }}
                      ></div>
                    </div>
                    <span className='w-8 text-sm font-medium text-gray-900'>{s.quantityStaff}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* History Modal */}
      <Dialog open={showHistoryModal} onOpenChange={setShowHistoryModal}>
        <DialogContent className='!max-w-6xl'>
          <DialogHeader>
            <DialogTitle>History - {selectedStation?.name}</DialogTitle>
          </DialogHeader>

          <div className='mt-4 max-h-[500px] overflow-y-auto'>
            <table className='min-w-full border border-gray-200 text-sm'>
              <thead className='sticky top-0 bg-gray-50'>
                <tr>
                  <th className='border-b px-4 py-2 text-left'>Date</th>
                  <th className='border-b px-4 py-2 text-left'>User</th>
                  <th className='border-b px-4 py-2 text-left'>Vehicle</th>
                  <th className='border-b px-4 py-2 text-left'>Start</th>
                  <th className='border-b px-4 py-2 text-left'>End</th>
                  <th className='border-b px-4 py-2 text-left'>Fee</th>
                  <th className='border-b px-4 py-2 text-left'>Status</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((history, idx) => (
                  <tr key={idx} className='hover:bg-gray-50'>
                    <td className='border-b px-4 py-2'>{formatProfileDate(history.createdAt)}</td>
                    <td className='border-b px-4 py-2 font-medium'>{history.userEmail}</td>
                    <td className='border-b px-4 py-2'>{history.vehicle.name}</td>
                    <td className='border-b px-4 py-2'>{formatHourDate(history.startTime)}</td>
                    <td className='border-b px-4 py-2'>{formatHourDate(history.endTime)}</td>
                    <td className='border-b px-4 py-2'>{formatCurrency(history.rentFee)}</td>
                    <td className='border-b px-4 py-2'>{history.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dispatch Modal */}
      <Dialog open={showDispatchModal} onOpenChange={setShowDispatchModal}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Điều phối xe / Nhân viên</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            {/* Trạm đi */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>Trạm đi</label>
              <Select
                value={dispatchForm.fromStation}
                onValueChange={(value) => handleDispatchChange('fromStation', value)}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Chọn trạm đi' />
                </SelectTrigger>
                <SelectContent>
                  {stations.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Arrow */}
            <div className='flex justify-center'>
              <ArrowDown className='h-5 w-5 text-gray-400' />
            </div>

            {/* Trạm đến */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>Trạm đến</label>
              <Select
                value={dispatchForm.toStation}
                onValueChange={(value) => handleDispatchChange('toStation', value)}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Chọn trạm đến' />
                </SelectTrigger>
                <SelectContent>
                  {stations.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Loại điều phối */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>Loại điều phối</label>
              <div className='flex gap-4'>
                <label className='flex cursor-pointer items-center gap-2'>
                  <input
                    type='radio'
                    name='type'
                    value='vehicles'
                    checked={dispatchForm.type === 'vehicles'}
                    onChange={(e) => handleDispatchChange('type', e.target.value)}
                    className='h-4 w-4'
                  />
                  <span className='text-sm'>🚗 Xe</span>
                </label>
                <label className='flex cursor-pointer items-center gap-2'>
                  <input
                    type='radio'
                    name='type'
                    value='staff'
                    checked={dispatchForm.type === 'staff'}
                    onChange={(e) => handleDispatchChange('type', e.target.value)}
                    className='h-4 w-4'
                  />
                  <span className='text-sm'>👥 Nhân viên</span>
                </label>
              </div>
            </div>

            {/* Chọn xe hoặc nhân viên */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                {dispatchForm.type === 'vehicles' ? 'Chọn xe' : 'Chọn nhân viên'}
              </label>
              <select
                value={dispatchForm.selectedItem}
                onChange={(e) => handleDispatchChange('selectedItem', e.target.value)}
                className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm'
              >
                <option value=''>
                  {dispatchForm.type === 'vehicles' ? 'Chọn xe' : 'Chọn nhân viên'}
                </option>
                {(dispatchForm.type === 'vehicles' ? vehicles : staff).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Số lượng */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>Số lượng</label>
              <input
                type='number'
                min='1'
                value={dispatchForm.quantity}
                onChange={(e) => handleDispatchChange('quantity', parseInt(e.target.value))}
                className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm'
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose>Hủy</DialogClose>
            <Button
              onClick={handleSubmitDispatch}
              disabled={
                !dispatchForm.fromStation || !dispatchForm.toStation || !dispatchForm.selectedItem
              }
              className='bg-blue-600 hover:bg-blue-700 disabled:opacity-50'
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default StationsPage
