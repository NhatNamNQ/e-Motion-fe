import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const checkListService = {
  getCheckLists: async (filterParams = {}) => {
    try {
      const { data } = await instance.post('/rental-checklists/filter', {
        type: filterParams.type || [],
        page: filterParams.page || 0,
        limit: filterParams.limit || 0,
        search: filterParams.search || ''
      })
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  getCheckListDetail: async (id) => {
    try {
      const { data } = await instance.get(`/rental-checklists/rentalId`, {
        params: {
          rentalId: id
        }
      })
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
  },
  createCheckOut: async (formData) => {
    try {
      const { data } = await instance.post(`/rental-checklists`, formData)
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  }
}
