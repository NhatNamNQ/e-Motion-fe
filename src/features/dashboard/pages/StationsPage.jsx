import React, { useCallback, useEffect, useState } from 'react'
import { History, Building2, Car, User, Activity } from 'lucide-react'
import CardDashboard from '@/components/CardDashboard'
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
import { formatCurrency, formatDateResponse, formatHourDate } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

const StationsPage = () => {
  const [stations, setStations] = useState([])
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [selectedStation, setSelectedStation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingRevenue, setLoadingRevenue] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [type, setType] = useState('day')
  const [day, setDay] = useState(new Date().getDate())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [revenue, setRevenue] = useState([])
  const [rentals, setRentals] = useState([])

  const navigate = useNavigate()

  const totalVehicles = stations.reduce((sum, s) => sum + s.quantityCar, 0)
  const totalStaff = stations.reduce((sum, s) => sum + s.quantityStaff, 0)
  const activeStations = stations.filter((s) => s.status === 'ACTIVE').length

  const cards = [
    {
      title: 'Total Stations',
      value: stations.length,
      icon: <Building2 className='h-12 w-12 text-blue-500' />
    },
    {
      title: 'Total Cars',
      value: totalVehicles,
      icon: <Car className='h-12 w-12 text-green-500' />
    },
    {
      title: 'Total Staffs',
      value: totalStaff,
      icon: <User className='h-12 w-12 text-purple-500' />
    },
    {
      title: 'Active Stations',
      value: activeStations,
      icon: <Activity className='h-12 w-12 text-indigo-500' />
    }
  ]

  const handleViewHistory = async (station) => {
    setShowHistoryModal(true)
    setLoadingHistory(true)
    try {
      const res = await stationService.getRentalOfStation(station.id)
      setRentals(res)
      setSelectedStation(station)
    } catch (error) {
      toast.error('Failed: ' + error.message)
    } finally {
      setLoadingHistory(false)
    }
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
    setLoadingRevenue(true)
    try {
      const data = await stationService.getRevenueAllStation(type, day, month, year)
      setRevenue(data)
    } catch (error) {
      toast.error('Failed: ' + error.message)
    } finally {
      setLoadingRevenue(false)
    }
  }, [day, month, type, year])

  useEffect(() => {
    fetchStationData()
  }, [])

  useEffect(() => {
    fetchRevenueStation()
  }, [type, day, month, year, fetchRevenueStation])

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
                  className='border-b border-gray-100 transition hover:cursor-pointer hover:bg-gray-50'
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

        <div className='mb-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
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

        <h2 className='mb-6 text-2xl font-bold text-gray-900'>Phân tích</h2>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          <div className='col-span-2 rounded-2xl bg-white p-8 shadow-sm'>
            <div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
              <h1 className='text-3xl font-bold text-gray-900'>Revenue</h1>

              <div className='flex items-center gap-3'>
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
            {loadingRevenue ? (
              <Loader />
            ) : (
              <ResponsiveContainer width='100%' height={600}>
                <BarChart data={revenue} margin={{ top: 20, right: 0, left: 60, bottom: 5 }}>
                  <CartesianGrid strokeDasharray='0' stroke='#f0f0f0' vertical={false} />
                  <XAxis
                    dataKey='name'
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
                    tickFormatter={(data) => `${formatCurrency(data)}`}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '8px 12px'
                    }}
                    formatter={(data) => [`${formatCurrency(data)}`, 'Revenue']}
                  />
                  <Bar dataKey='data' fill='#1e293b' radius={[4, 4, 0, 0]} maxBarSize={60} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* History Modal */}
      <Dialog open={showHistoryModal} onOpenChange={setShowHistoryModal}>
        <DialogContent className='!max-w-6xl'>
          <DialogHeader>
            <DialogTitle>History - {selectedStation?.name}</DialogTitle>
          </DialogHeader>

          {loadingHistory ? (
            <Loader />
          ) : (
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
                    <tr
                      key={idx}
                      className='hover:cursor-pointer hover:bg-gray-50'
                      onClick={() => navigate(`/dashboard/rentals/${history.id}`)}
                    >
                      <td className='border-b px-4 py-2'>
                        {formatDateResponse(history.createdAt)}
                      </td>
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
          )}

          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default StationsPage
