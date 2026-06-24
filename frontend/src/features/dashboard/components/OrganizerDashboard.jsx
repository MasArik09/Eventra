import { useCurrency } from '../../../shared/context/CurrencyContext'

export default function OrganizerDashboard({ activeTab, setActiveTab }) {
  const { currency, setCurrency, formatPrice } = useCurrency()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Dashboard Navigation Sidebar */}
      <aside className="lg:col-span-3">
        <div className="p-5 rounded-2xl bg-white border border-charcoal-light/10 flex flex-row lg:flex-col gap-1 overflow-x-auto shadow-sm">
          {['Overview', 'Events', 'Coupons', 'Settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left text-sm px-4 py-2.5 rounded-xl transition-all whitespace-nowrap lg:w-full font-bold cursor-pointer ${
                activeTab === tab
                  ? 'bg-coral text-white shadow-md shadow-coral/10'
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
            {/* Analytics Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-charcoal-light/10 shadow-sm relative overflow-hidden group hover:border-coral/20 transition-all">
                <span className="text-charcoal-light text-xs font-semibold uppercase tracking-wider block">Total Revenue</span>
                <h2 className="text-3xl font-black text-charcoal mt-2">{formatPrice(14250)}</h2>
                <span className="text-emerald-600 text-xs font-bold mt-2 inline-flex items-center gap-0.5">
                  ↗ +18.4% <span className="text-charcoal-light font-normal text-[10px] uppercase">vs last month</span>
                </span>
                <div className="absolute right-4 bottom-4 text-3xl opacity-15 group-hover:scale-110 transition-transform">💰</div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-charcoal-light/10 shadow-sm relative overflow-hidden group hover:border-coral/20 transition-all">
                <span className="text-charcoal-light text-xs font-semibold uppercase tracking-wider block">Tickets Booked</span>
                <h2 className="text-3xl font-black text-charcoal mt-2">1,482</h2>
                <span className="text-emerald-600 text-xs font-bold mt-2 inline-flex items-center gap-0.5">
                  ↗ +12.3% <span className="text-charcoal-light font-normal text-[10px] uppercase">vs last month</span>
                </span>
                <div className="absolute right-4 bottom-4 text-3xl opacity-15 group-hover:scale-110 transition-transform">🎫</div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-charcoal-light/10 shadow-sm relative overflow-hidden group hover:border-coral/20 transition-all">
                <span className="text-charcoal-light text-xs font-semibold uppercase tracking-wider block">Attendance Rate</span>
                <h2 className="text-3xl font-black text-charcoal mt-2">87.5%</h2>
                <span className="text-emerald-600 text-xs font-bold mt-2 inline-flex items-center gap-0.5">
                  ↗ +4.2% <span className="text-charcoal-light font-normal text-[10px] uppercase">avg rate</span>
                </span>
                <div className="absolute right-4 bottom-4 text-3xl opacity-15 group-hover:scale-110 transition-transform">📈</div>
              </div>
            </div>

            {/* Event Table list */}
            <div className="p-8 rounded-3xl bg-white border border-charcoal-light/10 shadow-sm">
              <h3 className="text-xl font-extrabold text-charcoal mb-6 border-b border-charcoal-light/5 pb-4">
                Your Managed Events
              </h3>
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
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <span>120 / 250</span>
                          <div className="w-16 bg-stone-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-coral h-full rounded-full" style={{ width: '48%' }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-4">{formatPrice(9000)}</td>
                      <td className="py-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">Active</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-stone-50/50 transition-colors">
                      <td className="py-4 font-bold text-charcoal">Global Tech Summit 2026</td>
                      <td className="py-4 text-charcoal-light">July 12, 2026</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <span>450 / 600</span>
                          <div className="w-16 bg-stone-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-coral h-full rounded-full" style={{ width: '75%' }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-4">{formatPrice(0)}</td>
                      <td className="py-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">Active</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-stone-50/50 transition-colors">
                      <td className="py-4 font-bold text-charcoal">Mastering Gastronomy: Culinary Workshop</td>
                      <td className="py-4 text-charcoal-light">August 05, 2026</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <span>25 / 30</span>
                          <div className="w-16 bg-stone-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-coral h-full rounded-full" style={{ width: '83%' }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-4">{formatPrice(3000)}</td>
                      <td className="py-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-charcoal-light border border-charcoal-light/25">Draft</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Settings' && (
          <div className="p-8 rounded-3xl bg-white border border-charcoal-light/10 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-charcoal">Workspace Settings</h3>
              <p className="text-charcoal-light text-xs mt-1">Configure your workspace defaults, preferences, and details.</p>
            </div>
            <hr className="border-charcoal-light/5" />
            
            <div className="max-w-md space-y-6">
              <div>
                <label className="text-xs font-bold text-charcoal block mb-2">Workspace Base Currency</label>
                <p className="text-xs text-charcoal-light mb-3">Choose the currency used for compiling dashboard metrics, revenue charts, and coupon parameters.</p>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full sm:w-2/3 bg-stone-50 border border-charcoal-light/20 rounded-xl px-4 py-3 text-sm font-bold text-charcoal focus:outline-none focus:border-coral transition-colors cursor-pointer"
                >
                  <option value="USD">USD ($) &mdash; US Dollar</option>
                  <option value="IDR">IDR (Rp) &mdash; Indonesian Rupiah</option>
                </select>
              </div>

              <div className="pt-6 border-t border-charcoal-light/5 space-y-2">
                <h4 className="text-xs font-extrabold text-charcoal-light uppercase tracking-wider">Simulated Organizer Profile</h4>
                <p className="text-xs text-charcoal"><strong>Business Entity:</strong> Eventra Creator Studio Ltd.</p>
                <p className="text-xs text-charcoal"><strong>Status:</strong> Verified Organizer</p>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'Overview' && activeTab !== 'Settings' && (
          <div className="p-12 text-center rounded-3xl bg-white border border-charcoal-light/10 shadow-sm">
            <h3 className="text-lg font-bold text-charcoal">Workspace panel for {activeTab}</h3>
            <p className="text-charcoal-light text-sm mt-1">This screen is configured as part of structural components development.</p>
          </div>
        )}
        
      </main>
    </div>
  )
}
