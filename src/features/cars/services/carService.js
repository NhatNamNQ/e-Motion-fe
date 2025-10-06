import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const carService = {
  getCars: async () => {
    try {
      const { data } = await instance.get('/vehicles')
      return data
    } catch (error) {
      handleError(error)
    }
  },
  searchCars: async (searchValues) => {
    try {
      const { data } = await instance.post('/vehicles/search', searchValues)
      return data
    } catch (error) {
      handleError(error)
    }
  }
}
