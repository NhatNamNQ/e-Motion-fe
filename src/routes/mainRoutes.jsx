import { lazy, Suspense } from 'react'
import MainLayout from '@/layout/MainLayout'
import ProtectedRoute from './ProtectedRoute'
import ErrorPage from '@/features/error/pages/ErrorPage'
import Loader from '@/components/Loader'

const HomePage = lazy(() => import('@/features/home/pages/HomePage'))
const CarListPage = lazy(() => import('@/features/cars/pages/CarListPage'))
const CarDetailPage = lazy(() => import('@/features/cars/pages/CarDetailPage'))
const BookingPage = lazy(() => import('@/features/booking/pages/BookingPage'))

const mainRoutes = {
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
}

export default mainRoutes
