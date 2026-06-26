import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEventDetail } from '../features/events/hooks/useEvents'
import { useCurrency } from '../shared/context/CurrencyContext'
import CheckoutModal from '../features/events/components/CheckoutModal'

export default function EventDetail() {
  const { id } = useParams()
  const { formatPrice } = useCurrency()
  const [showCheckout, setShowCheckout] = useState(false)

  const { data: event, isLoading, error } = useEventDetail(id)

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-coral/30 border-t-coral rounded-full animate-spin mx-auto" />
        <p className="text-charcoal-light text-sm">Memuat detail event...</p>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <span className="text-4xl">⚠️</span>
        <h3 className="text-lg font-bold text-charcoal">Event tidak ditemukan</h3>
        <p className="text-charcoal-light text-sm">Event yang Anda cari tidak tersedia atau telah dihapus.</p>
        <Link to="/events" className="inline-block bg-coral hover:bg-coral-light text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-md shadow-coral/10">
          Kembali ke Jelajah Event
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-stone-50 space-y-8">
      {/* Back Button */}
      <Link to="/events" className="inline-flex items-center gap-2 text-charcoal-light hover:text-coral font-bold text-sm transition-colors">
        ← Kembali ke Jelajah Event
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Banner & Info */}
        <div className="lg:col-span-8 space-y-6">
          {/* Banner Card */}
          <div className="relative h-96 rounded-3xl overflow-hidden border border-charcoal-light/10 shadow-lg bg-white">
            <img
              src={event.banner || event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60'}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-coral border border-charcoal-light/10 shadow-sm">
              {event.category?.name || 'Uncategorized'}
            </span>
          </div>

          {/* Details & description */}
          <div className="bg-white p-8 rounded-3xl border border-charcoal-light/10 shadow-sm space-y-6">
            <h1 className="text-3xl font-extrabold text-charcoal leading-tight">
              {event.title}
            </h1>
            
            <hr className="border-charcoal-light/5" />

            <div className="space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-charcoal-light">Tentang Event</h3>
              <p className="text-charcoal-light text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Info & Organizer */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Details Card */}
          <div className="bg-white p-6 rounded-3xl border border-charcoal-light/10 shadow-md space-y-5">
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 text-sm text-charcoal-light">
                <span className="text-lg">📅</span>
                <div>
                  <div className="font-bold text-charcoal text-xs uppercase tracking-wider">Tanggal</div>
                  <div className="mt-0.5 font-medium">{event.date}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-charcoal-light">
                <span className="text-lg">⏰</span>
                <div>
                  <div className="font-bold text-charcoal text-xs uppercase tracking-wider">Waktu</div>
                  <div className="mt-0.5 font-medium">{event.time}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-charcoal-light">
                <span className="text-lg">📍</span>
                <div>
                  <div className="font-bold text-charcoal text-xs uppercase tracking-wider">Lokasi</div>
                  <div className="mt-0.5 font-medium">{event.location}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-charcoal-light">
                <span className="text-lg">🎟️</span>
                <div>
                  <div className="font-bold text-charcoal text-xs uppercase tracking-wider">Kuota Sisa</div>
                  <div className="mt-0.5 font-medium"><strong className="text-charcoal">{event.available_tickets}</strong> tiket tersedia</div>
                </div>
              </div>
            </div>

            <hr className="border-charcoal-light/5" />

            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] text-charcoal-light uppercase tracking-wider font-semibold">Harga Tiket</span>
                <p className="text-charcoal font-black text-2xl mt-0.5">{formatPrice(event.price)}</p>
              </div>
              
              <button
                onClick={() => setShowCheckout(true)}
                disabled={event.available_tickets <= 0 || event.status !== 'published'}
                className="bg-coral hover:bg-coral-light disabled:bg-stone-200 disabled:text-stone-400 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-coral/10 hover:shadow-coral/20 cursor-pointer"
              >
                {event.status !== 'published' ? 'Draft' : event.available_tickets <= 0 ? 'Habis' : 'Beli Tiket'}
              </button>
            </div>
          </div>

          {/* Organizer Card */}
          <div className="bg-white p-6 rounded-3xl border border-charcoal-light/10 shadow-sm space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-charcoal-light">Penyelenggara</span>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-coral/10 text-coral flex items-center justify-center font-bold text-lg border border-coral/20">
                {(event.organizer?.profile?.full_name || event.organizer?.email || 'O')[0].toUpperCase()}
              </div>
              <div>
                <h4 className="text-sm font-bold text-charcoal leading-tight">
                  {event.organizer?.profile?.full_name || 'Organizer'}
                </h4>
                <p className="text-[11px] text-charcoal-light mt-0.5">
                  {event.organizer?.email}
                </p>
              </div>
            </div>
            {event.organizer?.profile?.bio && (
              <p className="text-xs text-charcoal-light leading-relaxed bg-stone-50 p-3 rounded-xl border border-charcoal-light/5">
                {event.organizer.profile.bio}
              </p>
            )}
          </div>
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal
          event={event}
          onClose={() => setShowCheckout(false)}
          onSuccess={(newTicket) => {
            const saved = localStorage.getItem('eventra_booked_tickets')
            const tickets = saved ? JSON.parse(saved) : []
            tickets.unshift(newTicket)
            localStorage.setItem('eventra_booked_tickets', JSON.stringify(tickets))
            console.log('Ticket booked and saved:', newTicket)
          }}
        />
      )}
    </div>
  )
}
