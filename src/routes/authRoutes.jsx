import { lazy, Suspense } from 'react'
import PublicRoute from './PublicRoute'
import Loader from '@/components/Loader'
import AuthLayout from '@/layout/AuthLayout'

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'))
const OtpPage = lazy(() => import('@/features/auth/pages/OtpPage'))
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('@/features/auth/pages/ResetPasswordPage'))

const authRoutes = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    {
      path: 'login',
      element: (
        <PublicRoute>
          <Suspense fallback={<Loader />}>
            <LoginPage />
          </Suspense>
        </PublicRoute>
      )
    },
    {
      path: 'register',
      element: (
        <PublicRoute>
          <Suspense fallback={<Loader />}>
            <RegisterPage />
          </Suspense>
        </PublicRoute>
      )
    },
    {
      path: 'verify-otp',
      element: (
        <PublicRoute>
          <Suspense fallback={<Loader />}>
            <OtpPage />
          </Suspense>
        </PublicRoute>
      )
    },
    {
      path: 'forgot-password',
      element: (
        <PublicRoute>
          <Suspense fallback={<Loader />}>
            <ForgotPasswordPage />
          </Suspense>
        </PublicRoute>
      )
    },
    {
      path: 'reset-password',
      element: (
        <PublicRoute>
          <Suspense fallback={<Loader />}>
            <ResetPasswordPage />
          </Suspense>
        </PublicRoute>
      )
    }
  ]
}

export default authRoutes
