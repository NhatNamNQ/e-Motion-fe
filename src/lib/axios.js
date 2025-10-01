import axios from 'axios'

let isRefreshing = false
let failedQueue = []
const publicPaths = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/forgot-password']

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

instance.interceptors.request.use(
  (config) => {
    if (publicPaths.includes(config.url)) return config
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (!error.response) {
      console.error('Network error:', error.message)
      return Promise.reject({
        message: 'Failed to connect internet. Please check your internet',
        type: 'NETWORK_ERROR'
      })
    }

    if (error.response?.data?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return instance(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true
      try {
        const res = await instance.post('/auth/refresh')
        const newAccessToken = res.data.data.token
        localStorage.setItem('accessToken', newAccessToken)
        processQueue(null, newAccessToken)
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return instance(originalRequest)
      } catch (error) {
        processQueue(error, null)
        localStorage.removeItem('accessToken')
        window.location.href = '/auth/login'
        return Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)
export default instance
