import { Suspense, lazy } from 'react'
import MainLayout from '@/layout/MainLayout'
import ProtectedRoute from './ProtectedRoute'
import ErrorPage from '@/features/error/pages/ErrorPage'
import Loader from '@/components/Loader'
import PaymentResultPage from '@/features/booking/pages/PaymentResultPage'
import AboutUsPage from '@/features/profile/pages/AboutUsPage'
import CarListPage from '@/features/cars/pages/CarListPage'
import CarDetailPage from '@/features/cars/pages/CarDetailPage'
import HomePage from '@/features/home/pages/HomePage'
import BookingPage from '@/features/booking/pages/BookingPage'

const TermOfUsePage = lazy(() => import('@/features/home/pages/TermOfUsePage'))
const RentalPolicyPage = lazy(() => import('@/features/home/pages/RentalPolicyPage'))

const mainRoutes = {
  path: '/',
  element: <MainLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/cars',
      element: <CarListPage />
    },
    {
      path: '/cars/:id',
      element: <CarDetailPage />
    },
    {
      path: '/about-us',
      element: (
        <Suspense fallback={<Loader />}>
          <AboutUsPage />
        </Suspense>
      )
    },
    {
      path: '/term-of-use',
      element: (
        <Suspense fallback={<Loader />}>
          <TermOfUsePage />
        </Suspense>
      )
    },
    {
      path: '/rental-policy',
      element: (
        <Suspense fallback={<Loader />}>
          <RentalPolicyPage />
        </Suspense>
      )
    },
    {
      path: '/booking/confirm',
      element: (
        <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_STAFF', 'ROLE_ADMIN']}>
          <BookingPage />
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
    },
    {
      path: '/payment-result',
      element: (
        <Suspense fallback={<Loader />}>
          <PaymentResultPage />
        </Suspense>
      )
    }
  ]
}

export default mainRoutes
