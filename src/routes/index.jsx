import { lazy, Suspense } from 'react'

import MainLayout from '@/layout/MainLayout'
import DashboardLayout from '@/layout/DashboardLayout'
import PublicRoute from './PublicRoute'
import ProtectedRoute from './ProtectedRoute'
import ErrorPage from '@/features/error/pages/ErrorPage'
import Loader from '@/components/Loader'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import ReservationsPage from '@/features/dashboard/pages/ReservationsPage'
import ReservationDetailPage from '@/features/dashboard/pages/ReservationDetailPage'
import RentalDetailPage from '@/features/dashboard/pages/RentalDetailPage'
import RentalsPage from '@/features/dashboard/pages/RentalsPage'
import CheckListPage from '@/features/dashboard/pages/CheckListPage'
import CheckInPage from '@/features/dashboard/pages/CheckInPage'
import CheckOutPage from '@/features/dashboard/pages/CheckOutPage'
import CheckListDetailPage from '@/features/dashboard/pages/CheckListDetailPage'
import PaymentResultHandler from '@/components/PaymentResultHandler'
import SuccessPaymentPage from '@/features/dashboard/pages/SuccessPaymentPage'
import RentalLogPage from '@/features/dashboard/pages/RentalLogPage'
import HistoryPage from '@/features/profile/pages/HistoryPage'
import AccountLayout from '@/layout/AccountLayout'
import VehicleLogsPage from '@/features/dashboard/pages/VehicleLogsPage'
import VehicleLogDetailPage from '@/features/dashboard/pages/VehicleLogDetailPage'

const HomePage = lazy(() => import('@/features/home/pages/HomePage'))
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'))
const OtpPage = lazy(() => import('@/features/auth/pages/OtpPage'))
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('@/features/auth/pages/ResetPasswordPage'))
const CarListPage = lazy(() => import('@/features/cars/pages/CarListPage'))
const CarDetailPage = lazy(() => import('@/features/cars/pages/CarDetailPage'))
const BookingPage = lazy(() => import('@/features/booking/pages/BookingPage'))
const ProfilePage = lazy(() => import('@/features/profile/pages/ProfilePage'))

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        )
      },
      {
        path: '/auth/login',
        element: (
          <PublicRoute>
            <Suspense fallback={<Loader />}>
              <LoginPage />
            </Suspense>
          </PublicRoute>
        )
      },
      {
        path: '/auth/register',
        element: (
          <PublicRoute>
            <Suspense fallback={<Loader />}>
              <RegisterPage />
            </Suspense>
          </PublicRoute>
        )
      },
      {
        path: '/auth/verify-otp',
        element: (
          <PublicRoute>
            <Suspense fallback={<Loader />}>
              <OtpPage />
            </Suspense>
          </PublicRoute>
        )
      },
      {
        path: '/auth/forgot-password',
        element: (
          <PublicRoute>
            <Suspense fallback={<Loader />}>
              <ForgotPasswordPage />
            </Suspense>
          </PublicRoute>
        )
      },
      {
        path: '/auth/reset-password',
        element: (
          <PublicRoute>
            <Suspense fallback={<Loader />}>
              <ResetPasswordPage />
            </Suspense>
          </PublicRoute>
        )
      },
      {
        path: '/cars',
        element: (
          <Suspense fallback={<Loader />}>
            <CarListPage />
          </Suspense>
        )
      },
      {
        path: '/cars/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <CarDetailPage />
          </Suspense>
        )
      },
      {
        path: '/booking/confirm',
        element: (
          <ProtectedRoute allowedRoles={['ROLE_USER']}>
            <Suspense fallback={<Loader />}>
              <BookingPage />
            </Suspense>
          </ProtectedRoute>
        )
      },

      {
        path: '/booking/payment-result',
        element: (
          <Suspense fallback={<Loader />}>
            <BookingPage />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
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
        path: '/dashboard/payment-result',
        element: (
          <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
            <Suspense fallback={<Loader />}>
              <SuccessPaymentPage />
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
      }
    ]
  },
  {
    path: '/payments/payment-result',
    element: <PaymentResultHandler />
  },
  {
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
              <ProfilePage />
            </Suspense>
          </ProtectedRoute>
        )
      }
    ]
  }
]
