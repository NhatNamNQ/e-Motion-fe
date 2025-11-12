import { clsx } from 'clsx'
import { format, parse } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (price, currency = 'VND') => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currency
  }).format(price)
}

export const formatDate = (date, inputFormat = 'dd/MM/yyyy', outputFormat = 'yyyy-MM-dd') => {
  const dateObject = parse(date, inputFormat, new Date())
  return format(dateObject, outputFormat)
}

export const formatDateResponse = (dateString) => {
  if (!dateString) return ''
  // Loại bỏ đuôi 'h' hoặc ký tự không hợp lệ ở cuối
  const cleanDate = dateString.trim().replace(/h$/i, '')
  return new Date(cleanDate).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export const formatHourDate = (dateString) => {
  const date = new Date(dateString)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${hours}:${minutes}, ${day}/${month}/${year}`
}

export const formatTime = (date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export const uploadImage = async (file, folderName, subFolder = '') => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  if (subFolder) folderName += `/${subFolder}`
  formData.append('folder', folderName)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(
      `Image upload failed: ${res.status} ${res.statusText}` +
        (errorData.error && errorData.error.message ? ` - ${errorData.error.message}` : '')
    )
  }

  const data = await res.json()
  if (!data.secure_url) {
    throw new Error('Image upload failed: secure_url not found in response.')
  }
  return data.secure_url
}

export const getStatusColor = (status) => {
  switch (status) {
    case 'ONGOING':
      return 'bg-blue-100 text-blue-800'
    case 'COMPLETED':
      return 'bg-green-100 text-green-800 '
    case 'OVERDUE':
      return 'bg-red-100 text-red-800'
    case 'CANCELLED':
      return 'bg-gray-100 text-gray-800'
    case 'CONFIRM':
      return 'bg-blue-100 text-blue-800'
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800'
    case 'PENDING_FEE':
      return 'bg-orange-200 text-orange-800'
    case 'FAILED':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
