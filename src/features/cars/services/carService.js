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
      const [availableRes, unavailableRes] = await Promise.all([
        instance.post('/vehicles/filter/available', searchValues),
        instance.post('/vehicles/filter/unavailable', searchValues)
      ])

      return {
        data: {
          content: {
            availableVehicles: availableRes.data.data.content || [],
            unavailableVehicles: unavailableRes.data.data.content || []
          },
          totalPages: Math.max(
            availableRes.data.data.totalPages || 1,
            unavailableRes.data.data.totalPages || 1
          )
        }
      }
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
  },
  getCarQuantityEachStatusOfStation: async (stationId) => {
    try {
      const { data } = await instance.get(`/vehicles/status/${stationId}`)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  }
}
