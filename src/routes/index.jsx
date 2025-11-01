import PaymentResultHandler from '@/components/PaymentResultHandler'
import mainRoutes from './mainRoutes'
import { dashboardRoutes } from './dashboardRoutes'
import accountRoutes from './accountRoutes'

export const routes = [
  mainRoutes,
  dashboardRoutes,
  {
    path: '/payments/payment-result',
    element: <PaymentResultHandler />
  },
  accountRoutes
]
