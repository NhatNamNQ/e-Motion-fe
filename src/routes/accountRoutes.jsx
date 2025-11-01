import { Suspense } from 'react'
import Loader from '@/components/Loader'
import ProtectedRoute from './ProtectedRoute'
import AccountLayout from '@/layout/AccountLayout'
import HistoryPage from '@/features/profile/pages/HistoryPage'
import UserProfile from '@/features/profile/pages/ProfilePage'

const accountRoutes = {
  path: '/account',
  element: (
    <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_STAFF', 'ROLE_ADMIN']}>
      <AccountLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/account/history',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_STAFF', 'ROLE_ADMIN']}>
          <HistoryPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/account/profile',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_STAFF', 'ROLE_ADMIN']}>
          <Suspense fallback={<Loader />}>
            <UserProfile />
          </Suspense>
        </ProtectedRoute>
      )
    }
  ]
}

export default accountRoutes
