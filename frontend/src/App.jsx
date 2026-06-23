import { useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import { AuthProvider, useAuth } from './features/auth/context/AuthContext'
import LoginForm from './features/auth/components/LoginForm'
import RegisterForm from './features/auth/components/RegisterForm'
import ProtectedRoute from './features/auth/components/ProtectedRoute'

const queryClient = new QueryClient()

const DUMMY_EVENTS = [
  {
    id: 1,
    title: "Symphony of Lights & Sound",
    date: "June 25, 2026",
    time: "7:00 PM - 11:00 PM",
    location: "Jakarta Amphitheater",
    category: "Music Concert",
    price: "$75.00",
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
    price: "Free",
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
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Chef Culinary Lab",
    availableTickets: 25,
  },
]

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppLayout />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

function AppLayout() {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-stone-50 text-charcoal flex flex-col font-sans antialiased selection:bg-coral selection:text-white overflow-x-hidden">
      
      {/* Floating Glassmorphic Top Navigation with Coral & Charcoal accents */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6">
        <header className="max-w-7xl mx-auto bg-white/90 backdrop-blur-xl border border-charcoal-light/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg shadow-charcoal/5">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-coral to-charcoal bg-clip-text text-transparent tracking-tight hover:opacity-90 transition-opacity">
              Eventra
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <NavLink 
                to="/" 
                className={({ isActive }) => `relative pb-1 text-sm font-semibold transition-all duration-300 hover:text-coral ${isActive ? 'text-coral' : 'text-charcoal-light'}`}
              >
                {({ isActive }) => (
                  <>
                    Home
                    <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-coral rounded-full transition-all duration-300 origin-center ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
                  </>
                )}
              </NavLink>
              <NavLink 
                to="/events" 
                className={({ isActive }) => `relative pb-1 text-sm font-semibold transition-all duration-300 hover:text-coral ${isActive ? 'text-coral' : 'text-charcoal-light'}`}
              >
                {({ isActive }) => (
                  <>
                    Explore Events
                    <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-coral rounded-full transition-all duration-300 origin-center ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
                  </>
                )}
              </NavLink>
              {isAuthenticated && (
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => `relative pb-1 text-sm font-semibold transition-all duration-300 hover:text-coral ${isActive ? 'text-coral' : 'text-charcoal-light'}`}
                >
                  {({ isActive }) => (
                    <>
                      Dashboard
                      <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-coral rounded-full transition-all duration-300 origin-center ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
                    </>
                  )}
                </NavLink>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm font-semibold text-charcoal-light">
                  Hi, {user.profile?.full_name || user.email}
                </span>
                <button 
                  onClick={logout} 
                  className="bg-stone-200 hover:bg-stone-300 text-charcoal px-4 py-2 rounded-xl text-sm font-bold transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-charcoal-light hover:text-charcoal transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="bg-coral hover:bg-coral-light text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-coral/10 hover:shadow-coral/20 transform hover:-translate-y-0.5">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </header>
      </div>

      {/* Main content with spacing for floating header */}
      <main className="flex-grow pt-28">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/events" element={<EventsView />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardView />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-stone-100 border-t border-charcoal-light/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-coral to-charcoal bg-clip-text text-transparent">Eventra</span>
            <span className="text-charcoal-light text-sm">Create Events. Book Tickets. Manage Everything.</span>
          </div>
          <div className="flex gap-6 text-sm text-charcoal-light">
            <a href="#" className="hover:text-coral transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-coral transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-coral transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function HomeView() {
  return (
    <div className="relative bg-stone-50">
      {/* Decorative Coral Soft Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-coral/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-charcoal/5 blur-[130px] pointer-events-none" />

      {/* Split Hero Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context / Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-coral/10 text-coral border border-coral/20">
              🌱 Crafting Exceptional Experiences
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal leading-tight">
              Create Events.<br/>
              Book Tickets.<br/>
              <span className="bg-gradient-to-r from-coral to-charcoal bg-clip-text text-transparent">
                Manage Everything.
              </span>
            </h1>
            <p className="text-charcoal-light text-lg leading-relaxed max-w-xl">
              A warm, community-focused digital ticketing and event management ecosystem built with React, Django REST Framework, and PostgreSQL. Crafted for builders and creators.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link to="/events" className="w-full sm:w-auto bg-coral hover:bg-coral-light text-white font-bold px-8 py-4 rounded-xl shadow-md shadow-coral/10 hover:shadow-coral/20 transition-all transform hover:-translate-y-0.5 text-center">
                Explore Events
              </Link>
              <Link to="/dashboard" className="w-full sm:w-auto bg-white hover:bg-stone-100 border border-charcoal-light/20 text-charcoal font-bold px-8 py-4 rounded-xl shadow-sm transition-all text-center">
                Organizer Workspace
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Mockup Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-coral/10 to-charcoal/5 blur-3xl rounded-full" />
            <div className="relative w-full max-w-sm bg-white border border-charcoal-light/10 rounded-3xl p-6 shadow-xl shadow-charcoal/5 hover:border-coral/30 transition-colors">
              <div className="relative h-48 rounded-2xl overflow-hidden mb-5">
                <img 
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  className="w-full h-full object-cover" 
                  alt="Symphony Lights"
                />
                <span className="absolute top-3 left-3 bg-white/95 text-coral text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-charcoal-light/10">
                  Featured Event
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-charcoal-light">
                  <span>📅 June 25, 2026</span>
                  <span>📍 Jakarta</span>
                </div>
                <h3 className="text-lg font-extrabold text-charcoal">Symphony of Lights & Sound</h3>
                <div className="border-t border-charcoal-light/5 pt-3 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-charcoal-light uppercase font-semibold">Price</span>
                    <span className="text-charcoal font-black text-base">$75.00</span>
                  </div>
                  <Link to="/events" className="bg-coral hover:bg-coral-light text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors">
                    Get Tickets
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Bento Grid Feature Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-charcoal-light/10">
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold text-charcoal">Carefully Crafted for Creators</h2>
          <p className="text-charcoal-light mt-2">Discover premium features designed to make ticket purchasing and event hosting effortless.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Item 1: Large Span */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-white border border-charcoal-light/10 hover:border-coral/30 transition-all hover:bg-stone-50/20 group flex flex-col justify-between min-h-[250px] shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-coral/5 text-coral flex items-center justify-center text-xl group-hover:scale-105 transition-transform border border-coral/10">
              🎫
            </div>
            <div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Seamless Ticketing System</h3>
              <p className="text-charcoal-light text-sm leading-relaxed max-w-md">
                Buy tickets smoothly. Attendees receive high-fidelity, QR-code based e-tickets directly via email for easy check-in verification at the door.
              </p>
            </div>
          </div>

          {/* Bento Item 2: Small */}
          <div className="p-8 rounded-3xl bg-white border border-charcoal-light/10 hover:border-coral/30 transition-all hover:bg-stone-50/20 group flex flex-col justify-between min-h-[250px] shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-coral/5 text-coral flex items-center justify-center text-xl group-hover:scale-105 transition-transform border border-coral/10">
              📊
            </div>
            <div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Live Analytics</h3>
              <p className="text-charcoal-light text-sm leading-relaxed">
                Track real-time statistics including ticket sales, organizer revenues, check-in percentages, and coupon usage directly from your dashboard.
              </p>
            </div>
          </div>

          {/* Bento Item 3: Small */}
          <div className="p-8 rounded-3xl bg-white border border-charcoal-light/10 hover:border-coral/30 transition-all hover:bg-stone-50/20 group flex flex-col justify-between min-h-[250px] shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-stone-100 text-charcoal-light flex items-center justify-center text-xl group-hover:scale-105 transition-transform border border-charcoal-light/10">
              💳
            </div>
            <div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Simulated Sandbox Payments</h3>
              <p className="text-charcoal-light text-sm leading-relaxed">
                Robust payment simulation settings allow testing purchase flows under success, pending, or failure scenarios.
              </p>
            </div>
          </div>

          {/* Bento Item 4: Large Span */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-white border border-charcoal-light/10 hover:border-coral/30 transition-all hover:bg-stone-50/20 group flex flex-col justify-between min-h-[250px] shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-coral/5 text-coral flex items-center justify-center text-xl group-hover:scale-105 transition-transform border border-coral/10">
              🔒
            </div>
            <div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Secure Coupon & Access Controls</h3>
              <p className="text-charcoal-light text-sm leading-relaxed max-w-md">
                Deploy target coupons with absolute precision (percentage/fixed value discounts, usage caps, expirations) and manage roles seamlessly.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Tech Stack Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-16 rounded-3xl bg-stone-100 border border-charcoal-light/10 flex flex-col md:flex-row items-center justify-around gap-6">
        <div className="text-center md:text-left">
          <h4 className="text-lg font-bold text-charcoal">Modern Architecture Stack</h4>
          <p className="text-xs text-charcoal-light">Robust, production-ready fullstack architecture</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-charcoal-light">
          <span className="px-3 py-1.5 rounded-lg bg-white border border-charcoal-light/10 shadow-sm hover:text-coral transition-colors">React + Vite</span>
          <span className="px-3 py-1.5 rounded-lg bg-white border border-charcoal-light/10 shadow-sm hover:text-coral transition-colors">TailwindCSS</span>
          <span className="px-3 py-1.5 rounded-lg bg-white border border-charcoal-light/10 shadow-sm hover:text-coral transition-colors">Django DRF</span>
          <span className="px-3 py-1.5 rounded-lg bg-white border border-charcoal-light/10 shadow-sm hover:text-coral transition-colors">PostgreSQL</span>
          <span className="px-3 py-1.5 rounded-lg bg-white border border-charcoal-light/10 shadow-sm hover:text-coral transition-colors">JWT Token Auth</span>
        </div>
      </section>
    </div>
  )
}

function EventsView() {
  const [selectedCategory, setSelectedCategory] = useState('All')
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
                    className={`text-left text-sm px-3 py-2 rounded-xl transition-all ${
                      selectedCategory === cat
                        ? 'bg-coral text-white font-bold border border-coral shadow-md shadow-coral/10'
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
                <div key={event.id} className="rounded-2xl border border-charcoal-light/10 overflow-hidden bg-white hover:border-coral/30 hover:shadow-md transition-all flex flex-col group shadow-sm">
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
                      <button className="bg-coral hover:bg-coral-light text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors">
                        Book Ticket
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  )
}

function DashboardView() {
  const [activeTab, setActiveTab] = useState('Overview')
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-stone-50">
      
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-charcoal">Dashboard Workspace</h1>
        <p className="text-charcoal-light mt-1">Manage operations, track registrations, and monitor analytics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Dashboard Navigation Sidebar */}
        <aside className="lg:col-span-3">
          <div className="p-5 rounded-2xl bg-white border border-charcoal-light/10 flex flex-row lg:flex-col gap-1 overflow-x-auto shadow-sm">
            {['Overview', 'Events', 'Coupons', 'Settings'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left text-sm px-4 py-2.5 rounded-xl transition-all whitespace-nowrap lg:w-full ${
                  activeTab === tab
                    ? 'bg-coral text-white font-bold shadow-md shadow-coral/10'
                    : 'text-charcoal-light hover:bg-stone-50 hover:text-charcoal'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </aside>

        {/* Right Column: Dashboard Dynamic Panel */}
        <main className="lg:col-span-9 space-y-8">
          
          {activeTab === 'Overview' && (
            <>
              {/* Analytics overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-charcoal-light/10 shadow-sm">
                  <span className="text-charcoal-light text-xs font-semibold uppercase tracking-wider">Revenue</span>
                  <h2 className="text-3xl font-bold text-charcoal mt-2">$14,250.00</h2>
                  <span className="text-emerald-600 text-xs font-semibold mt-1 inline-block">↗ +18.4% this month</span>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-charcoal-light/10 shadow-sm">
                  <span className="text-charcoal-light text-xs font-semibold uppercase tracking-wider">Tickets Booked</span>
                  <h2 className="text-3xl font-bold text-charcoal mt-2">1,482</h2>
                  <span className="text-emerald-600 text-xs font-semibold mt-1 inline-block">↗ +12.3% this month</span>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-charcoal-light/10 shadow-sm">
                  <span className="text-charcoal-light text-xs font-semibold uppercase tracking-wider">Attendance Rate</span>
                  <h2 className="text-3xl font-bold text-charcoal mt-2">87.5%</h2>
                  <span className="text-emerald-600 text-xs font-semibold mt-1 inline-block">↗ +4.2% rate</span>
                </div>
              </div>

              {/* Event Table list */}
              <div className="p-8 rounded-3xl bg-white border border-charcoal-light/10 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-charcoal">Your Managed Events</h3>
                  <button className="bg-coral hover:bg-coral-light text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors">
                    + Create New
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-charcoal">
                    <thead>
                      <tr className="border-b border-charcoal-light/10 text-charcoal-light text-xs uppercase font-semibold">
                        <th className="pb-4">Event Name</th>
                        <th className="pb-4">Date</th>
                        <th className="pb-4">Sold Tickets</th>
                        <th className="pb-4">Revenue</th>
                        <th className="pb-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-charcoal-light/5">
                      <tr className="hover:bg-stone-50/50 transition-colors">
                        <td className="py-4 font-bold text-charcoal">Symphony of Lights & Sound</td>
                        <td className="py-4 text-charcoal-light">June 25, 2026</td>
                        <td className="py-4">120 / 250</td>
                        <td className="py-4">$9,000.00</td>
                        <td className="py-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">Active</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-stone-50/50 transition-colors">
                        <td className="py-4 font-bold text-charcoal">Global Tech Summit 2026</td>
                        <td className="py-4 text-charcoal-light">July 12, 2026</td>
                        <td className="py-4">450 / 600</td>
                        <td className="py-4">Free</td>
                        <td className="py-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">Active</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-stone-50/50 transition-colors">
                        <td className="py-4 font-bold text-charcoal">Mastering Gastronomy: Culinary Workshop</td>
                        <td className="py-4 text-charcoal-light">August 05, 2026</td>
                        <td className="py-4">25 / 30</td>
                        <td className="py-4">$3,000.00</td>
                        <td className="py-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-charcoal-light border border-charcoal-light/25">Draft</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab !== 'Overview' && (
            <div className="p-12 text-center rounded-3xl bg-white border border-charcoal-light/10 shadow-sm">
              <h3 className="text-lg font-bold text-charcoal">Workspace panel for {activeTab}</h3>
              <p className="text-charcoal-light text-sm mt-1">This screen is configured as part of structural components development.</p>
            </div>
          )}
          
        </main>
      </div>
    </div>
  )
}

function LoginView() {
  return <LoginForm />
}

function RegisterView() {
  return <RegisterForm />
}
