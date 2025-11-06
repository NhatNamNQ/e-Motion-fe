import React, { useState } from 'react'
import { User, Clock, Car, MapPin, Calendar } from 'lucide-react'
import ProfilePage from '@/features/profile/pages/ProfilePage'
import HistoryPage from '@/features/profile/pages/HistoryPage'

export default function UserDetail({ user }) {
  const [activeTab, setActiveTab] = useState('info')
  return (
    <div className='bg-white shadow-lg'>
      <div className='flex border-b'>
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 px-6 py-4 font-semibold transition-colors ${
            activeTab === 'info'
              ? 'border-b-2 border-blue-600 bg-blue-50 text-blue-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className='flex items-center justify-center gap-2'>
            <User size={20} />
            <span>Thông tin</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 px-6 py-4 font-semibold transition-colors ${
            activeTab === 'history'
              ? 'border-b-2 border-blue-600 bg-blue-50 text-blue-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className='flex items-center justify-center gap-2'>
            <Clock size={20} />
            <span>Lịch sử thuê xe</span>
          </div>
        </button>
      </div>

      {/* Tab Content */}
      <div className='p-8'>
        {activeTab === 'info' ? <ProfilePage user={user} /> : <HistoryPage user={user} />}
      </div>
    </div>
  )
}
