import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import { formatCurrency } from '@/lib/utils'

export default function RevenueChart({ revenueInYear, peakHours }) {
  return (
    <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
      {/* Biểu đồ doanh thu */}
      <div className='rounded-2xl bg-white p-8 shadow-sm'>
        <h1 className='mb-8 text-3xl font-bold text-gray-900'>Revenue (Month)</h1>

        <ResponsiveContainer width='100%' height={400}>
          <BarChart data={revenueInYear} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray='0' stroke='#f0f0f0' vertical={false} />
            <XAxis
              dataKey='month'
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 14 }}
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

      <div className='rounded-2xl bg-white p-8 shadow-sm'>
        <h1 className='mb-8 text-3xl font-bold text-gray-900'>Peak Hours (24h)</h1>

        <ResponsiveContainer width='100%' height={400}>
          <LineChart data={peakHours} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray='0' stroke='#f0f0f0' vertical={false} />
            <XAxis
              dataKey='hour'
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 14 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px 12px'
              }}
              formatter={(value) => [`${value} visits`, 'Traffic']}
            />
            <Line
              type='monotone'
              dataKey='traffic'
              stroke='#3b82f6'
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
