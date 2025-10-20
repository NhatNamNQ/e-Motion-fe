import SummaryCard from '../components/SummaryCard'
import StationRevenueChart from '../components/StationRevenueChart'
import RevenueChart from '../components/RevenueChart'
import { useEffect, useState } from 'react'
import { adminService } from '../services/adminService'
import Loader from '@/components/Loader'

const DashboardPage = () => {
  const [summary, setSummary] = useState({})
  const [stationDetail, setStationDetail] = useState([])
  const [revenueInYear, setRevenueInYear] = useState([])
  const [peakHours, setPeakHours] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const fetchStats = async () => {
    try {
      const data = await adminService.geDataDashboard()
      const dataSummary = data.totalStats
      const dataStationDetail = data.stationStats
      const dataRevenue = data.revenueInYear
      const dataPeakHours = data.peakHours

      setSummary({
        totalUsers: dataSummary.totalUsers ?? 0,
        totalCars: dataSummary.totalCars ?? 0,
        totalReservations: dataSummary.totalReservations ?? 0,
        totalBookings: dataSummary.totalBookings ?? 0,
        totalRevenue: dataSummary.totalRevenue ?? 0,
        usageRate: dataSummary.usageRate ?? 0,
        peakHours: dataSummary.peakHours ?? []
      })

      setStationDetail(
        dataStationDetail.map((item) => ({
          stationName: item.stationName,
          revenue: item.revenue ?? 0,
          cars: item.cars ?? 0,
          bookings: item.bookings ?? 0,
          usageRate: item.usageRate,
          peakHours: item.peakHours ?? [0]
        }))
      )

      setRevenueInYear(
        dataRevenue.map((item) => ({
          month: item.month,
          revenue: item.revenue ?? 0
        }))
      )

      setPeakHours(
        dataPeakHours.map((item) => ({
          hour: item.hour,
          traffic: item.traffic
        }))
      )
    } catch (error) {
      console.error('Error fetching data stats admin:', error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchStats()
  }, [])
  if (isLoading) {
    return <Loader />
  }
  return (
    <div>
      <h1 className='mb-6 text-3xl font-bold text-gray-800'>Staff Dashboard</h1>
      <SummaryCard summary={summary} />
      <StationRevenueChart stationDetail={stationDetail} />
      <RevenueChart revenueInYear={revenueInYear} peakHours={peakHours} />
    </div>
  )
}

export default DashboardPage
