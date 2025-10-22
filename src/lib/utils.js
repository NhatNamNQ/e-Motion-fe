import { clsx } from 'clsx'
import { format, parse } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (price, currency = 'VND') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(price)
}

export const formatDate = (date, inputFormat = 'dd/MM/yyyy', outputFormat = 'yyyy-MM-dd') => {
  const dateObject = parse(date, inputFormat, new Date())
  return format(dateObject, outputFormat)
}

export const uploadImage = async (file, folderName) => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
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
