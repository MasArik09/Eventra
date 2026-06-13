import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'

const queryClient = new QueryClient()

// Dummy events data representing event categories and details
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
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-violet-500 selection:text-white">
          {/* Header */}
          <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent tracking-tight hover:opacity-90 transition-opacity">
                  Eventra
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                  <NavLink to="/" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-violet-400 ${isActive ? 'text-violet-400' : 'text-slate-400'}`}>
                    Home
                  </NavLink>
                  <NavLink to="/events" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-violet-400 ${isActive ? 'text-violet-400' : 'text-slate-400'}`}>
                    Explore Events
                  </NavLink>
                  <NavLink to="/dashboard" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-violet-400 ${isActive ? 'text-violet-400' : 'text-slate-400'}`}>
                    Dashboard
                  </NavLink>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transform hover:-translate-y-0.5">
                  Get Started
                </Link>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/events" element={<EventsView />} />
              <Route path="/dashboard" element={<DashboardView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/register" element={<RegisterView />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-slate-950 border-t border-slate-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Eventra</span>
                <span className="text-slate-500 text-sm">Create Events. Book Tickets. Manage Everything.</span>
              </div>
              <div className="flex gap-6 text-sm text-slate-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Contact Support</a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

function HomeView() {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-fuchsia-900/10 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-violet-900/30 text-violet-300 border border-violet-800/50 mb-6 animate-pulse">
          🚀 Eventra V1.0 Platform Release
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Create Events. Book Tickets.<br/>
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
            Manage Everything.
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-400 text-lg sm:text-xl mb-10 leading-relaxed">
          The all-in-one digital ticketing and event management platform built with React, Django REST Framework, and PostgreSQL. Seamless, modern, and built for scale.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/events" className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold px-8 py-4 rounded-xl shadow-xl shadow-violet-500/20 hover:shadow-violet-500/30 transition-all transform hover:-translate-y-0.5 text-center">
            Explore Events
          </Link>
          <Link to="/dashboard" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold px-8 py-4 rounded-xl transition-all text-center">
            Organizer Dashboard
          </Link>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Everything you need to run events</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Eventra provides premium features designed to make ticket purchasing and event hosting effortless.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-violet-500/30 transition-all hover:bg-slate-900/50 group">
            <div className="w-12 h-12 rounded-xl bg-violet-600/10 text-violet-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              🎫
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Seamless Ticketing</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Buy tickets and receive QR-code e-tickets directly via email for easy scan check-in.</p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-fuchsia-500/30 transition-all hover:bg-slate-900/50 group">
            <div className="w-12 h-12 rounded-xl bg-fuchsia-600/10 text-fuchsia-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              📊
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Live Analytics</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Track ticket sales, revenue, check-in percentages, and coupon usage directly from your dashboard.</p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-pink-500/30 transition-all hover:bg-slate-900/50 group">
            <div className="w-12 h-12 rounded-xl bg-pink-600/10 text-pink-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              💳
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Simulation Payments</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Test bookings end-to-end with our robust payment sandbox simulation environment.</p>
          </div>
        </div>
      </section>

      {/* Tech Stack Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-16 rounded-3xl bg-slate-900/20 border border-slate-900 flex flex-col md:flex-row items-center justify-around gap-6">
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold text-slate-300">Modern Architecture Stack</h4>
          <p className="text-xs text-slate-500">Robust, production-ready fullstack architecture</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-400">
          <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">React + Vite</span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">TailwindCSS</span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">Django DRF</span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">PostgreSQL</span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">JWT Token Auth</span>
        </div>
      </section>
    </div>
  )
}

function EventsView() {
  // Querying using React Query to demonstrate usage (fetching dummy promise here)
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 800))
      return DUMMY_EVENTS
    }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Upcoming Events</h1>
          <p className="text-slate-400 mt-1">Discover, book, and enjoy the best events happening soon.</p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search events..."
            className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
          />
          <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Filter
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse rounded-2xl border border-slate-900 overflow-hidden bg-slate-900/30">
              <div className="h-48 bg-slate-800" />
              <div className="p-6 space-y-4">
                <div className="h-4 bg-slate-800 rounded w-1/4" />
                <div className="h-6 bg-slate-800 rounded w-3/4" />
                <div className="h-4 bg-slate-800 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events?.map(event => (
            <div key={event.id} className="rounded-2xl border border-slate-900 overflow-hidden bg-slate-900/30 hover:bg-slate-900/50 hover:border-violet-500/20 transition-all flex flex-col group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-violet-300 border border-violet-800/40">
                  {event.category}
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="text-violet-400 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                    📅 {event.date}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-slate-400 text-xs mb-1">⏰ {event.time}</p>
                  <p className="text-slate-400 text-xs mb-4">📍 {event.location}</p>
                </div>
                <div className="border-t border-slate-900 pt-4 flex items-center justify-between mt-4">
                  <div className="flex flex-col">
                    <span className="text-slate-500 text-xxs uppercase tracking-wider font-semibold">Price</span>
                    <span className="text-white font-bold text-lg">{event.price}</span>
                  </div>
                  <button className="bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors">
                    Book Ticket
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function DashboardView() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white">Organizer Dashboard</h1>
        <p className="text-slate-400 mt-1">Manage your events, analyze tickets and revenue performance.</p>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-900">
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Sales Revenue</span>
          <h2 className="text-3xl font-bold text-white mt-2">$14,250.00</h2>
          <span className="text-emerald-500 text-xs font-semibold mt-1 inline-block">↗ +18.4% this month</span>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-900">
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Tickets Booked</span>
          <h2 className="text-3xl font-bold text-white mt-2">1,482</h2>
          <span className="text-emerald-500 text-xs font-semibold mt-1 inline-block">↗ +12.3% this month</span>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-900">
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Active Events</span>
          <h2 className="text-3xl font-bold text-white mt-2">4</h2>
          <span className="text-slate-400 text-xs font-semibold mt-1 inline-block">Steady activity</span>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-900">
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Check-in Scan Rate</span>
          <h2 className="text-3xl font-bold text-white mt-2">87.5%</h2>
          <span className="text-emerald-500 text-xs font-semibold mt-1 inline-block">↗ +4.2% vs last event</span>
        </div>
      </div>

      {/* Recent Events List */}
      <div className="p-8 rounded-2xl bg-slate-900/20 border border-slate-900">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Your Managed Events</h3>
          <button className="bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors">
            + Create New Event
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead>
              <tr className="border-b border-slate-900 text-slate-500 text-xs uppercase font-semibold">
                <th className="pb-4">Event Name</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Sold Tickets</th>
                <th className="pb-4">Revenue</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/50">
              <tr>
                <td className="py-4 font-bold text-white">Symphony of Lights & Sound</td>
                <td className="py-4 text-slate-400">June 25, 2026</td>
                <td className="py-4">120 / 250</td>
                <td className="py-4">$9,000.00</td>
                <td className="py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xxs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-900">Active</span>
                </td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-white">Global Tech Summit 2026</td>
                <td className="py-4 text-slate-400">July 12, 2026</td>
                <td className="py-4">450 / 600</td>
                <td className="py-4">Free</td>
                <td className="py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xxs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-900">Active</span>
                </td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-white">Mastering Gastronomy: Culinary Workshop</td>
                <td className="py-4 text-slate-400">August 05, 2026</td>
                <td className="py-4">25 / 30</td>
                <td className="py-4">$3,000.00</td>
                <td className="py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xxs font-semibold bg-violet-950 text-violet-300 border border-violet-900">Draft</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function LoginView() {
  return (
    <div className="max-w-md mx-auto my-20 p-8 rounded-2xl bg-slate-900/30 border border-slate-900 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-t-2xl" />
      <h2 className="text-2xl font-bold text-white text-center mb-2">Welcome Back</h2>
      <p className="text-slate-400 text-sm text-center mb-8">Sign in to your Eventra account to continue</p>
      
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div>
          <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold py-3 rounded-xl shadow-lg transition-colors">
          Sign In
        </button>
      </form>
      <p className="text-center text-xs text-slate-500 mt-6">
        Don't have an account? <Link to="/register" className="text-violet-400 hover:underline">Sign up</Link>
      </p>
    </div>
  )
}

function RegisterView() {
  return (
    <div className="max-w-md mx-auto my-20 p-8 rounded-2xl bg-slate-900/30 border border-slate-900 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-t-2xl" />
      <h2 className="text-2xl font-bold text-white text-center mb-2">Create an Account</h2>
      <p className="text-slate-400 text-sm text-center mb-8">Get started with Eventra today</p>
      
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        <div>
          <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold py-3 rounded-xl shadow-lg transition-colors">
          Create Account
        </button>
      </form>
      <p className="text-center text-xs text-slate-500 mt-6">
        Already have an account? <Link to="/login" className="text-violet-400 hover:underline">Sign in</Link>
      </p>
    </div>
  )
}
