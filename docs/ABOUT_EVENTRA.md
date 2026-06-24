# About Eventra: Platform Overview & Strategic Foundation

> **Catatan:** Eventra adalah proyek portofolio fiktif yang dibangun untuk mendemonstrasikan kemampuan rekayasa perangkat lunak full-stack dengan standar industri modern.

---

## 1. Executive Summary

**Eventra** adalah sebuah platform manajemen acara dan pertiketan digital (*all-in-one event management and digital ticketing platform*) berbasis web yang dibangun di atas stack teknologi modern: **React + TypeScript** di sisi frontend, **Django REST Framework** di sisi backend, dan **PostgreSQL** sebagai basis data utama.

Platform ini hadir sebagai solusi terpadu yang menjembatani kebutuhan dua pihak utama: **penyelenggara acara** (*organizers*) yang membutuhkan alat manajemen yang efisien, dan **peserta** (*attendees*) yang menginginkan pengalaman penemuan dan pemesanan tiket yang mulus. Keduanya berinteraksi dalam satu ekosistem digital yang kohesif, aman, dan responsif.

Dari sudut pandang teknis, Eventra bukan sekadar aplikasi CRUD sederhana. Ia dirancang dengan **Modular Monolith Architecture** di backend, **Feature-Based Structure** di frontend, pola layering yang ketat (*API → Service → Selector → Model*), serta sistem autentikasi berbasis **JWT**. Seluruh keputusan arsitektur dibuat dengan mempertimbangkan *maintainability*, *scalability*, dan kemudahan migrasi ke microservices di masa depan.

---

## 2. Latar Belakang & Problem Statement

### Realita di Lapangan

Banyak penyelenggara acara skala kecil hingga menengah—mulai dari organisasi kemahasiswaan, komunitas independen, kelompok belajar, hingga UMKM yang bergerak di bidang edukasi dan hiburan—masih mengelola administrasi acara mereka dengan cara-cara konvensional yang tidak efisien.

### Masalah Utama yang Diselesaikan Eventra

**1. Proses Registrasi yang Terfragmentasi**
Pendaftaran peserta sering kali dilakukan melalui Google Form terpisah yang tidak memiliki hubungan real-time dengan ketersediaan kuota. Akibatnya, kuota kerap melebihi batas karena tidak ada mekanisme *capacity lock* yang otomatis.

**2. Manajemen Data Berbasis Spreadsheet**
Data peserta disimpan dan diperbarui secara manual di lembar kerja seperti Google Sheets atau Excel. Cara ini sangat rentan terhadap duplikasi entri, kesalahan input manusia (*human error*), dan tidak memiliki riwayat perubahan yang terlacak.

**3. Verifikasi Kehadiran yang Lambat dan Rawan Manipulasi**
Sistem check-in tradisional menggunakan daftar hadir kertas atau verifikasi nama secara manual. Proses ini lambat, menciptakan antrean panjang di pintu masuk, dan rentan terhadap pemalsuan identitas atau duplikasi tiket.

**4. Kampanye Promosi yang Tidak Terstruktur**
Pengelolaan kode diskon atau promo dilakukan secara ad-hoc tanpa batas penggunaan, tanggal kedaluwarsa, atau pelacakan efektivitas yang sistematis. Hal ini membuka celah penyalahgunaan dan menyulitkan evaluasi kampanye.

**5. Ketiadaan Visibilitas Data Real-Time**
Penyelenggara tidak memiliki akses langsung ke metrik penting seperti jumlah tiket terjual, pendapatan terkumpul, atau tingkat kehadiran aktual—semua harus dihitung ulang secara manual setelah acara selesai.

---

## 3. Visi & Misi

### Visi
> *"Menjadi platform manajemen acara dan pertiketan digital yang paling adaptif, ramah pengguna, dan tepercaya—mendukung pertumbuhan komunitas kreatif serta penyebaran ilmu pengetahuan tanpa batas geografis."*

### Misi

**1. Demokratisasi Manajemen Acara**
Menyediakan alat bantu manajemen yang komprehensif namun mudah dioperasikan, bahkan oleh organisasi non-profit, komunitas kecil, atau individu yang tidak memiliki latar belakang teknis.

**2. Transformasi Pengalaman Pertiketan**
Menghadirkan alur pemesanan tiket yang transparan, aman, dan instan—mulai dari penemuan acara, pembayaran, hingga penerimaan e-ticket berbasis QR Code yang siap diverifikasi di lokasi.

