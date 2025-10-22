import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const bookingService = {
  bookReservation: async (bookingInfo) => {
    try {
      const { data } = await instance.post('/reservations', bookingInfo)
      return data
    } catch (error) {
      throw handleError(error)
    }
  }
}
