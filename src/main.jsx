import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './features/home/pages/HomePage'
import MainLayout from './layout/MainLayout'
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'
import OtpPage from './features/auth/pages/OtpPage'
import ForgotPasswordPage from './features/auth/pages/ForgotPasswordPage'
import ResetPasswordPage from './features/auth/pages/ResetPasswordPage'
import CarListPage from './features/cars/pages/CarListPage'
import AuthProvider from './context/AuthProvider'
import PublicRoute from './layout/PublicRoute'
import ErrorPage from './features/error/pages/ErrorPage'
import CarDetailPage from './features/cars/pages/CarDetailPage'
import BookingPage from './features/booking/pages/BookingPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/auth/login',
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        )
      },
      {
        path: '/auth/register',
        element: (
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        )
      },
      {
        path: '/auth/verify-otp',
        element: (
          <PublicRoute>
            <OtpPage />
          </PublicRoute>
        )
      },
      {
        path: '/auth/forgot-password',
        element: (
          <PublicRoute>
            <ForgotPasswordPage />
          </PublicRoute>
        )
      },
      {
        path: '/auth/reset-password',
        element: (
          <PublicRoute>
            <ResetPasswordPage />
          </PublicRoute>
        )
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
        path: '/booking/confirm',
        element: <BookingPage />
      },
      {
        path: '/booking/payment-result',
        element: <BookingPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
