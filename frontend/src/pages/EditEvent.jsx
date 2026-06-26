import { useParams, useNavigate } from 'react-router-dom'
import { useEventDetail, useUpdateEvent } from '../features/events/hooks/useEvents'
import EventForm from '../features/events/components/EventForm'

export default function EditEvent() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const { data: event, isLoading: isLoadingEvent, error: loadError } = useEventDetail(id)
  const { mutate: updateEvent, isLoading: isUpdating, error: updateError } = useUpdateEvent()

  const handleSubmit = (formData) => {
    updateEvent(
      { id, formData },
      {
        onSuccess: () => {
          navigate('/dashboard')
        },
      }
    )
  }

  if (isLoadingEvent) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-coral/30 border-t-coral rounded-full animate-spin mx-auto" />
        <p className="text-charcoal-light text-sm">Memuat data event...</p>
      </div>
    )
  }

  if (loadError || !event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <span className="text-4xl">⚠️</span>
        <h3 className="text-lg font-bold text-charcoal">Gagal memuat event</h3>
        <p className="text-charcoal-light text-sm">Event tidak ditemukan atau terjadi kesalahan koneksi.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-stone-50 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-charcoal">Edit Event</h1>
        <p className="text-charcoal-light mt-1">Ubah rincian detail event "{event.title}" di bawah ini.</p>
      </div>

      {(loadError || updateError) && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          ⚠️ {updateError?.response?.data?.message || updateError?.message || 'Gagal menyimpan perubahan.'}
        </div>
      )}

      <EventForm initialData={event} onSubmit={handleSubmit} loading={isUpdating} />
    </div>
  )
}
