import { Suspense } from 'react'
import ProtectedRoute from './ProtectedRoute'
import ErrorPage from '@/features/error/pages/ErrorPage'
import Loader from '@/components/Loader'
import DashboardLayout from '@/layout/DashboardLayout'

import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import ReservationsPage from '@/features/dashboard/pages/ReservationsPage'
import ReservationDetailPage from '@/features/dashboard/pages/ReservationDetailPage'
import RentalDetailPage from '@/features/dashboard/pages/RentalDetailPage'
import UsersPage from '@/features/dashboard/pages/UsersPage'
import RentalsPage from '@/features/dashboard/pages/RentalsPage'
import CheckListPage from '@/features/dashboard/pages/CheckListPage'
import CheckInPage from '@/features/dashboard/pages/CheckInPage'
import CheckOutPage from '@/features/dashboard/pages/CheckOutPage'
import CheckListDetailPage from '@/features/dashboard/pages/CheckListDetailPage'
import VehicleLogsPage from '@/features/dashboard/pages/VehicleLogsPage'
import VehicleLogDetailPage from '@/features/dashboard/pages/VehicleLogDetailPage'
import RentalLogPage from '@/features/dashboard/pages/RentalLogPage'
import StationsPage from '@/features/dashboard/pages/StationsPage'
import StationDetailPage from '@/features/dashboard/pages/StationDetailPage'
import UserDetailPage from '@/features/dashboard/pages/UserDetailPage'
import CarsPage from '@/features/dashboard/pages/CarsPage'
import CarDetailPage from '@/features/cars/pages/CarDetailPage'
import CheckingRentalPage from '@/features/booking/pages/CheckingRentalPage'
import ReportsPage from '@/features/dashboard/pages/ReportsPage'

export const dashboardRoutes = {
  path: '/dashboard',
  element: <DashboardLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
          <Suspense fallback={<Loader />}>
            <DashboardPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/reservations',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <ReservationsPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/rentals',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <RentalsPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/reservations/:code',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <ReservationDetailPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/rentals/:id',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <RentalDetailPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/users',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <UsersPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/users/:email',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <UserDetailPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/rentals/:id/check-in',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <CheckInPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/rentals/:rentalId/vehicle-log',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <RentalLogPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/rentals/:rentalId/vehicle-log/edit/:logId',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <RentalLogPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/rentals/:id/check-out',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <CheckOutPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/check-list',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <CheckListPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/check-list/:id',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <CheckListDetailPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/vehicle-logs',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <VehicleLogsPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/vehicle-logs/:id',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <VehicleLogDetailPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/users',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <UsersPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/stations',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
          <Suspense fallback={<Loader />}>
            <StationsPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/stations/:stationId',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']} allowOwnStationOnly={true}>
          <Suspense fallback={<Loader />}>
            <StationDetailPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/cars',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <CarsPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/cars/:id',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <CarDetailPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/booking/confirm',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
          <Suspense fallback={<Loader />}>
            <CheckingRentalPage />
          </Suspense>
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard/reports',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
          <Suspense fallback={<Loader />}>
            <ReportsPage />
          </Suspense>
        </ProtectedRoute>
      )
    }
  ]
}