**3. Efisiensi Operasional Berbasis Data**
Menyediakan visibilitas data yang akurat dan dapat dilacak secara real-time: dari transaksi keuangan, aktivitas sistem (*audit trail*), hingga kehadiran peserta di lapangan—semuanya dalam satu dashboard terpusat.

**4. Standar Kualitas Rekayasa Perangkat Lunak**
Membuktikan bahwa proyek portofolio pun bisa dibangun dengan standar industri nyata: arsitektur yang bersih, kode yang terdokumentasi, pengujian yang terstruktur, dan desain yang memiliki identitas visual tersendiri.

---

## 4. Target Pengguna & Aktor Sistem

Eventra membagi penggunanya ke dalam empat peran (*roles*) dengan hak akses yang terukur dan hierarkis.

### 4.1 Guest (Pengunjung Umum)

Pengguna non-autentikasi yang mengakses platform untuk menjelajahi konten publik.

**Kemampuan:**
- Menjelajahi daftar acara yang telah dipublikasikan
- Mencari acara berdasarkan kata kunci
- Menyaring acara berdasarkan kategori dan status
- Melihat detail lengkap suatu acara
- Mendaftar akun baru (menjadi Attendee)

**Batasan:** Tidak dapat melakukan pemesanan tiket. Setiap upaya pemesanan akan mengarahkan Guest ke halaman login/registrasi.

---

### 4.2 Attendee (Peserta)

Pengguna terautentikasi yang berinteraksi dengan acara sebagai konsumen atau peserta.

**Kemampuan:**
- Semua kemampuan Guest
- Memesan tiket untuk acara yang tersedia
- Menerapkan kode kupon promosi saat pemesanan
- Melakukan simulasi pembayaran (sukses/pending/gagal)
- Mengakses dan mengunduh e-ticket elektronik
- Melihat riwayat pemesanan dan status pembayaran
- Mengelola profil akun (nama, foto, bio)

**Karakteristik Pengguna:**
Mahasiswa, profesional muda, anggota komunitas, atau masyarakat umum yang ingin menghadiri seminar, workshop, webinar, kompetisi, atau konferensi.

---

### 4.3 Organizer (Penyelenggara Acara)

Pengguna dengan hak istimewa yang dapat membuat dan mengelola acara di dalam platform.

**Kemampuan:**
- Semua kemampuan Attendee
- Membuat, mengedit, dan menghapus acara
- Mengunggah banner/poster acara
- Mempublikasikan atau membatalkan acara
- Membuat dan mengelola kupon diskon khusus per-acara (persentase/nominal tetap, batas penggunaan, tanggal kedaluwarsa)
- Melihat daftar lengkap peserta yang telah memesan tiket
- Memantau statistik penjualan tiket dan pendapatan melalui dashboard analitik
- Melakukan pemindaian QR Code untuk validasi kehadiran peserta (*check-in*)

**Karakteristik Pengguna:**
Organisasi kemahasiswaan, komunitas independen, lembaga pendidikan, atau individu yang secara rutin menyelenggarakan kegiatan publik.

---

### 4.4 Administrator (Pengelola Platform)

Peran internal platform dengan akses penuh untuk menjaga kualitas dan integritas sistem.

**Kemampuan:**
- Melihat dan mengelola seluruh akun pengguna
- Menangguhkan (*suspend*) atau mengaktifkan kembali akun
- Memoderasi dan menghapus acara yang melanggar ketentuan platform
- Memantau statistik platform secara keseluruhan (total pengguna, total acara, total pendapatan)
- Mengakses log audit sistem

---

## 5. Fitur Lengkap Per Modul

### 5.1 Modul Autentikasi & Akun

Sistem autentikasi Eventra dibangun di atas **Simple JWT** (Django REST Framework) dengan mekanisme *short-lived access token* dan *long-lived refresh token* untuk keamanan optimal.

| Fitur | Deskripsi |
|---|---|
| Registrasi Akun | Pendaftaran dengan email, password (min. 8 karakter), dan nama lengkap. Email harus unik di sistem. |
| Login | Autentikasi menggunakan email dan password. Mengembalikan access token dan refresh token. |
| Logout | Invalidasi token aktif. Sesi diterminasi secara eksplisit. |
| Refresh Token | Pembaruan access token menggunakan refresh token yang masih valid. |
| Manajemen Profil | Pengguna dapat memperbarui nama lengkap, foto profil (avatar), dan bio singkat. |

---

### 5.2 Modul Manajemen Acara

