import { Link } from 'react-router-dom'
import { useCurrency } from '../../../shared/context/CurrencyContext'
import { useManagedEvents } from '../../events/hooks/useEvents'
import EventTable from './EventTable'

export default function OrganizerDashboard({ activeTab, setActiveTab }) {
  const { formatPrice } = useCurrency()
  const { data: events = [], isLoading } = useManagedEvents()

  // Calculate dynamic stats from managed events
  const totalEventsCount = events.length
  const activeEventsCount = events.filter((e) => e.status === 'published').length
  const draftEventsCount = events.filter((e) => e.status === 'draft').length

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Dashboard Navigation Sidebar */}
      <aside className="lg:col-span-3">
        <div className="p-5 rounded-2xl bg-white border border-charcoal-light/10 flex flex-row lg:flex-col gap-1 overflow-x-auto shadow-sm">
          {['Overview', 'Events', 'Coupons', 'Settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left text-sm px-4 py-2.5 rounded-xl transition-all whitespace-nowrap lg:w-full font-bold cursor-pointer ${
                activeTab === tab
                  ? 'bg-coral text-white shadow-md shadow-coral/10'
                  : 'text-charcoal-light hover:bg-stone-50 hover:text-charcoal'
              }`}
            >
              {tab === 'Overview'
                ? '📊 Overview'
                : tab === 'Events'
                ? '📅 Kelola Event'
                : tab === 'Coupons'
                ? '🎟️ Kupon'
                : '⚙️ Settings'}
            </button>
          ))}
        </div>
      </aside>

      {/* Right Column: Dashboard Dynamic Panel */}
      <main className="lg:col-span-9 space-y-8">
        
        {activeTab === 'Overview' && (
          <>
            {/* Welcome Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-coral/10 to-charcoal/5 border border-charcoal-light/10 rounded-3xl p-8 shadow-sm">
              <div className="relative z-10 max-w-2xl">
                <span className="text-xs font-extrabold uppercase tracking-wider text-coral px-3 py-1 rounded-full bg-coral/10 border border-coral/20">
                  💼 Organizer Workspace
                </span>
                <h1 className="text-3xl font-extrabold text-charcoal mt-3">
                  Workspace Penyelenggara
                </h1>
                <p className="text-charcoal-light text-sm mt-2 leading-relaxed">
                  Kelola event Anda, pantau penjualan tiket, terbitkan event baru, dan buat kupon promo langsung dari dasbor kontrol ini.
                </p>
              </div>
              <div className="absolute right-[-10%] top-[-20%] w-[300px] h-[300px] bg-coral/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Analytics Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-charcoal-light/10 shadow-sm relative overflow-hidden group hover:border-coral/20 transition-all">
                <span className="text-charcoal-light text-xs font-semibold uppercase tracking-wider block">Total Event</span>
                <h2 className="text-3xl font-black text-charcoal mt-2">{totalEventsCount} Event</h2>
                <span className="text-charcoal-light text-xs mt-2 inline-flex items-center gap-1">
                  <strong className="text-emerald-600">{activeEventsCount} Active</strong> &bull; {draftEventsCount} Draft
                </span>
                <div className="absolute right-4 bottom-4 text-3xl opacity-15 group-hover:scale-110 transition-transform">📅</div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-charcoal-light/10 shadow-sm relative overflow-hidden group hover:border-coral/20 transition-all">
                <span className="text-charcoal-light text-xs font-semibold uppercase tracking-wider block">Total Pendapatan (Simulasi)</span>
                <h2 className="text-3xl font-black text-charcoal mt-2">{formatPrice(14250)}</h2>
                <span className="text-emerald-600 text-xs font-bold mt-2 inline-flex items-center gap-0.5">
                  ↗ +18.4% <span className="text-charcoal-light font-normal text-[10px] uppercase">vs bulan lalu</span>
                </span>
                <div className="absolute right-4 bottom-4 text-3xl opacity-15 group-hover:scale-110 transition-transform">💰</div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-charcoal-light/10 shadow-sm relative overflow-hidden group hover:border-coral/20 transition-all">
                <span className="text-charcoal-light text-xs font-semibold uppercase tracking-wider block">Tiket Terjual (Simulasi)</span>
                <h2 className="text-3xl font-black text-charcoal mt-2">1,482</h2>
                <span className="text-emerald-600 text-xs font-bold mt-2 inline-flex items-center gap-0.5">
                  ↗ +12.3% <span className="text-charcoal-light font-normal text-[10px] uppercase">vs bulan lalu</span>
                </span>
                <div className="absolute right-4 bottom-4 text-3xl opacity-15 group-hover:scale-110 transition-transform">🎫</div>
              </div>
            </div>

            {/* Recent Events Section */}
            <div className="p-8 rounded-3xl bg-white border border-charcoal-light/10 shadow-sm">
              <div className="flex justify-between items-center mb-6 border-b border-charcoal-light/5 pb-4">
                <h3 className="text-xl font-extrabold text-charcoal">
                  Event Terbaru
                </h3>
                <button
                  onClick={() => setActiveTab('Events')}
                  className="text-coral hover:text-coral-light font-bold text-xs transition-colors"
                >
                  Lihat Semua →
                </button>
              </div>
              <EventTable events={events.slice(0, 3)} isLoading={isLoading} />
            </div>
          </>
        )}

        {activeTab === 'Events' && (
          <div className="p-8 rounded-3xl bg-white border border-charcoal-light/10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-charcoal-light/5 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-charcoal">Daftar Event</h3>
                <p className="text-charcoal-light text-xs mt-1">Buat, edit, terbitkan, atau batalkan event yang Anda selenggarakan.</p>
              </div>
              <Link
                to="/dashboard/events/create"
                className="inline-block bg-coral hover:bg-coral-light text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-coral/10 hover:shadow-coral/20 transform hover:-translate-y-0.5 text-center"
              >
                + Buat Event Baru
              </Link>
            </div>
            
            <EventTable events={events} isLoading={isLoading} />
          </div>
        )}

        {activeTab === 'Settings' && (
          <div className="p-8 rounded-3xl bg-white border border-charcoal-light/10 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-charcoal">Workspace Settings</h3>
              <p className="text-charcoal-light text-xs mt-1">Configure your workspace defaults, preferences, and details.</p>
            </div>
            <hr className="border-charcoal-light/5" />
            
            <div className="max-w-md space-y-6">
              <div className="pt-6 border-t border-charcoal-light/5 space-y-2">
                <h4 className="text-xs font-extrabold text-charcoal-light uppercase tracking-wider">Simulated Organizer Profile</h4>
                <p className="text-xs text-charcoal"><strong>Business Entity:</strong> Eventra Creator Studio Ltd.</p>
                <p className="text-xs text-charcoal"><strong>Status:</strong> Verified Organizer</p>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'Overview' && activeTab !== 'Events' && activeTab !== 'Settings' && (
          <div className="p-12 text-center rounded-3xl bg-white border border-charcoal-light/10 shadow-sm">
            <h3 className="text-lg font-bold text-charcoal">Workspace panel for {activeTab}</h3>
            <p className="text-charcoal-light text-sm mt-1">This screen is configured as part of structural components development.</p>
          </div>
        )}
        
      </main>
    </div>
  )
}
