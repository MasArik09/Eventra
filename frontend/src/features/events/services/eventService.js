import { apiClient } from '../../../shared/api'

export const fetchEvents = async ({
  categoryId,
  search,
  page,
  pageSize,
  dateFrom,
  dateTo,
  priceMin,
  priceMax,
  isFree,
  ordering
} = {}) => {
  const params = {}
  if (categoryId && categoryId !== 'All') {
    params.category = categoryId
  }
  if (search) {
    params.search = search
  }
  if (page) {
    params.page = page
  }
  if (pageSize) {
    params.page_size = pageSize
  }
  if (dateFrom) {
    params.date_from = dateFrom
  }
  if (dateTo) {
    params.date_to = dateTo
  }
  if (priceMin !== undefined && priceMin !== '') {
    params.price_min = priceMin
  }
  if (priceMax !== undefined && priceMax !== '') {
    params.price_max = priceMax
  }
  if (isFree !== undefined && isFree !== null) {
    params.is_free = isFree
  }
  if (ordering) {
    params.ordering = ordering
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
