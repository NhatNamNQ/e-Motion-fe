import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth'

export const loginUser = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, {
    email: credentials.email,
    password: credentials.password
  })
  return res.data
}

export const registerUser = async (credentials) => {
  const res = await axios.post(`${API_URL}/register`, {
    email: credentials.email,
    userPassword: credentials.password,
    fullName: credentials.fullName,
    phone: credentials.phone
  })

  return res.data
}

export const verifyOtp = async (credentials) => {
  const res = await axios.post(`${API_URL}/verify`, {
    email: credentials.email,
    verificationCode: credentials.verificationCode
  })
  return res.data
}
