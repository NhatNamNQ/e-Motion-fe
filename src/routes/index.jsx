import PaymentResultHandler from '@/components/PaymentResultHandler'
import mainRoutes from './mainRoutes'
import { dashboardRoutes } from './dashboardRoutes'
import accountRoutes from './accountRoutes'
import authRoutes from './authRoutes'

export const routes = [
  mainRoutes,
  authRoutes,
  dashboardRoutes,
  {
    path: '/payments/payment-result',
    element: <PaymentResultHandler />
  },
  accountRoutes
]
