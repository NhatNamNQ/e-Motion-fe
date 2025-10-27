import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const userService = {
  getUsers: async (page, limit, statusList, roleList) => {
    try {
      const { data } = await instance.post('users/filter', {
        page: page,
        limit: limit,
        blockedList: statusList,
        roleList: roleList
      })
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  },
  addUser: async (userData) => {
    try {
      const { data } = await instance.post('users/admin/create-user', {
        fullName: userData.fullName,
        phone: userData.phone,
        email: userData.email,
        password: userData.password,
        role: userData.role
      })
      return data.data
    } catch (error) {
      throw handleError(error)
    }
  }
}
