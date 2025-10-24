import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const reservationService = {
  getReservationByCode: async (code) => {
    try {
      const { data } = await instance.get(`/reservations/${code}`)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  getAllReservations: async () => {
    try {
      const { data } = await instance.get('/reservations')
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  searchReservations: async (query) => {
    try {
      const { data } = await instance.get('/reservations/search', {
        params: query
      })
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  }
}
