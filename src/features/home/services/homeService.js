import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const homeService = {
  getCars: async () => {
    try {
      const { data } = await instance.get('/vehicles/home')
      return data
    } catch (error) {
      throw handleError(error)
    }
  }
}
