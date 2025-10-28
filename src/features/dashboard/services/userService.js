import instance from '@/lib/axios'
import { handleError } from '@/lib/handleError'

export const userService = {
  getUsers: async (page, limit, blockedList, roleList, search) => {
    try {
      const { data } = await instance.post('users/filter', {
        page: page,
        limit: limit,
        blockedList: blockedList,
        roleList: roleList,
        search: search
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
  },
  toggleStatusUser: async (userEmail) => {
    try {
      await instance.get(`users/admin/toggle-status/${userEmail}`)
    } catch (error) {
      throw handleError(error)
    }
  },
  deleteUser: async (userEmail) => {
    try {
      await instance.delete(`users/admin/delete/${userEmail}`)
    } catch (error) {
      throw handleError(error)
    }
  },
  editUser: async (userData) => {
    try {
      const { data } = await instance.post('users/admin/update-user', {
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
