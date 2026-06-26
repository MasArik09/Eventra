import { useNavigate } from 'react-router-dom'
import { useCreateEvent } from '../features/events/hooks/useEvents'
import EventForm from '../features/events/components/EventForm'

export default function CreateEvent() {
  const navigate = useNavigate()
  const { mutate: createEvent, isLoading, error } = useCreateEvent()

  const handleSubmit = (formData) => {
    createEvent(formData, {
      onSuccess: () => {
        navigate('/dashboard')
      },
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-stone-50 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-charcoal">Buat Event Baru</h1>
        <p className="text-charcoal-light mt-1">Lengkapi formulir di bawah ini untuk membuat event draft baru.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          ⚠️ {error.response?.data?.message || error.message || 'Gagal menyimpan event. Silakan periksa kembali data Anda.'}
        </div>
      )}

      <EventForm onSubmit={handleSubmit} loading={isLoading} />
    </div>
  )
}
