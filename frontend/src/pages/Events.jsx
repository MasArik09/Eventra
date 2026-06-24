import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import EventCard from '../features/events/components/EventCard'
import CheckoutModal from '../features/events/components/CheckoutModal'

const DUMMY_EVENTS = [
  {
    id: 1,
    title: "Symphony of Lights & Sound",
    date: "June 25, 2026",
    time: "7:00 PM - 11:00 PM",
    location: "Jakarta Amphitheater",
    category: "Music Concert",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Glow Symphony Inc.",
    availableTickets: 120,
  },
  {
    id: 2,
    title: "Global Tech Summit 2026",
    date: "July 12-14, 2026",
    time: "9:00 AM - 5:00 PM",
    location: "Bandung Convention Center",
    category: "Technology",
    price: 0,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Tech Pioneers",
    availableTickets: 450,
  },
  {
    id: 3,
    title: "Mastering Gastronomy: Culinary Workshop",
    date: "August 05, 2026",
    time: "10:00 AM - 2:00 PM",
    location: "Epicurean Studio, Bali",
    category: "Food & Culinary",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Chef Culinary Lab",
    availableTickets: 25,
  },
]

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [checkoutEvent, setCheckoutEvent] = useState(null)

  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 600))
      return DUMMY_EVENTS
    }
  })

  const filteredEvents = events?.filter(event => 
    selectedCategory === 'All' || event.category === selectedCategory
  )

  const categories = ['All', 'Music Concert', 'Technology', 'Food & Culinary']

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-stone-50">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-charcoal">Explore Events</h1>
        <p className="text-charcoal-light mt-1">Discover, book, and enjoy the best events happening soon.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Sidebar Filter */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-charcoal-light/10 space-y-5 shadow-sm">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-3">Search</h3>
              <input
                type="text"
                placeholder="Search keywords..."
                className="w-full bg-stone-50 border border-charcoal-light/20 rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder-charcoal-light focus:outline-none focus:border-coral transition-colors"
              />
            </div>
            
            <hr className="border-charcoal-light/5" />
            
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-3">Categories</h3>
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left text-sm px-3 py-2 rounded-xl transition-all font-bold cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-coral text-white border border-coral shadow-md shadow-coral/10'
                        : 'text-charcoal-light hover:bg-stone-50 hover:text-charcoal border border-transparent'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column Grid of Events */}
        <section className="lg:col-span-9">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <div key={i} className="animate-pulse rounded-2xl border border-charcoal-light/10 overflow-hidden bg-white">
                  <div className="h-48 bg-stone-100" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-stone-100 rounded w-1/4" />
                    <div className="h-6 bg-stone-100 rounded w-3/4" />
                    <div className="h-4 bg-stone-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents?.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onBook={() => setCheckoutEvent(event)}
                />
              ))}
            </div>
          )}
        </section>

      </div>

      {checkoutEvent && (
        <CheckoutModal
          event={checkoutEvent}
          onClose={() => setCheckoutEvent(null)}
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