Inti dari platform Eventra. Modul ini memungkinkan Organizer untuk mengelola siklus hidup acara secara penuh—dari draft hingga selesai.

**Status Siklus Hidup Acara:**
```
Draft → Published → Ongoing → Completed
                 ↘ Cancelled
```

| Fitur | Aktor | Deskripsi |
|---|---|---|
| Buat Acara | Organizer | Input: judul, deskripsi, kategori, lokasi, tanggal, kapasitas, harga tiket, banner. Status awal: *draft*. |
| Edit Acara | Organizer | Dapat diedit selama belum *completed* dan organizer adalah pemiliknya. |
| Hapus Acara | Organizer | Penghapusan permanen. Hanya bisa dilakukan oleh pemilik acara. |
| Publikasi Acara | Organizer | Mengubah status dari *draft* ke *published*, sehingga acara tampil di listing publik. |
| Batalkan Acara | Organizer | Mengubah status ke *cancelled*. |
| Jelajahi Acara | Guest, Attendee | Daftar acara *published* dengan pagination, search by keyword, filter by kategori, filter by status. |
| Detail Acara | Semua | Menampilkan semua informasi acara termasuk kapasitas tersisa secara real-time. |

**Kategori Acara yang Tersedia:**
- Seminar
- Workshop
- Competition
- Webinar
- Conference

---

### 5.3 Modul Sistem Pemesanan (Booking)

Modul ini menangani seluruh alur reservasi tiket dengan validasi kapasitas otomatis untuk mencegah *overbooking*.

| Fitur | Deskripsi |
|---|---|
| Buat Pemesanan | Attendee memilih acara dan membuat pemesanan. Sistem otomatis memvalidasi kapasitas sebelum booking dibuat. |
| Validasi Kapasitas | Jika kapasitas penuh, pemesanan ditolak dengan pesan error yang informatif. |
| Riwayat Pemesanan | Attendee dapat melihat semua pemesanan mereka beserta statusnya. |
| Detail Pemesanan | Informasi lengkap: kode booking, nama acara, tanggal, harga asli, diskon, harga final, dan status pembayaran. |
| Batalkan Pemesanan | Attendee dapat membatalkan pemesanan selama tiket belum digenerate. |

**Status Pemesanan:**
```
pending_payment → paid → [Tiket Digenerate]
              ↘ failed
              ↘ cancelled
```

---

### 5.4 Modul Kupon & Diskon

Modul ini memberikan Organizer alat untuk menjalankan kampanye promosi yang terstruktur dan terkontrol per-acara.

| Fitur | Deskripsi |
|---|---|
| Buat Kupon | Organizer membuat kupon dengan kode unik, tipe diskon, nilai diskon, batas penggunaan, dan tanggal kedaluwarsa. |
| Edit & Hapus Kupon | Pengelolaan kupon yang sudah dibuat. |
| Validasi Kupon | Saat checkout, sistem memvalidasi: kode valid, masih aktif, belum kedaluwarsa, dan belum mencapai batas penggunaan. |
| Kalkulasi Diskon | Sistem menghitung harga final berdasarkan tipe diskon (persentase atau nominal tetap). |
| Pelacakan Penggunaan | Setiap penggunaan kupon yang berhasil otomatis menambah counter `used_count`. |

**Tipe Diskon yang Didukung:**
- **Persentase** (`percentage`): Misal `HEMAT20` memberikan diskon 20% dari harga tiket.
- **Nominal Tetap** (`fixed`): Misal `DISKON10K` memberikan potongan Rp10.000 dari harga tiket.

---

### 5.5 Modul Simulasi Pembayaran

Karena Eventra adalah proyek portofolio, integrasi payment gateway nyata (Midtrans, Stripe, dll.) tidak termasuk dalam scope v1.0. Sebagai gantinya, modul ini menyediakan simulasi alur pembayaran yang realistis.

| Aksi Simulasi | Hasil |
|---|---|
| `success` | Status booking berubah ke *paid*, tiket otomatis digenerate |
| `pending` | Status booking tetap *pending_payment*, menunggu konfirmasi |
| `failed` | Status booking berubah ke *failed*, tiket tidak digenerate |

**Nilai Edukatif:**
Simulasi ini mendemonstrasikan pemahaman tentang webhook payment, state machine transaksi, dan pemisahan antara *booking state* dengan *payment state* dalam arsitektur e-commerce nyata.

---

### 5.6 Modul Tiket & QR Code

Setelah pembayaran berhasil dikonfirmasi, sistem secara otomatis menjalankan pipeline generasi tiket.

