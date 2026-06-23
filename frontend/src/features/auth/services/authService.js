import { apiClient } from '../../../shared/api'

export const loginAPI = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password })
  return response.data
}

export const registerAPI = async (data) => {
  const response = await apiClient.post('/auth/register', data)
  return response.data
}

export const logoutAPI = async (refreshToken) => {
  const response = await apiClient.post('/auth/logout', { refresh_token: refreshToken })
  return response.data
}

export const getProfileAPI = async () => {
  const response = await apiClient.get('/users/me')
  return response.data
}

export const updateProfileAPI = async (data) => {
  const response = await apiClient.patch('/users/me', data)
  return response.data
}
