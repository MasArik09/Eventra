import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchEvents,
  fetchManagedEvents,
  fetchEventDetail,
  createEventAPI,
  updateEventAPI,
  deleteEventAPI,
  publishEventAPI,
  cancelEventAPI,
} from '../services/eventService'

export function useEvents(filters = {}) {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: () => fetchEvents(filters),
  })
}

export function useManagedEvents() {
  return useQuery({
    queryKey: ['managed_events'],
    queryFn: fetchManagedEvents,
  })
}

export function useEventDetail(id) {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => fetchEventDetail(id),
    enabled: !!id,
  })
}

export function useCreateEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createEventAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      queryClient.invalidateQueries({ queryKey: ['managed_events'] })
    },
  })
}

export function useUpdateEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateEventAPI,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      queryClient.invalidateQueries({ queryKey: ['managed_events'] })
      queryClient.invalidateQueries({ queryKey: ['event', variables.id] })
    },
  })
}

export function useDeleteEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteEventAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      queryClient.invalidateQueries({ queryKey: ['managed_events'] })
    },
  })
}

export function usePublishEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: publishEventAPI,
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      queryClient.invalidateQueries({ queryKey: ['managed_events'] })
      queryClient.invalidateQueries({ queryKey: ['event', id] })
    },
  })
}

export function useCancelEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cancelEventAPI,
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      queryClient.invalidateQueries({ queryKey: ['managed_events'] })
      queryClient.invalidateQueries({ queryKey: ['event', id] })
    },
  })
}
