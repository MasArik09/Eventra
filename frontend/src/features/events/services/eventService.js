import { apiClient } from '../../../shared/api'

export const fetchEvents = async ({ categoryId, search } = {}) => {
  const params = {}
  if (categoryId && categoryId !== 'All') {
    params.category = categoryId
  }
  if (search) {
    params.search = search
  }
  const response = await apiClient.get('/events', { params })
  return response.data.data
}

export const fetchManagedEvents = async () => {
  const response = await apiClient.get('/events/managed')
  return response.data.data
}

export const fetchEventDetail = async (id) => {
  const response = await apiClient.get(`/events/${id}`)
  return response.data.data
}

export const createEventAPI = async (formData) => {
  const response = await apiClient.post('/events', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data.data
}

export const updateEventAPI = async ({ id, formData }) => {
  const response = await apiClient.patch(`/events/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data.data
}

export const deleteEventAPI = async (id) => {
  const response = await apiClient.delete(`/events/${id}`)
  return response.data
}

export const publishEventAPI = async (id) => {
  const response = await apiClient.post(`/events/${id}/publish`)
  return response.data.data
}

export const cancelEventAPI = async (id) => {
  const response = await apiClient.post(`/events/${id}/cancel`)
  return response.data.data
}