| Fitur | Deskripsi |
|---|---|
| Generasi Tiket Otomatis | Dipicu oleh event pembayaran sukses. Tiket dibuat dengan kode unik yang tidak dapat diduplikasi. |
| Generasi QR Code | Tiket code dikodekan menjadi QR Code menggunakan library `qrcode` + `Pillow`. QR disimpan sebagai file gambar. |
| Lihat Tiket | Attendee dapat melihat detail tiket: kode tiket, QR Code, nama acara, nama peserta, tanggal, dan lokasi. |
| Unduh Tiket (PDF) | Attendee dapat mengunduh tiket dalam format PDF untuk disimpan atau dicetak. |
| Pengiriman Email | Setelah tiket digenerate, sistem mengirimkan email berisi tiket ke alamat email terdaftar Attendee. |

**Status Tiket:**
```
unused → used (setelah check-in berhasil)
       → expired (jika acara sudah selesai)
```

---

### 5.7 Modul Check-In (Validasi Kehadiran)

Modul ini memungkinkan Organizer untuk memverifikasi kehadiran peserta secara digital menggunakan QR Code yang tertera di tiket.

| Fitur | Deskripsi |
|---|---|
| Validasi Tiket | Organizer memasukkan kode tiket (hasil scan QR). Sistem memeriksa validitas tiket. |
| Proses Check-In | Jika tiket valid dan berstatus *unused*, sistem mengubah status ke *used* dan mencatat waktu check-in. |
| Pencegahan Duplikasi | Tiket yang sudah berstatus *used* akan ditolak dengan pesan *"Tiket sudah digunakan"*. |
| Hasil Validasi | Sistem mengembalikan tiga kemungkinan: `valid`, `already_used`, atau `invalid`. |

---

### 5.8 Modul Organizer Dashboard

Dashboard terpusat yang memberikan Organizer visibilitas penuh atas performa acara-acara mereka.

| Widget/Fitur | Data yang Ditampilkan |
|---|---|
| Kartu Statistik | Total acara aktif, total tiket terjual, total pendapatan (dari acara berbayar), jumlah kehadiran. |
| Daftar Peserta | Tabel lengkap per-acara: kode tiket, nama, email, tanggal booking, dan status tiket. |
| Analitik Acara | Statistik detail per-acara: kapasitas vs. tiket terjual, tingkat kehadiran, dan breakdown per-status. |
| Manajemen Acara | Tampilan semua acara yang dibuat beserta status dan aksi cepat (edit, publish, cancel). |
| Manajemen Kupon | Tampilan dan pengelolaan kupon per-acara beserta statistik penggunaannya. |
| Scanner Check-In | Antarmuka untuk input kode QR dan melihat hasil validasi secara real-time. |

---

### 5.9 Modul Admin Panel

Panel administrasi yang memberikan kendali penuh kepada pengelola platform.

| Fitur | Deskripsi |
|---|---|
| Manajemen Pengguna | Melihat daftar semua pengguna terdaftar beserta peran dan status akun mereka. |
| Suspend Pengguna | Menangguhkan akun pengguna yang melanggar ketentuan. Pengguna yang ditangguhkan tidak dapat login. |
| Aktivasi Pengguna | Mengaktifkan kembali akun yang sebelumnya ditangguhkan. |
| Moderasi Acara | Melihat semua acara di platform dan menghapus konten yang tidak sesuai. |
| Statistik Platform | Dashboard ringkasan: total pengguna, total acara, total transaksi, dan total pendapatan platform. |

---

## 6. Alur Sistem Utama

### 6.1 Alur Lengkap Pemesanan Tiket (Happy Path)

```
[Attendee]
    │
    ▼
Jelajahi Daftar Acara (GET /api/v1/events)
    │
    ▼
Pilih Acara & Lihat Detail (GET /api/v1/events/{id})
    │
    ▼
Klik "Pesan Tiket"
    │
    ▼
[Opsional] Masukkan Kode Kupon
    │   POST /api/v1/coupons/validate
    │   ↓ Sistem validasi: aktif, belum exp, belum limit
    │   ↓ Harga final dikalkulasi
    │
    ▼
Review Ringkasan Pemesanan
(harga asli, diskon, harga final)
    │
    ▼
Konfirmasi & Buat Booking (POST /api/v1/bookings)
    │   ↓ Sistem cek kapasitas
    │   ↓ Booking dibuat → status: pending_payment
    │   ↓ Booking Code digenerate (e.g. BK-2026-001)
    │
    ▼
Halaman Simulasi Pembayaran
    │
    ├── [Pilih "Sukses"] POST /api/v1/payments {result: "success"}
    │       ↓ Status booking → paid
    │       ↓ Trigger: Generate Ticket
    │           ↓ Ticket Code digenerate (e.g. TCK-2026-001)
    │           ↓ QR Code digenerate dari Ticket Code
    │           ↓ Ticket disimpan ke database
    │           ↓ Email dikirim ke Attendee
    │       ↓ Redirect ke halaman "Tiket Saya"
    │
    ├── [Pilih "Pending"] POST /api/v1/payments {result: "pending"}
    │       ↓ Status booking → pending_payment
    │       ↓ Tidak ada tiket yang digenerate
    │
    └── [Pilih "Gagal"] POST /api/v1/payments {result: "failed"}
            ↓ Status booking → failed
            ↓ Tidak ada tiket yang digenerate
```

