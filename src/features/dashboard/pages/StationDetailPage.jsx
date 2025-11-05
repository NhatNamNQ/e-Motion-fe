import React, { useEffect, useState } from 'react'
import {
  ArrowLeft,
  Clock,
  Car,
  User,
  MapPin,
  Truck,
  Building2,
  Calendar,
  Eye,
  DollarSign,
  Zap
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'
import CardDashboard from '@/components/CardDashboard'
import { stationService } from '../services/stationService'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { formatDateResponse, formatHourDate, formatCurrency } from '@/lib/utils'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/selectors/authSelectors'
import { carService } from '@/features/cars/services/carService'

const StationDetailPage = () => {
  const { stationId } = useParams()
  const navigate = useNavigate()
  const [station, setStation] = useState([])
  const [revenue, setRevenue] = useState([])
  const [carQuantity, setCarQuantity] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingRevenue, setLoadingRevenue] = useState(false)
  const [loadingCar, setLoadingCar] = useState(false)
  const user = useSelector(selectUser)

  const cards = [
    {
      title: 'Số xe',
      value: station.quantityCar,
      icon: <Car className='h-12 w-12 text-blue-500' />
    },
    {
      title: 'Số nhân viên',
      value: station.quantityStaff,
      icon: <User className='h-12 w-12 text-green-500' />
    },
    {
      title: 'Xe đang thuê',
      value: station.carRental,
      icon: <Truck className='h-12 w-12 text-yellow-500' />
    },
    {
      title: 'Giờ cao điểm',
      peakHours: station.peakHours,
      icon: <Clock className='h-12 w-12 text-red-500' />
    }
  ]

  const totalRevenue = revenue.reduce((sum, r) => sum + r.data, 0)
  const averageRevenue = revenue.length > 0 ? totalRevenue / revenue.length : 0
  const maxRevenue = revenue.length > 0 ? Math.max(...revenue.map((r) => r.data)) : 0

  const statusColors = {
    'Sẵn sàng': '#10b981',
    'Đang thuê': '#3b82f6',
    'Đang bảo trì': '#ef4444'
  }

  const getStation = async () => {
    setLoading(true)
    try {
      const res = await stationService.getStationById(stationId)
      setStation(res)
    } catch (error) {
      toast.error('Get station failed: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const getStationRevenue = async () => {
    setLoadingRevenue(true)
    try {
      const res = await stationService.getRevenueOfStation(stationId)
      setRevenue(res)
    } catch (error) {
      toast.error('Get station revenue failed: ' + error.message)
    } finally {
      setLoadingRevenue(false)
    }
  }

  const getCarQuantity = async () => {
    setLoadingCar(true)
    try {
      const res = await carService.getCarQuantityEachStatusOfStation(stationId)
      console.log(res)
      setCarQuantity(res)
    } catch (error) {
      toast.error('Get station car quantity failed: ' + error.message)
    } finally {
      setLoadingCar(false)
    }
  }

  useEffect(() => {
    getStation()
    getStationRevenue()
    getCarQuantity()
  }, [stationId])

  if (loading) return <Loader />

  return (
    <div>
      {/* Header */}
      <div className='border-b border-gray-200 bg-white'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-6'>
          <div className='flex items-center gap-4'>
            {user.role === 'ROLE_ADMIN' && (
              <button
                className='rounded-lg p-2 hover:bg-gray-100'
                onClick={() => navigate('/dashboard/stations')}
              >
                <ArrowLeft className='h-6 w-6 text-gray-600' />
              </button>
            )}
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>{station.name}</h1>
              <p className='mt-1 flex items-center gap-2 text-gray-500'>
                <MapPin className='h-4 w-4' /> {station.address}, {station.city}
              </p>
            </div>
          </div>
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              station.status === 'ACTIVE'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {station.status === 'ACTIVE' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
          </span>
        </div>
      </div>
      <div className='mx-auto mt-6 max-w-7xl'>
        {/* KPI Cards */}
        <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-4'>
          {cards.map((card) => (
            <CardDashboard key={card.title} card={card} />
          ))}
        </div>

        <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
          {/* Box thông tin trạm */}
          <div className='rounded-lg border border-gray-200 bg-white p-6'>
            <h2 className='mb-4 text-lg font-semibold text-gray-900'>Thông tin trạm</h2>
            <div className='grid grid-cols-1 gap-6'>
              <div className='space-y-4'>
                <div>
                  <p className='text-sm text-gray-500'>Tên trạm</p>
                  <p className='flex items-center gap-2 font-medium text-gray-900'>
                    <Building2 className='h-4 w-4' />
                    {station.name}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Địa chỉ</p>
                  <p className='flex items-center gap-2 font-medium text-gray-900'>
                    <MapPin className='h-4 w-4' />
                    {station.address}, {station.city}
                  </p>
                </div>
              </div>
              <div className='space-y-4'>
                <div>
                  <p className='text-sm text-gray-500'>Ngày thành lập</p>
                  <p className='flex items-center gap-2 font-medium text-gray-900'>
                    <Calendar className='h-4 w-4' />
                    {formatDateResponse(station.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='rounded-lg border border-gray-200 bg-white p-6'>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-lg font-semibold text-gray-900'>Lịch sử thuê xe gần nhất</h2>
              <Button
                onClick={() => navigate('/dashboard/rentals')}
                className='gap-2 bg-blue-600 hover:bg-blue-700'
              >
                <Eye className='h-4 w-4' />
                View All
              </Button>
            </div>

            {station.rentals?.length > 0 ? (
              <div className='space-y-3'>
                {station.rentals.map((rental) => (
                  <div
                    key={rental.id}
                    className='flex items-center justify-between rounded-md border p-3 hover:cursor-pointer hover:bg-gray-50'
                    onClick={() => navigate(`/dashboard/rentals/${rental.id}`)}
                  >
                    <div>
                      <p className='text-sm text-gray-500'>
                        <span className='font-medium text-gray-900'>User:</span> {rental.userEmail}
                      </p>
                      <p className='text-sm text-gray-500'>
                        <span className='font-medium text-gray-900'>Time:</span>
                        {formatHourDate(rental.startTime)} — {formatHourDate(rental.endTime)}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        rental.status === 'COMPLETED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {rental.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-500'>Chưa có lịch sử thuê xe.</p>
            )}
          </div>
          <div className='rounded-xl bg-white p-6 shadow-lg'>
            <div className='mb-6 flex items-center justify-between'>
              <h3 className='flex items-center text-xl font-semibold text-gray-800'>
                <DollarSign className='mr-2 h-6 w-6 text-green-500' />
                Báo cáo doanh thu
              </h3>
            </div>
            {loadingRevenue ? (
              <Loader />
            ) : (
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={revenue}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                  <XAxis dataKey='name' stroke='#6b7280' />
                  <YAxis stroke='#6b7280' />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`${formatCurrency(value)}`, 'Doanh thu']}
                  />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='data'
                    stroke='#3b82f6'
                    strokeWidth={3}
                    name='Doanh thu (VNĐ)'
                    dot={{ fill: '#3b82f6', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
            <div className='mt-4 grid grid-cols-3 gap-4'>
              <div className='rounded-lg bg-blue-50 p-3 text-center'>
                <p className='mb-1 text-sm text-gray-600'>Tổng thu</p>
                <p className='text-xl font-bold text-blue-600'>{formatCurrency(totalRevenue)}</p>
              </div>
              <div className='rounded-lg bg-green-50 p-3 text-center'>
                <p className='mb-1 text-sm text-gray-600'>Trung bình</p>
                <p className='text-xl font-bold text-green-600'>{formatCurrency(averageRevenue)}</p>
              </div>
              <div className='rounded-lg bg-purple-50 p-3 text-center'>
                <p className='mb-1 text-sm text-gray-600'>Cao nhất</p>
                <p className='text-xl font-bold text-purple-600'>{formatCurrency(maxRevenue)}</p>
              </div>
            </div>
          </div>

          <div className='rounded-xl bg-white p-6 shadow-lg'>
            <div className='mb-6 flex items-center justify-between'>
              <h3 className='flex items-center text-xl font-semibold text-gray-800'>
                <Zap className='mr-2 h-6 w-6 text-blue-500' />
                Trạng thái xe hiện tại
              </h3>
            </div>
            {loadingCar ? (
              <Loader />
            ) : (
              <div>
                <div className='flex items-center justify-center'>
                  <ResponsiveContainer width='100%' height={300}>
                    <PieChart>
                      <Pie
                        data={carQuantity}
                        cx='50%'
                        cy='50%'
                        labelLine={false}
                        label={({ status, quantity, percent }) =>
                          `${status}: ${quantity} (${(percent * 100).toFixed(0)}%)`
                        }
                        outerRadius={100}
                        fill='#8884d8'
                        dataKey='quantity'
                      >
                        {carQuantity.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={statusColors[entry.status] || '#6b7280'}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className='mt-4 grid grid-cols-3 gap-3'>
                  {carQuantity.map((item, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between rounded-lg bg-gray-50 p-3'
                    >
                      <div className='flex items-center'>
                        <div
                          className='mr-2 h-4 w-4 rounded-full'
                          style={{ backgroundColor: statusColors[item.status] }}
                        />
                        <span className='text-sm text-gray-700'>{item.status}</span>
                      </div>
                      <span className='font-bold text-gray-800'>{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StationDetailPage
