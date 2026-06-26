import { useState } from 'react'
import EventCard from '../features/events/components/EventCard'
import CheckoutModal from '../features/events/components/CheckoutModal'
import { useCategories } from '../features/events/hooks/useCategories'
import { useEvents } from '../features/events/hooks/useEvents'

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [checkoutEvent, setCheckoutEvent] = useState(null)

  const { data: categoriesData = [], isLoading: isLoadingCategories } = useCategories()
  
  const { data: events = [], isLoading: isLoadingEvents } = useEvents({
    categoryId: selectedCategory === 'All' ? undefined : selectedCategory,
    search: searchQuery,
  })

  const isLoading = isLoadingEvents || isLoadingCategories

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-50 border border-charcoal-light/20 rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder-charcoal-light focus:outline-none focus:border-coral transition-colors"
              />
            </div>
            
            <hr className="border-charcoal-light/5" />
            
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-3">Categories</h3>
              <div className="flex flex-col gap-2">
                {isLoadingCategories ? (
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-9 bg-stone-100 rounded-xl animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedCategory('All')}
                      className={`text-left text-sm px-3 py-2 rounded-xl transition-all font-bold cursor-pointer ${
                        selectedCategory === 'All'
                          ? 'bg-coral text-white border border-coral shadow-md shadow-coral/10'
                          : 'text-charcoal-light hover:bg-stone-50 hover:text-charcoal border border-transparent'
                      }`}
                    >
                      All
                    </button>
                    {categoriesData.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`text-left text-sm px-3 py-2 rounded-xl transition-all font-bold cursor-pointer ${
                          selectedCategory === cat.id
                            ? 'bg-coral text-white border border-coral shadow-md shadow-coral/10'
                            : 'text-charcoal-light hover:bg-stone-50 hover:text-charcoal border border-transparent'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </>
                )}
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
          ) : events.length === 0 ? (
            <div className="p-16 text-center bg-white border border-charcoal-light/10 rounded-3xl">
              <span className="text-4xl">🔍</span>
              <h3 className="text-lg font-bold text-charcoal mt-4">Event tidak ditemukan</h3>
              <p className="text-charcoal-light text-sm mt-1">
                Tidak ada event aktif yang sesuai dengan kriteria filter atau pencarian Anda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map(event => (
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