---

### 6.2 Alur Check-In Peserta di Lokasi Acara

```
[Organizer] Buka halaman Check-In Scanner
    │
    ▼
Scan QR Code dari tiket Attendee
(atau input manual kode tiket)
    │
    ▼
POST /api/v1/check-ins/validate
{ticket_code: "TCK-2026-001"}
    │
    ├── [Status: unused] → Tiket Valid
    │       ↓
    │   POST /api/v1/check-ins
    │       ↓ Ticket status → used
    │       ↓ Check-in record dibuat (waktu, oleh siapa)
    │       ↓ Tampil: ✅ "Check-in Berhasil - [Nama Peserta]"
    │
    ├── [Status: used] → Tiket Sudah Digunakan
    │       ↓ Tampil: ⚠️ "Tiket sudah dipakai sebelumnya"
    │
    └── [Tidak ditemukan] → Tiket Tidak Valid
            ↓ Tampil: ❌ "Tiket tidak valid"
```

---

### 6.3 Alur Publikasi Acara oleh Organizer

```
[Organizer] Login
    │
    ▼
Buka Dashboard → Buat Acara Baru
    │
    ▼
Isi Form Acara:
- Judul, Deskripsi, Kategori
- Lokasi (nama & alamat)
- Tanggal & Waktu Acara
- Kapasitas Peserta
- Harga Tiket (0 = gratis)
- Unggah Banner
    │
    ▼
POST /api/v1/events
    │   ↓ Validasi Serializer (DRF)
    │   ↓ EventService.create_event() dipanggil
    │   ↓ Event disimpan → status: draft
    │
    ▼
[Opsional] Tambah Kupon Diskon
POST /api/v1/events/{id}/coupons
    │
    ▼
Klik "Publikasi Acara"
POST /api/v1/events/{id}/publish
    │   ↓ EventService.publish_event() dipanggil
    │   ↓ Status → published
    │   ↓ published_at di-set ke waktu sekarang
    │
    ▼
Acara muncul di listing publik ✅
```

---

## 7. Teknologi & Keputusan Arsitektur

### 7.1 Stack Teknologi Lengkap

| Layer | Teknologi | Versi / Keterangan |
|---|---|---|
| **Frontend Framework** | React | Dengan TypeScript untuk type safety |
| **Build Tool** | Vite | Lebih cepat dari Create React App, HMR optimal |
| **Styling** | Tailwind CSS | Utility-first, design system kustom |
| **Routing** | React Router | Client-side routing untuk SPA |
| **Server State** | TanStack Query (React Query) | Caching, invalidation, loading/error states |
| **Form Handling** | React Hook Form | Performa tinggi, uncontrolled components |
| **Validasi Schema** | Zod | Type-safe validation, terintegrasi dengan RHF |
| **HTTP Client** | Axios (via shared/api) | Interceptor untuk JWT, terpusat di shared layer |
| **Backend Framework** | Django + DRF | Mature, battle-tested, ekosistem kaya |
| **Autentikasi** | Simple JWT | JWT access + refresh token |
| **Database** | PostgreSQL | Relational, ACID-compliant, cocok untuk transaksi |
| **QR Code** | qrcode + Pillow | Generasi QR Code server-side |
| **Email Service** | Django Email Backend | Pengiriman tiket via email |

---

### 7.2 Alasan di Balik Keputusan Arsitektur

**Mengapa Django REST Framework (bukan FastAPI atau Express)?**
Django DRF dipilih karena ekosistemnya yang matang untuk proyek yang membutuhkan banyak fitur bawaan (ORM yang kuat, admin panel, serializer, permission system). Untuk proyek berskala portofolio dengan kompleksitas domain yang nyata, Django memberikan struktur yang jelas dan produktivitas yang tinggi.

