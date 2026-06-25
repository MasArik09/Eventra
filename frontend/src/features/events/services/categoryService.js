import { apiClient } from '../../../shared/api'

export const fetchCategories = async () => {
  const response = await apiClient.get('/categories')
  return response.data.data
}
