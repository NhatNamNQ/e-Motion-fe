import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const reservationService = {
  getReservationByCode: async (code) => {
    try {
      const res = await instance.get(`/reservations/${code}`)
      return res.data.data
    } catch (error) {
      throw handleError(error)
    }
  }
}
