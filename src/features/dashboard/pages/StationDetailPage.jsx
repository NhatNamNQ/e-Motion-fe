import React, { useState } from 'react'
import {
  ArrowLeft,
  Building2,
  Car,
  User,
  Phone,
  Mail,
  MapPin,
  Edit2,
  Trash2,
  Plus,
  Search,
  MoreVertical,
  AlertCircle
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
  Cell
} from 'recharts'

const StationDetailPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchVehicle, setSearchVehicle] = useState('')
  const [searchStaff, setSearchStaff] = useState('')
  // const [showEditModal, setShowEditModal] = useState(false)
  // const [showAddVehicleModal, setShowAddVehicleModal] = useState(false)
  // const [showAddStaffModal, setShowAddStaffModal] = useState(false)

  // Mock station data
  const station = {
    id: 1,
    name: 'Trạm Quản Lý Số 1',
    address: '123 Đường Lê Lợi, Quận 1',
    city: 'Hồ Chí Minh',
    phone: '028 3838 1234',
    email: 'station1@rentalcar.com',
    manager: 'Nguyễn Văn A',
    status: 'ACTIVE',
    establishedDate: '2020-01-15',
    revenue: 450000000,
    description: 'Trạm quản lý lớn nhất với 50 xe và 20 nhân viên'
  }

  const vehicles = [
    {
      id: 1,
      name: 'Xe tải 01 - BMW',
      type: 'Truck',
      status: 'Available',
      year: 2022,
      plate: 'BKS-001'
    },
    {
      id: 2,
      name: 'Xe tải 02 - Mercedes',
      type: 'Truck',
      status: 'Rented',
      year: 2023,
      plate: 'BKS-002'
    },
    {
      id: 3,
      name: 'Xe tải 03 - Volvo',
      type: 'Truck',
      status: 'Maintenance',
      year: 2021,
      plate: 'BKS-003'
    },
    {
      id: 4,
      name: 'Xe tải 04 - Ford',
      type: 'Truck',
      status: 'Available',
      year: 2022,
      plate: 'BKS-004'
    },
    {
      id: 5,
      name: 'Xe tải 05 - Isuzu',
      type: 'Truck',
      status: 'Available',
      year: 2023,
      plate: 'BKS-005'
    }
  ]

  const staff = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      position: 'Tài xế',
      phone: '0987654321',
      email: 'a@example.com',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      position: 'Kỹ thuật viên',
      phone: '0987654322',
      email: 'b@example.com',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      position: 'Phục vụ',
      phone: '0987654323',
      email: 'c@example.com',
      status: 'On Leave'
    },
    {
      id: 4,
      name: 'Phạm Văn D',
      position: 'Tài xế',
      phone: '0987654324',
      email: 'd@example.com',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Hoàng Thị E',
      position: 'Quản lý',
      phone: '0987654325',
      email: 'e@example.com',
      status: 'Active'
    }
  ]

  const revenueData = [
    { month: 'T1', revenue: 35000 },
    { month: 'T2', revenue: 42000 },
    { month: 'T3', revenue: 38000 },
    { month: 'T4', revenue: 50000 },
    { month: 'T5', revenue: 45000 },
    { month: 'T6', revenue: 52000 }
  ]

  const vehicleStats = [
    { name: 'Available', value: 3, color: '#10b981' },
    { name: 'Rented', value: 1, color: '#3b82f6' },
    { name: 'Maintenance', value: 1, color: '#f59e0b' }
  ]

  const filteredVehicles = vehicles.filter((v) =>
    v.name.toLowerCase().includes(searchVehicle.toLowerCase())
  )
  const filteredStaff = staff.filter((s) =>
    s.name.toLowerCase().includes(searchStaff.toLowerCase())
  )

  const getStatusColor = (status) => {
    const colors = {
      Available: 'bg-green-100 text-green-800',
      Rented: 'bg-blue-100 text-blue-800',
      Maintenance: 'bg-yellow-100 text-yellow-800',
      Active: 'bg-green-100 text-green-800',
      'On Leave': 'bg-red-100 text-red-800',
      ACTIVE: 'bg-green-100 text-green-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='border-b border-gray-200 bg-white'>
        <div className='mx-auto max-w-7xl px-4 py-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <button className='rounded-lg p-2 hover:bg-gray-100'>
                <ArrowLeft className='h-6 w-6 text-gray-600' />
              </button>
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>{station.name}</h1>
                <p className='mt-1 flex items-center gap-2 text-gray-500'>
                  <MapPin className='h-4 w-4' />
                  {station.address}, {station.city}
                </p>
              </div>
            </div>
            <button className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
              <Edit2 className='inline h-4 w-4' /> Chỉnh sửa
            </button>
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-7xl px-4 py-8'>
        {/* Info Cards */}
        <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-4'>
          <div className='rounded-lg border border-gray-200 bg-white p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Tổng xe</p>
                <p className='text-2xl font-bold text-gray-900'>{vehicles.length}</p>
              </div>
              <Car className='h-12 w-12 text-blue-500 opacity-20' />
            </div>
          </div>

          <div className='rounded-lg border border-gray-200 bg-white p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Tổng nhân viên</p>
                <p className='text-2xl font-bold text-gray-900'>{staff.length}</p>
              </div>
              <User className='h-12 w-12 text-purple-500 opacity-20' />
            </div>
          </div>

          <div className='rounded-lg border border-gray-200 bg-white p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Doanh thu năm</p>
                <p className='text-2xl font-bold text-gray-900'>₫450M</p>
              </div>
              <Building2 className='h-12 w-12 text-green-500 opacity-20' />
            </div>
          </div>

          <div className='rounded-lg border border-gray-200 bg-white p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Trạng thái</p>
                <p
                  className={`mt-2 inline rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(station.status)}`}
                >
                  {station.status}
                </p>
              </div>
              <AlertCircle className='h-12 w-12 text-indigo-500 opacity-20' />
            </div>
          </div>
        </div>

        {/* Station Info */}
        <div className='mb-8 rounded-lg border border-gray-200 bg-white p-6'>
          <h2 className='mb-4 text-lg font-semibold text-gray-900'>Thông tin trạm</h2>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-4'>
              <div>
                <p className='text-sm text-gray-500'>Quản lý trạm</p>
                <p className='font-medium text-gray-900'>{station.manager}</p>
              </div>
              <div>
                <p className='text-sm text-gray-500'>Điện thoại</p>
                <p className='flex items-center gap-2 font-medium text-gray-900'>
                  <Phone className='h-4 w-4' />
                  {station.phone}
                </p>
              </div>
            </div>
            <div className='space-y-4'>
              <div>
                <p className='text-sm text-gray-500'>Email</p>
                <p className='flex items-center gap-2 font-medium text-gray-900'>
                  <Mail className='h-4 w-4' />
                  {station.email}
                </p>
              </div>
              <div>
                <p className='text-sm text-gray-500'>Ngày thành lập</p>
                <p className='font-medium text-gray-900'>15/01/2020</p>
              </div>
            </div>
          </div>
          <div className='mt-4 border-t pt-4'>
            <p className='text-sm text-gray-500'>Mô tả</p>
            <p className='mt-1 text-gray-900'>{station.description}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className='border-b border-gray-200'>
          <div className='flex gap-8'>
            {['overview', 'vehicles', 'staff'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-4 font-medium transition ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'overview' && 'Tổng quan'}
                {tab === 'vehicles' && 'Xe cộ'}
                {tab === 'staff' && 'Nhân viên'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className='mt-8'>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
              <div className='rounded-lg border border-gray-200 bg-white p-6'>
                <h3 className='mb-4 text-lg font-semibold text-gray-900'>Doanh thu 6 tháng</h3>
                <ResponsiveContainer width='100%' height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                    <XAxis dataKey='month' stroke='#9ca3af' />
                    <YAxis stroke='#9ca3af' />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Line
                      type='monotone'
                      dataKey='revenue'
                      stroke='#3b82f6'
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className='rounded-lg border border-gray-200 bg-white p-6'>
                <h3 className='mb-4 text-lg font-semibold text-gray-900'>Trạng thái xe</h3>
                <ResponsiveContainer width='100%' height={300}>
                  <PieChart>
                    <Pie
                      data={vehicleStats}
                      cx='50%'
                      cy='50%'
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey='value'
                    >
                      {vehicleStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className='mt-4 space-y-2'>
                  {vehicleStats.map((stat) => (
                    <div key={stat.name} className='flex items-center justify-between'>
                      <span className='flex items-center gap-2 text-sm text-gray-600'>
                        <div
                          className='h-3 w-3 rounded-full'
                          style={{ backgroundColor: stat.color }}
                        ></div>
                        {stat.name}
                      </span>
                      <span className='font-semibold text-gray-900'>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Vehicles Tab */}
          {activeTab === 'vehicles' && (
            <div className='rounded-lg border border-gray-200 bg-white'>
              <div className='border-b border-gray-200 p-6'>
                <div className='flex items-center justify-between gap-4'>
                  <div className='relative flex-1'>
                    <Search className='absolute top-3 left-3 h-5 w-5 text-gray-400' />
                    <input
                      type='text'
                      placeholder='Tìm kiếm xe...'
                      value={searchVehicle}
                      onChange={(e) => setSearchVehicle(e.target.value)}
                      className='w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10'
                    />
                  </div>
                  <button className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
                    <Plus className='h-5 w-5' />
                    Thêm xe
                  </button>
                </div>
              </div>

              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b border-gray-200 bg-gray-50'>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>
                        Tên xe
                      </th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>
                        Loại
                      </th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>
                        Biển số
                      </th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>
                        Năm
                      </th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>
                        Trạng thái
                      </th>
                      <th className='px-6 py-3 text-center text-sm font-semibold text-gray-900'>
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVehicles.map((vehicle) => (
                      <tr key={vehicle.id} className='border-b border-gray-100 hover:bg-gray-50'>
                        <td className='px-6 py-4 font-medium text-gray-900'>{vehicle.name}</td>
                        <td className='px-6 py-4 text-gray-600'>{vehicle.type}</td>
                        <td className='px-6 py-4 text-gray-600'>{vehicle.plate}</td>
                        <td className='px-6 py-4 text-gray-600'>{vehicle.year}</td>
                        <td className='px-6 py-4'>
                          <span
                            className={`inline rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(vehicle.status)}`}
                          >
                            {vehicle.status}
                          </span>
                        </td>
                        <td className='px-6 py-4 text-center'>
                          <button className='rounded p-2 hover:bg-gray-200'>
                            <MoreVertical className='h-5 w-5 text-gray-400' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Staff Tab */}
          {activeTab === 'staff' && (
            <div className='rounded-lg border border-gray-200 bg-white'>
              <div className='border-b border-gray-200 p-6'>
                <div className='flex items-center justify-between gap-4'>
                  <div className='relative flex-1'>
                    <Search className='absolute top-3 left-3 h-5 w-5 text-gray-400' />
                    <input
                      type='text'
                      placeholder='Tìm kiếm nhân viên...'
                      value={searchStaff}
                      onChange={(e) => setSearchStaff(e.target.value)}
                      className='w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10'
                    />
                  </div>
                  <button className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
                    <Plus className='h-5 w-5' />
                    Thêm nhân viên
                  </button>
                </div>
              </div>

              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b border-gray-200 bg-gray-50'>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>
                        Tên
                      </th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>
                        Chức vụ
                      </th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>
                        Điện thoại
                      </th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>
                        Email
                      </th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>
                        Trạng thái
                      </th>
                      <th className='px-6 py-3 text-center text-sm font-semibold text-gray-900'>
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStaff.map((member) => (
                      <tr key={member.id} className='border-b border-gray-100 hover:bg-gray-50'>
                        <td className='px-6 py-4 font-medium text-gray-900'>{member.name}</td>
                        <td className='px-6 py-4 text-gray-600'>{member.position}</td>
                        <td className='px-6 py-4 text-gray-600'>{member.phone}</td>
                        <td className='px-6 py-4 text-gray-600'>{member.email}</td>
                        <td className='px-6 py-4'>
                          <span
                            className={`inline rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(member.status)}`}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className='px-6 py-4 text-center'>
                          <button className='rounded p-2 hover:bg-gray-200'>
                            <MoreVertical className='h-5 w-5 text-gray-400' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StationDetailPage
