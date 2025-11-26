import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const reservationService = {
  getReservationById: async (id) => {
    try {
      const { data } = await instance.get(`/reservations/${id}`)
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
  },
  cancelReservation: async (code, isRefunded) => {
    try {
      const { data } = await instance.post(`/reservations/manage/${code}/cancel`, isRefunded)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  }
}