**Mengapa Modular Monolith (bukan Microservices)?**
Microservices menambahkan kompleksitas operasional (service discovery, distributed tracing, inter-service communication) yang tidak sebanding untuk skala proyek ini. Modular Monolith memberikan manfaat dari separation of concerns tanpa overhead infrastruktur. Dengan pola layering yang ketat, migrasi ke microservices di masa depan pun tetap memungkinkan.

**Mengapa TanStack Query (bukan Redux)?**
Sebagian besar state dalam aplikasi web adalah *server state* (data yang di-fetch dari API). TanStack Query didesain khusus untuk menangani ini: caching otomatis, background refetching, deduplication request, dan penanganan loading/error state yang elegan—tanpa boilerplate Redux yang berlebihan.

**Mengapa React Hook Form + Zod?**
React Hook Form menggunakan *uncontrolled components* yang tidak memicu re-render pada setiap keystroke, sehingga form yang kompleks tetap performatif. Zod menyediakan schema validation yang *type-safe* dan terintegrasi sempurna dengan TypeScript, memastikan validasi di frontend konsisten dengan tipe data yang diharapkan backend.

**Mengapa Feature-Based Structure di Frontend?**
Struktur berbasis fitur (`features/events/`, `features/bookings/`, dll.) memastikan setiap fitur bersifat *self-contained*: komponen, hooks, services, dan types-nya berada dalam satu folder. Ini mempermudah navigasi kode, meminimalisir coupling antar fitur, dan memudahkan penghapusan atau penambahan fitur tanpa efek samping.

---

### 7.3 Pola Arsitektur Backend: Layered Architecture

```
HTTP Request
    │
    ▼
┌─────────────────────────────────────┐
│           API Layer (Views)          │
│  • Thin views                        │
│  • Request parsing                   │
│  • Serializer execution              │
│  • Memanggil Service                 │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│         Service Layer                │
│  • Business logic                    │
│  • Validasi aturan bisnis            │
│  • Orkestrasi operasi                │
│  • Memanggil Selector / Model        │
│  • Tidak mengembalikan HTTP response │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│         Selector Layer               │
│  • Query logic (READ-ONLY)           │
│  • get_event_by_slug()               │
│  • list_event_participants()         │
│  • Tidak boleh melakukan mutasi data │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│           Model Layer                │
│  • Lightweight declarations          │
│  • Relasi & constraints              │
│  • Helper sederhana                  │
│  • Tidak mengandung business logic   │
└────────────────┬────────────────────┘
                 │
                 ▼
           PostgreSQL
```

**Contoh nyata dalam kode:**

```
# API Layer (thin view)
class BookingCreateView(APIView):
    def post(self, request):
        serializer = BookingCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        booking = create_booking(
            attendee=request.user,
            **serializer.validated_data
        )
        return Response(BookingOutputSerializer(booking).data)

# Service Layer (business logic)
def create_booking(attendee, event_id, coupon_code=None):
    event = get_event_by_id(event_id)          # Selector
    validate_event_capacity(event)              # Business rule
    coupon = resolve_coupon(event, coupon_code) # Selector + validation
    discount = calculate_discount(event, coupon)
    booking = Booking.objects.create(...)
    return booking

# Selector Layer (read-only queries)
def get_event_by_id(event_id):
    return Event.objects.select_related('organizer', 'category').get(id=event_id)
```

---

### 7.4 Struktur Folder Proyek

**Backend:**
```
backend/
└── apps/
    ├── accounts/          # User & Profile
    │   ├── api/
    │   ├── services/
    │   ├── selectors/
    │   ├── models/
    │   ├── serializers/
    │   ├── permissions/
    │   └── tests/
    ├── events/            # Event Management
    ├── bookings/          # Booking System
    ├── payments/          # Payment Simulation
    ├── tickets/           # Ticket & QR
    ├── coupons/           # Coupon System
    ├── analytics/         # Dashboard Data
    └── audit_logs/        # Activity Tracking
```

**Frontend:**
```
frontend/src/
├── app/
│   ├── router/            # React Router config
│   └── providers/         # Global providers (QueryClient, etc.)
├── features/
│   ├── auth/              # Login, Register, Token
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── events/            # Event listing, detail, form
│   ├── bookings/          # Booking flow, history
│   ├── coupons/           # Coupon management
│   ├── tickets/           # Ticket view, download
│   ├── dashboard/         # Organizer dashboard
│   └── admin/             # Admin panel
├── shared/
│   ├── api/               # Axios instance + interceptors
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Global hooks
│   ├── lib/               # Utility functions
│   └── types/             # Global TypeScript types
└── pages/                 # Route-level page components
```

