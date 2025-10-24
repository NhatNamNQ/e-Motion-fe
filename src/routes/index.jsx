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
          <Suspense fallback={<Loader />}>
            <BookingPage />
          </Suspense>
        )
      },
      {
        path: '/booking/payment-result',
        element: (
          <Suspense fallback={<Loader />}>
            <BookingPage />
          </Suspense>
        )
      },
      {
        path: '/profile',
        element: (
          <Suspense fallback={<Loader />}>
            <ProfilePage />
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
        path: '/dashboard/check-list',
        element: (
          <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_STAFF']}>
            <Suspense fallback={<Loader />}>
              <CheckListPage />
            </Suspense>
          </ProtectedRoute>
        )
      }
    ]
  }
]
