import { Link, NavLink, Routes, Route } from 'react-router-dom'
import { useAuth } from './features/auth/context/AuthContext'
import Home from './pages/Home'
import Events from './pages/Events'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './features/auth/components/ProtectedRoute'

export default function AppLayout() {
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
      <main className="flex-grow pt-28 min-h-[100vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