---

## 8. Design System: Coral & Charcoal

Eventra menggunakan design system kustom yang dinamakan **"Coral & Charcoal"**—dirancang secara khusus untuk menghindari tampilan generik template AI atau Bootstrap default.

### 8.1 Palet Warna

| Peran | Nama | Hex | Penggunaan |
|---|---|---|---|
| **Primary** | Coral/Tangerine | `#FF5A36` | CTA button, highlight, active state |
| **Text Utama** | Deep Charcoal | `#1F2937` | Heading, teks konten |
| **Background** | Soft Light Gray | `#F9FAFB` | Background halaman |
| **Surface/Card** | Pure White | `#FFFFFF` | Card, modal, panel |
| **Success/Valid** | Emerald | `#10B981` | Status sukses, badge aktif |

### 8.2 Tipografi

- **Font:** Inter (Google Fonts) — bersih, modern, sangat mudah dibaca di layar.
- **Heading:** `font-bold` / `font-extrabold`, Deep Charcoal, `tracking-tight`.
- **Body Text:** `font-normal` / `font-medium`, Light Charcoal (`text-gray-600`).

### 8.3 Prinsip Komponen

- **Sudut:** `rounded-xl` atau `rounded-2xl` — modern namun tidak terlalu membulat.
- **Shadow:** Subtle dan ringan (`shadow-sm`) — menghindari kesan berat atau kuno.
- **Primary Button:** Solid Coral + teks putih tebal + efek `hover:scale-[1.02]`.
- **Secondary Button:** Outline atau soft gray background — tidak pernah gelap atau terlalu berwarna.
- **Tabel & Dashboard:** Borderless dengan divider tipis (`divide-y divide-gray-100`).

### 8.4 State Guidelines

- **Empty State:** Centered, ilustrasi/ikon minimalis, teks abu-abu lembut, langsung diikuti primary action button.
- **Error State:** `bg-red-50 text-red-700 rounded-lg` — pastel, tidak mencolok atau menakutkan.
- **Success State:** `bg-emerald-50 text-emerald-700 rounded-lg` — menenangkan dan informatif.

---

## 9. Keamanan & Business Rules

### 9.1 Keamanan Sistem

| Aspek | Implementasi |
|---|---|
| Password Storage | Hashing dengan Django's default (PBKDF2 + SHA256) |
| Autentikasi | JWT Bearer Token — access token short-lived, refresh token long-lived |
| Otorisasi | Role-Based Access Control (RBAC) — setiap endpoint diproteksi permission class |
| Input Validation | DRF Serializer (backend) + Zod schema (frontend) |
| SQL Injection | Dicegah otomatis oleh Django ORM (parameterized queries) |
| XSS Protection | Django template escaping + React JSX escaping |
| CSRF | CSRF Protection aktif untuk session-based endpoints |
| ID Exposure | UUID digunakan untuk entitas yang terekspos publik |

### 9.2 Business Rules Kritis

**Kapasitas Acara:**
Pemesanan tiket tidak dapat dilakukan jika jumlah booking berstatus `paid` sudah sama dengan atau melebihi `capacity` acara. Validasi ini dilakukan di Service Layer sebelum booking record dibuat.

**Acara Gratis vs Berbayar:**
- Jika `ticket_price == 0`, alur pembayaran dilewati (bypass). Tiket digenerate langsung setelah booking dikonfirmasi.
- Jika `ticket_price > 0`, pembayaran harus dikonfirmasi terlebih dahulu sebelum tiket dapat digenerate.

**Validasi Kupon:**
Kupon hanya valid jika memenuhi *semua* kondisi berikut secara bersamaan:
1. `is_active == True`
2. `expires_at > now()` (belum kedaluwarsa)
3. `used_count < usage_limit` (belum mencapai batas penggunaan)
4. Kupon terdaftar untuk acara yang sedang dipesan

**Penggunaan Tiket:**
Setiap tiket hanya dapat di-check-in satu kali. Upaya check-in tiket yang sudah berstatus `used` akan ditolak oleh sistem.

**Hak Kepemilikan:**
Organizer hanya dapat mengedit, menghapus, atau mengelola acara yang ia buat sendiri. Akses ke acara milik Organizer lain akan mengembalikan HTTP 403 Forbidden.

