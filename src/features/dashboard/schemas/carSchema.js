import { z } from 'zod'

export const carSchema = z.object({
  name: z.string().min(1, 'Tên xe là bắt buộc'),
  description: z.string().min(1, 'Mô tả là bắt buộc'),
  brand: z.string().min(1, 'Hãng xe là bắt buộc'),
  category: z.string().min(1, 'Loại xe là bắt buộc'),
  seats: z.number().min(1, 'Số ghế phải lớn hơn 0'),
  pricePer4Hours: z.number().min(0, 'Giá 4 giờ phải >= 0'),
  pricePer8Hours: z.number().min(0, 'Giá 8 giờ phải >= 0'),
  pricePer12Hours: z.number().min(0, 'Giá 12 giờ phải >= 0'),
  pricePerDay: z.number().min(0, 'Giá 1 ngày phải >= 0'),
  depositFee: z.number().min(0, 'Tiền đặt cọc phải >= 0'),
  point: z.number().min(0, 'Điểm phải >= 0'),
  consumptionRate: z.number().min(0, 'Mức tiêu thụ phải >= 0'),
  batteryLevel: z.number().min(0).max(100, 'Mức pin phải từ 0-100'),
  batteryCapacity: z.number().min(0, 'Dung lượng pin phải >= 0'),
  plateNumber: z.string().min(1, 'Biển số xe là bắt buộc'),
  stationId: z.number().min(1, 'Trạm là bắt buộc'),
  images: z.array(z.any()).optional()
})
