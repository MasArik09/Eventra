import { Link } from 'react-router-dom'
import { useCurrency } from '../../../shared/context/CurrencyContext'
import { usePublishEvent, useCancelEvent, useDeleteEvent } from '../../events/hooks/useEvents'

export default function EventTable({ events, isLoading }) {
  const { formatPrice } = useCurrency()
  const { mutate: publishEvent } = usePublishEvent()
  const { mutate: cancelEvent } = useCancelEvent()
  const { mutate: deleteEvent } = useDeleteEvent()

  const handlePublish = (id, title) => {
    if (confirm(`Apakah Anda yakin ingin menerbitkan event "${title}"?`)) {
      publishEvent(id)
    }
  }

  const handleCancel = (id, title) => {
    if (confirm(`Apakah Anda yakin ingin membatalkan event "${title}"?`)) {
      cancelEvent(id)
    }
  }

  const handleDelete = (id, title) => {
    if (confirm(`PERINGATAN: Apakah Anda yakin ingin menghapus event "${title}" secara permanen?`)) {
      deleteEvent(id)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-stone-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (!events || events.length === 0) {
    return (
      <div className="p-12 text-center bg-stone-50/50 rounded-3xl border border-dashed border-charcoal-light/10">
        <span className="text-3xl">📅</span>
        <h3 className="text-sm font-bold text-charcoal mt-3">Belum ada event yang dikelola</h3>
        <p className="text-charcoal-light text-xs mt-1">Klik "+ Buat Event Baru" untuk memulainya.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-charcoal">
        <thead>
          <tr className="border-b border-charcoal-light/10 text-charcoal-light text-xs uppercase font-semibold">
            <th className="pb-4 pr-4">Banner</th>
            <th className="pb-4 pr-4">Judul Event</th>
            <th className="pb-4 pr-4">Tanggal & Waktu</th>
            <th className="pb-4 pr-4">Kategori</th>
            <th className="pb-4 pr-4">Harga</th>
            <th className="pb-4 pr-4">Kuota Tiket</th>
            <th className="pb-4 pr-4">Status</th>
            <th className="pb-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-charcoal-light/5">
          {events.map((event) => (
            <tr key={event.id} className="hover:bg-stone-50/50 transition-colors">
              <td className="py-4 pr-4">
                <div className="w-16 h-10 rounded-lg overflow-hidden border border-charcoal-light/5 bg-stone-100 flex-shrink-0">
                  {event.banner ? (
                    <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs opacity-40">🖼️</div>
                  )}
                </div>
              </td>
              <td className="py-4 pr-4 font-bold text-charcoal">
                <Link to={`/events/${event.id}`} className="hover:text-coral transition-colors line-clamp-1">
                  {event.title}
                </Link>
              </td>
              <td className="py-4 pr-4 text-xs text-charcoal-light">
                <div>📅 {event.date}</div>
                <div className="mt-0.5">⏰ {event.time}</div>
              </td>
              <td className="py-4 pr-4">
                <span className="px-2 py-0.5 bg-stone-100 rounded-lg text-xs font-semibold text-charcoal-light">
                  {event.category?.name || 'N/A'}
                </span>
              </td>
              <td className="py-4 pr-4 font-semibold">{formatPrice(event.price)}</td>
              <td className="py-4 pr-4 text-xs">
                <span className="font-bold text-charcoal">{event.available_tickets}</span> kuota
              </td>
              <td className="py-4 pr-4">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  event.status === 'published'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : event.status === 'cancelled'
                    ? 'bg-red-50 text-red-800 border-red-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  {event.status === 'published' ? 'Active' : event.status === 'cancelled' ? 'Cancelled' : 'Draft'}
                </span>
              </td>
              <td className="py-4 text-right space-x-1.5 whitespace-nowrap">
                <Link
                  to={`/dashboard/events/${event.id}/edit`}
                  className="inline-block bg-stone-100 hover:bg-stone-200 border border-charcoal-light/10 text-charcoal text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  Edit
                </Link>
                {event.status === 'draft' && (
                  <button
                    onClick={() => handlePublish(event.id, event.title)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Publish
                  </button>
                )}
                {event.status === 'published' && (
                  <button
                    onClick={() => handleCancel(event.id, event.title)}
                    className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={() => handleDelete(event.id, event.title)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