---

## 10. Struktur Database & Entitas Utama

Eventra menggunakan PostgreSQL dengan 10 tabel utama. Semua tabel menggunakan konvensi penamaan `snake_case` dan menyertakan kolom `created_at` / `updated_at` pada entitas yang relevan.

### Gambaran Relasi Antar Entitas

```
users (1) ──────── (1) profiles
  │
  ├── (1:N) ──── events
  │                 │
  │                 ├── (1:N) ── coupons
  │                 │
  │                 ├── (1:N) ── bookings ── (1:1) ── payments
  │                 │                │
  │                 │                └── (1:1) ── tickets ── (1:1) ── check_ins
  │                 │
  │                 └── (1:N) ── tickets
  │
  └── (1:N) ──── bookings

categories (1) ── (1:N) ── events
```

### Entitas & Tujuan

| Entitas | Tujuan |
|---|---|
| `users` | Menyimpan data autentikasi (email, password hash, role) |
| `profiles` | Menyimpan data profil pengguna (nama, avatar, bio) |
| `categories` | Klasifikasi acara (Seminar, Workshop, dll.) |
| `events` | Data utama acara termasuk kapasitas, harga, dan status |
| `coupons` | Data kupon diskon yang terikat ke suatu acara |
| `bookings` | Rekaman reservasi tiket beserta harga dan status pembayaran |
| `payments` | Detail transaksi pembayaran (referensi, metode, status) |
| `tickets` | Tiket yang digenerate pasca-pembayaran beserta QR code path |
| `check_ins` | Rekaman kehadiran peserta: kapan, dan dicek-in oleh siapa |
| `audit_logs` | Log aktivitas penting sistem untuk keperluan audit dan debugging |

---

## 11. API Overview

Semua endpoint menggunakan prefix `/api/v1/` dan mengembalikan response dalam format standar:

**Success Response:**
```json
{
  "success": true,
  "data": {}
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Deskripsi error yang informatif"
}
```

### Ringkasan Endpoint Utama

| Method | Endpoint | Deskripsi | Auth |
|---|---|---|---|
| POST | `/auth/register` | Registrasi akun baru | Publik |
| POST | `/auth/login` | Login, mendapatkan token | Publik |
| POST | `/auth/refresh` | Refresh access token | Publik |
| GET | `/events` | Daftar acara (search, filter, paginate) | Publik |
| GET | `/events/{id}` | Detail acara | Publik |
| POST | `/events` | Buat acara baru | Organizer |
| POST | `/events/{id}/publish` | Publikasikan acara | Organizer |
| POST | `/bookings` | Buat pemesanan tiket | Attendee |
| POST | `/payments` | Simulasi pembayaran | Attendee |
| GET | `/tickets/{id}/download` | Unduh tiket PDF | Attendee |
| POST | `/check-ins` | Check-in peserta via kode tiket | Organizer |
| GET | `/dashboard/summary` | Statistik dashboard organizer | Organizer |
| GET | `/admin/users` | Daftar semua pengguna | Admin |

---

## 12. Roadmap & Rencana Pengembangan

### v1.0 — MVP (Saat Ini)
Mencakup seluruh fitur inti yang telah dijabarkan dalam dokumen ini: autentikasi, manajemen acara, booking, kupon, simulasi pembayaran, QR ticketing, check-in, dashboard organizer, dan admin panel.

### v2.0 — Planned Enhancements

| Fitur | Deskripsi |
|---|---|
| Real Payment Gateway | Integrasi dengan Midtrans atau Stripe untuk pembayaran nyata |
| Wishlist Acara | Attendee dapat menyimpan acara yang diminati |
| Ulasan & Rating | Sistem review pasca-acara dari peserta |
| Recommendation Engine | Saran acara berdasarkan histori dan preferensi pengguna |
| Push Notifications | Notifikasi real-time untuk reminder acara dan update status |
| Mobile Application | Aplikasi React Native untuk iOS dan Android |
| Organizer Teams | Memungkinkan satu acara dikelola oleh beberapa Organizer |
| Advanced Analytics | Dashboard analitik lanjutan dengan visualisasi data interaktif |
| Multi-Ticket Booking | Pemesanan lebih dari satu tiket dalam satu transaksi |
| Redis Caching | Caching untuk endpoint listing acara yang sering diakses |
| Celery Task Queue | Background job untuk email delivery dan pemrosesan asinkron |

---

*Dokumen ini terakhir diperbarui: Juni 2026 | Versi Platform: 1.0*
