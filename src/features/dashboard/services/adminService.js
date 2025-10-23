import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const adminService = {
  geDataDashboard: async () => {
    try {
      const { data } = await instance.get('users/admin-dashboard')
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  }
}
