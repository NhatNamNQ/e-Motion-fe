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
  getReservations: async (filterParams = {}) => {
    try {
      const { data } = await instance.post('/reservations/filter', {
        status: filterParams.status || [],
        page: filterParams.page || 0,
        limit: filterParams.limit || 10,
        search: filterParams.keyword || ''
      })
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  }
}
