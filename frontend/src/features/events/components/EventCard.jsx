import { Link } from 'react-router-dom'

export default function EventCard({ event }) {
  return (
    <div className="rounded-2xl border border-charcoal-light/10 overflow-hidden bg-white hover:border-coral/30 hover:shadow-md transition-all flex flex-col group shadow-sm">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-semibold text-coral border border-charcoal-light/10">
          {event.category}
        </span>
      </div>
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <div className="text-coral text-xs font-bold mb-1.5 flex items-center gap-1.5">
            📅 {event.date}
          </div>
          <h3 className="text-xl font-bold text-charcoal mb-2 group-hover:text-coral transition-colors">
            {event.title}
          </h3>
          <p className="text-charcoal-light text-xs mb-1">⏰ {event.time}</p>
          <p className="text-charcoal-light text-xs mb-4">📍 {event.location}</p>
        </div>
        <div className="border-t border-charcoal-light/5 pt-4 flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-charcoal-light text-[10px] uppercase tracking-wider font-semibold">Price</span>
            <span className="text-charcoal font-extrabold text-lg">{event.price}</span>
          </div>
          <button className="bg-coral hover:bg-coral-light text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer">
            Book Ticket
          </button>
        </div>
      </div>
    </div>
  )
}
