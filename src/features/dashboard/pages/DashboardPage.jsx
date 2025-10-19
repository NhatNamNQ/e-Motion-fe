import SummaryCard from '../components/SummaryCard'
import StationRevenueChart from '../components/StationRevenueChart'

const DashboardPage = () => {
  return (
    <div>
      <h1 className='mb-6 text-3xl font-bold text-gray-800'>Staff Dashboard</h1>
      <SummaryCard />
      <StationRevenueChart />
      {/* <UsagePieChart />
      <PeakHourChart /> */}
    </div>
  )
}

export default DashboardPage
