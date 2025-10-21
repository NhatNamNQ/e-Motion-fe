import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const carService = {
  getCars: async () => {
    try {
      const { data } = await instance.get('/vehicles')
      return data
    } catch (error) {
      throw handleError(error)
    }
  },
  getCarById: async (id) => {
    try {
      const { data } = await instance.get(`/vehicles/id/${id}`)
      return data
    } catch (error) {
      throw handleError(error)
    }
  },
  searchCars: async (searchValues) => {
    try {
      const { data } = await instance.post('/vehicles/search', searchValues)
      return data
    } catch (error) {
      throw handleError(error)
    }
  },
  calculateFees: async ({ id, startTime, endTime }) => {
    try {
      const { data } = await instance.get('/vehicles/booking', {
        params: {
          id,
          startTime,
          endTime
        }
      })
      return data
    } catch (error) {
      throw handleError(error)
    }
  }
}
