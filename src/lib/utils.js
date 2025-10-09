import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (price, currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(price)
}
