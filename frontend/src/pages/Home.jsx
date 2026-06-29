import { Link } from 'react-router-dom'
import { useCurrency } from '../shared/context/CurrencyContext'

export default function Home() {
  const { formatPrice } = useCurrency()

  // SVG Icons for clean inline presentation
  const TicketIcon = () => (
    <svg className="w-6 h-6 text-coral" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-3-12h.008v.008H13.5V6zm0 6h.008v.008H13.5V12zm0 6h.008v.008H13.5V18zM6 6h.008v.008H6V6zm0 6h.008v.008H6V12zm0 6h.008v.008H6V18zM3 16.5v-9A1.5 1.5 0 0 1 4.5 6h15a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16.5z" />
    </svg>
  )

  const AnalyticsIcon = () => (
    <svg className="w-6 h-6 text-coral" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125z" />
    </svg>
  )

  const CheckIcon = () => (
    <svg className="w-6 h-6 text-coral" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
    </svg>
  )

  const CouponIcon = () => (
    <svg className="w-6 h-6 text-coral" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.75L3 19.5m16.5-15a2.25 2.25 0 1 1-3.182-3.182l3.182 3.182zm-13.5 13.5a2.25 2.25 0 1 1-3.182-3.182l3.182 3.182z" />
    </svg>
  )

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
              🌟 All-in-One Event Management Platform
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal leading-tight">
              Create Events.<br/>
              Book Tickets.<br/>
              <span className="bg-gradient-to-r from-coral to-charcoal bg-clip-text text-transparent">
                Manage Everything.
              </span>
            </h1>
            <p className="text-charcoal-light text-lg leading-relaxed max-w-xl">
              Eventra hadir sebagai ekosistem digital terpadu untuk menghubungkan Penyelenggara Acara kreatif dengan Peserta secara instan, aman, dan tanpa hambatan.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link to="/events" className="w-full sm:w-auto bg-coral hover:bg-coral-light text-white font-bold px-8 py-4 rounded-xl shadow-md shadow-coral/10 hover:shadow-coral/20 transition-all transform hover:-translate-y-0.5 text-center">
                Jelajahi Event
              </Link>
              <Link to="/dashboard" className="w-full sm:w-auto bg-white hover:bg-stone-100 border border-charcoal-light/20 text-charcoal font-bold px-8 py-4 rounded-xl shadow-sm transition-all text-center">
                Dashboard Penyelenggara
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
                  Pilihan Utama
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
                    <span className="text-[10px] text-charcoal-light uppercase font-semibold">Harga</span>
                    <span className="text-charcoal font-black text-base">{formatPrice(75)}</span>
                  </div>
                  <Link to="/events" className="bg-coral hover:bg-coral-light text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors">
                    Pesan Tiket
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
          <h2 className="text-3xl font-extrabold text-charcoal">Fitur Unggulan Eventra</h2>
          <p className="text-charcoal-light mt-2">Didesain khusus untuk efisiensi penyelenggara dan kenyamanan peserta.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Item 1: Large Span */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-white border border-charcoal-light/10 hover:border-coral/30 transition-all hover:bg-stone-50/20 group flex flex-col justify-between min-h-[250px] shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-coral/5 text-coral flex items-center justify-center group-hover:scale-105 transition-transform border border-coral/10">
              <TicketIcon />
            </div>
            <div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Sistem Pertiketan Elektronik</h3>
              <p className="text-charcoal-light text-sm leading-relaxed max-w-md">
                Pesan tiket dengan cepat dan aman. Peserta secara otomatis mendapatkan e-ticket resmi yang dilengkapi QR Code unik untuk kemudahan akses masuk.
              </p>
            </div>
          </div>

          {/* Bento Item 2: Small */}
          <div className="p-8 rounded-3xl bg-white border border-charcoal-light/10 hover:border-coral/30 transition-all hover:bg-stone-50/20 group flex flex-col justify-between min-h-[250px] shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-coral/5 text-coral flex items-center justify-center group-hover:scale-105 transition-transform border border-coral/10">
              <AnalyticsIcon />
            </div>
            <div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Visibilitas Data Real-time</h3>
              <p className="text-charcoal-light text-sm leading-relaxed">
                Pantau langsung tingkat penjualan tiket, kalkulasi pendapatan keuangan, dan statistik kehadiran acara Anda melalui dashboard analitik.
              </p>
            </div>
          </div>

          {/* Bento Item 3: Small */}
          <div className="p-8 rounded-3xl bg-white border border-charcoal-light/10 hover:border-coral/30 transition-all hover:bg-stone-50/20 group flex flex-col justify-between min-h-[250px] shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-coral/5 text-coral flex items-center justify-center group-hover:scale-105 transition-transform border border-coral/10">
              <CheckIcon />
            </div>
            <div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Check-in Cepat & Aman</h3>
              <p className="text-charcoal-light text-sm leading-relaxed">
                Hindari antrean panjang di lokasi. Penyelenggara dapat memverifikasi e-ticket peserta secara instan dengan scan QR Code di pintu masuk.
              </p>
            </div>
          </div>

          {/* Bento Item 4: Large Span */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-white border border-charcoal-light/10 hover:border-coral/30 transition-all hover:bg-stone-50/20 group flex flex-col justify-between min-h-[250px] shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-coral/5 text-coral flex items-center justify-center group-hover:scale-105 transition-transform border border-coral/10">
              <CouponIcon />
            </div>
            <div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Manajemen Kupon & Promosi</h3>
              <p className="text-charcoal-light text-sm leading-relaxed max-w-md">
                Jalankan kampanye promosi terarah dengan kupon diskon (persentase/nominal tetap), lengkap dengan kontrol batas kuota dan tanggal kedaluwarsa.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Dual Role Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-charcoal-light/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card for Attendee */}
          <div className="p-8 rounded-3xl bg-white border border-charcoal-light/10 shadow-sm space-y-4 hover:border-coral/20 transition-all">
            <div className="text-3xl">👥</div>
            <h3 className="text-xl font-bold text-charcoal">Untuk Peserta (Attendees)</h3>
            <ul className="space-y-2 text-sm text-charcoal-light">
              <li className="flex items-center gap-2">✓ Temukan event seru (Seminar, Workshop, Kompetisi)</li>
              <li className="flex items-center gap-2">✓ Alur registrasi yang instan dan aman</li>
              <li className="flex items-center gap-2">✓ Dapatkan potongan harga menggunakan kupon promosi</li>
              <li className="flex items-center gap-2">✓ Akses e-ticket digital di mana saja secara praktis</li>
            </ul>
            <Link to="/events" className="inline-block pt-2 text-sm font-bold text-coral hover:text-coral-dark transition-colors">
              Cari Event Menarik →
            </Link>
          </div>

          {/* Card for Organizer */}
          <div className="p-8 rounded-3xl bg-white border border-charcoal-light/10 shadow-sm space-y-4 hover:border-coral/20 transition-all">
            <div className="text-3xl">💼</div>
            <h3 className="text-xl font-bold text-charcoal">Untuk Penyelenggara (Organizers)</h3>
            <ul className="space-y-2 text-sm text-charcoal-light">
              <li className="flex items-center gap-2">✓ Buat dan publikasikan event dengan kapasitas terkunci</li>
              <li className="flex items-center gap-2">✓ Kelola promosi dengan kupon kuota otomatis</li>
              <li className="flex items-center gap-2">✓ Validasi kehadiran di pintu masuk via scanner QR Code</li>
              <li className="flex items-center gap-2">✓ Dashboard performa penjualan tiket real-time</li>
            </ul>
            <Link to="/dashboard" className="inline-block pt-2 text-sm font-bold text-coral hover:text-coral-dark transition-colors">
              Mulai Kelola Event →
            </Link>
          </div>

        </div>
      </section>

      {/* Strategic Visi & Misi Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-16 rounded-3xl bg-stone-100 border border-charcoal-light/10 flex flex-col md:flex-row items-center gap-8 p-8">
        <div className="text-center md:text-left md:w-1/3">
          <span className="text-coral font-bold text-xs uppercase tracking-wider">Visi & Misi Kami</span>
          <h4 className="text-2xl font-black text-charcoal mt-1">Strategic Foundation</h4>
        </div>
        <div className="md:w-2/3 text-left">
          <p className="text-charcoal font-medium italic text-base mb-3 leading-relaxed">
            "Menjadi platform manajemen acara dan pertiketan digital yang paling adaptif, ramah pengguna, dan tepercaya—mendukung pertumbuhan komunitas kreatif serta penyebaran ilmu pengetahuan tanpa batas geografis."
          </p>
          <div className="flex gap-4 text-xs font-bold text-charcoal-dark mt-4">
            <span className="px-3 py-1.5 rounded-lg bg-white border border-charcoal-light/5 shadow-sm">Demokratisasi Event</span>
            <span className="px-3 py-1.5 rounded-lg bg-white border border-charcoal-light/5 shadow-sm">Efisiensi Berbasis Data</span>
            <span className="px-3 py-1.5 rounded-lg bg-white border border-charcoal-light/5 shadow-sm">Sistem Terintegrasi</span>
          </div>
        </div>
      </section>
    </div>
  )
}
