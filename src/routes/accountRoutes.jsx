import { Suspense } from 'react'
import Loader from '@/components/Loader'
import ProtectedRoute from './ProtectedRoute'
import AccountLayout from '@/layout/AccountLayout'
import HistoryPage from '@/features/profile/pages/HistoryPage'
import ChangePasswordPage from '@/features/profile/pages/ChangePasswordPage'
import ProfilePage from '@/features/profile/pages/ProfilePage'
import ErrorPage from '@/features/error/pages/ErrorPage'
import ReservationDetailPage from '@/features/profile/pages/ReservationDetailPage'
import RentalDetailPage from '@/features/profile/pages/RentalDetailPage'

const accountRoutes = {
  path: '/account',
  errorElement: <ErrorPage />,
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
            <ProfilePage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/account/changePassword',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_STAFF', 'ROLE_ADMIN']}>
          <Suspense fallback={<Loader />}>
            <ChangePasswordPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/account/reservations/:id',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_STAFF', 'ROLE_ADMIN']}>
          <ReservationDetailPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/account/rentals/:id',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_STAFF', 'ROLE_ADMIN']}>
          <RentalDetailPage />
        </ProtectedRoute>
      )
    }
  ]
}

export default accountRoutes
