import { z } from 'zod'

export const carSchema = z.object({
  name: z.string().min(1, 'Tên xe không được để trống'),
  description: z.string().min(1, 'Mô tả không được để trống'),
  brand: z.string().min(1, 'Hãng xe là bắt buộc'),
  category: z.string().min(1, 'Loại xe là bắt buộc'),
  seats: z.number({ invalid_type_error: 'Số ghế phải là số' }).positive('Số ghế phải lớn hơn 0'),
  pricePer4Hours: z.number({ invalid_type_error: 'Giá phải là số' }).positive('Giá phải lớn hơn 0'),
  depositFee: z
    .number({ invalid_type_error: 'Tiền đặt cọc phải là số' })
    .positive('Tiền đặt cọc phải lớn hơn 0'),
  point: z
    .number({ invalid_type_error: 'Điểm giảm giá phải là số' })
    .positive('Điểm giảm giá phải lớn hơn 0'),
  consumptionRate: z
    .number({ invalid_type_error: 'Mức tiêu thụ phải là số' })
    .positive('Mức tiêu thụ phải lớn hơn 0'),
  batteryLevel: z
    .number({ invalid_type_error: 'Mức pin phải là số' })
    .min(0, 'Mức pin không được nhỏ hơn 0')
    .max(100, 'Mức pin không được lớn hơn 100'),
  batteryCapacity: z
    .number({ invalid_type_error: 'Dung lượng pin phải là số' })
    .positive('Dung lượng pin phải lớn hơn 0'),
  plateNumber: z.string().min(1, 'Biển số xe không được để trống'),
  stationId: z.number({ invalid_type_error: 'Trạm là bắt buộc' })
})
