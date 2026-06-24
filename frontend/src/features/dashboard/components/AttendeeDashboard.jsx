import { Link } from 'react-router-dom'
import { useCurrency } from '../../../shared/context/CurrencyContext'

export default function AttendeeDashboard({ user, myTickets, onDownloadTicket, activeTab, setActiveTab }) {
  const { currency, setCurrency, formatPrice } = useCurrency()

  // Dynamically calculate total spent from ticket prices
  const totalSpent = myTickets.reduce((sum, ticket) => {
    let amt = ticket.price
    if (typeof amt === 'string') {
      const clean = amt.replace(/[^0-9.]/g, '')
      amt = parseFloat(clean)
    }
    return isNaN(amt) ? sum : sum + amt
  }, 0)

  // Ensure activeTab is valid for attendee, else fallback to Overview
  const tabs = ['Overview', 'Settings']
  const currentTab = tabs.includes(activeTab) ? activeTab : 'Overview'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Dashboard Navigation Sidebar */}
      <aside className="lg:col-span-3">
        <div className="p-5 rounded-2xl bg-white border border-charcoal-light/10 flex flex-row lg:flex-col gap-1 overflow-x-auto shadow-sm">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left text-sm px-4 py-2.5 rounded-xl transition-all whitespace-nowrap lg:w-full font-bold cursor-pointer ${
                currentTab === tab
                  ? 'bg-coral text-white shadow-md shadow-coral/10'
                  : 'text-charcoal-light hover:bg-stone-50 hover:text-charcoal'
              }`}
            >
              {tab === 'Overview' ? '🎟️ Overview' : '⚙️ Settings'}
            </button>
          ))}
        </div>
      </aside>

      {/* Right Column: Dashboard Dynamic Panel */}
      <main className="lg:col-span-9 space-y-8">
        
        {currentTab === 'Overview' && (
          <>
            {/* Welcome Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-coral/10 to-charcoal/5 border border-charcoal-light/10 rounded-3xl p-8 mb-10 shadow-sm">
              <div className="relative z-10 max-w-2xl">
                <span className="text-xs font-extrabold uppercase tracking-wider text-coral px-3 py-1 rounded-full bg-coral/10 border border-coral/20">
                  🎫 Attendee Hub
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal mt-3">
                  Welcome back, {user?.profile?.full_name || 'Valued Guest'}!
                </h1>
                <p className="text-charcoal-light text-sm sm:text-base mt-2 leading-relaxed">
                  Explore your active bookings, access your digital entry passes, and manage your ticket transaction histories.
                </p>
              </div>
              <div className="absolute right-[-10%] top-[-20%] w-[300px] h-[300px] bg-coral/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Quick Analytics / Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="bg-white border border-charcoal-light/10 rounded-2xl p-6 shadow-sm flex items-center gap-4 hover:border-coral/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-coral/10 text-coral flex items-center justify-center text-xl font-bold border border-coral/20">
                  🎟️
                </div>
                <div>
                  <span className="text-xs text-charcoal-light uppercase font-bold tracking-wider">Active Passes</span>
                  <h3 className="text-2xl font-black text-charcoal mt-0.5">{myTickets.filter(t => t.status === 'unused').length} Passes</h3>
                </div>
              </div>

              <div className="bg-white border border-charcoal-light/10 rounded-2xl p-6 shadow-sm flex items-center gap-4 hover:border-coral/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-charcoal/5 text-charcoal flex items-center justify-center text-xl font-bold border border-charcoal-light/10">
                  ✨
                </div>
                <div>
                  <span className="text-xs text-charcoal-light uppercase font-bold tracking-wider">Membership Level</span>
                  <h3 className="text-2xl font-black text-coral mt-0.5">Silver Tier</h3>
                </div>
              </div>

              <div className="bg-white border border-charcoal-light/10 rounded-2xl p-6 shadow-sm flex items-center gap-4 hover:border-coral/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold border border-emerald-100">
                  💳
                </div>
                <div>
                  <span className="text-xs text-charcoal-light uppercase font-bold tracking-wider">Total Spent</span>
                  <h3 className="text-2xl font-black text-charcoal mt-0.5">{formatPrice(totalSpent)}</h3>
                </div>
              </div>
            </div>

            {/* Tickets and Bookings Feed */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-charcoal-light/10 pb-4">
                <h2 className="text-2xl font-extrabold text-charcoal">My Digital Tickets</h2>
                <Link to="/events" className="text-coral hover:text-coral-light font-bold text-sm transition-colors">
                  + Discover More Events
                </Link>
              </div>

              {myTickets.length === 0 ? (
                <div className="p-16 text-center bg-white border border-dashed border-charcoal-light/20 rounded-3xl">
                  <span className="text-4xl">🎫</span>
                  <h3 className="text-lg font-bold text-charcoal mt-4">No tickets purchased yet</h3>
                  <p className="text-charcoal-light text-sm mt-1 max-w-sm mx-auto">
                    Once you book a ticket, your digital entry pass and scanned check-in status will show up here.
                  </p>
                  <Link to="/events" className="inline-block bg-coral hover:bg-coral-light text-white font-bold text-sm px-6 py-3 rounded-xl mt-6 transition-all shadow-md shadow-coral/10">
                    Explore Events
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {myTickets.map(ticket => (
                    <div 
                      key={ticket.id} 
                      className={`bg-white border border-charcoal-light/10 rounded-3xl overflow-hidden shadow-md flex flex-col md:flex-row items-stretch relative hover:shadow-lg transition-shadow group ${
                        ticket.status === 'used' ? 'opacity-75' : ''
                      }`}
                    >
                      {/* Left Side: Ticket Event Information */}
                      <div className="flex-grow p-6 flex flex-col justify-between space-y-6 border-b md:border-b-0 md:border-r border-dashed border-charcoal-light/20">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-coral/10 text-coral rounded-full border border-coral/20">
                              {ticket.category}
                            </span>
                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${
                              ticket.status === 'unused' 
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                : 'bg-stone-100 text-stone-500 border-stone-200'
                            }`}>
                              {ticket.status === 'unused' ? 'Active pass' : 'Used'}
                            </span>
                          </div>
                          <h3 className="text-xl font-extrabold text-charcoal tracking-tight group-hover:text-coral transition-colors">
                            {ticket.eventTitle}
                          </h3>
                          <div className="space-y-1 text-xs text-charcoal-light">
                            <p className="flex items-center gap-1.5">
                              📅 {ticket.date}
                            </p>
                            <p className="flex items-center gap-1.5">
                              ⏰ {ticket.time}
                            </p>
                            <p className="flex items-center gap-1.5">
                              📍 {ticket.location}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-charcoal-light/5 pt-4">
                          <div>
                            <span className="text-[10px] text-charcoal-light uppercase font-semibold">TICKET CODE</span>
                            <p className="text-charcoal font-bold font-mono text-sm">{ticket.id}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-charcoal-light uppercase font-semibold">PRICE</span>
                            <p className="text-charcoal font-bold text-sm">{formatPrice(ticket.price)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Cutout circles for ticket look */}
                      <div className="hidden md:block absolute left-[66%] top-[-8px] w-4 h-4 bg-stone-50 border border-charcoal-light/10 rounded-full" />
                      <div className="hidden md:block absolute left-[66%] bottom-[-8px] w-4 h-4 bg-stone-50 border border-charcoal-light/10 rounded-full" />

                      {/* Right Side: QR Code Area */}
                      <div className="p-6 md:w-44 flex flex-col items-center justify-center bg-stone-50/50 gap-3">
                        <div className={`p-2.5 bg-white border border-charcoal-light/10 rounded-2xl ${
                          ticket.status === 'used' ? 'filter grayscale contrast-50' : ''
                        }`}>
                          <img 
                            src={ticket.qrCode} 
                            alt="Ticket QR Code" 
                            className="w-28 h-28 object-contain"
                          />
                        </div>
                        <span className="text-[9px] text-charcoal-light uppercase font-extrabold tracking-widest">
                          {ticket.status === 'unused' ? 'SCAN AT DOOR' : 'TICKET VOIDED'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {currentTab === 'Settings' && (
          <div className="p-8 rounded-3xl bg-white border border-charcoal-light/10 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-charcoal">Account Preferences</h3>
              <p className="text-charcoal-light text-xs mt-1">Manage your dashboard display settings and preferences.</p>
            </div>
            <hr className="border-charcoal-light/5" />
            
            <div className="max-w-md space-y-6">
              <div>
                <label className="text-xs font-bold text-charcoal block mb-2">Preferred Currency</label>
                <p className="text-xs text-charcoal-light mb-3">Choose the currency you want prices and transaction histories to be displayed in.</p>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full sm:w-2/3 bg-stone-50 border border-charcoal-light/20 rounded-xl px-4 py-3 text-sm font-bold text-charcoal focus:outline-none focus:border-coral transition-colors cursor-pointer"
                >
                  <option value="USD">USD ($) &mdash; US Dollar</option>
                  <option value="IDR">IDR (Rp) &mdash; Indonesian Rupiah</option>
                </select>
              </div>

              <div className="pt-6 border-t border-charcoal-light/5 space-y-3">
                <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider text-charcoal-light">Profile Information (Simulated)</h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-charcoal-light font-semibold block">Full Name</span>
                    <span className="text-charcoal font-bold">{user?.profile?.full_name || 'Valued Guest'}</span>
                  </div>
                  <div>
                    <span className="text-charcoal-light font-semibold block">Email Address</span>
                    <span className="text-charcoal font-bold">{user?.email || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
