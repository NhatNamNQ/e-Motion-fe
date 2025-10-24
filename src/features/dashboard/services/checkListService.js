import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const checkListService = {
  getCheckList: async () => {
    try {
      const { data } = await instance.get('/rental-checklists')
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  createCheckIn: async (formData) => {
    try {
      const { data } = await instance.post(`/rental-checklists`, formData)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  }
}
