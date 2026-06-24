import { Link } from 'react-router-dom'

export default function Home() {
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
