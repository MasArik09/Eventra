# About Eventra: Platform Overview & Strategic Foundation

## 1. Executive Summary & Product Description
**Eventra** adalah sebuah platform manajemen acara dan pertiketan digital (*all-in-one event management and digital ticketing platform*) berbasis full-stack[cite: 3, 4]. Platform ini dirancang khusus untuk menjembatani kebutuhan antara penyelenggara acara (*organizers*) dan peserta (*attendees*) dalam satu ekosistem digital yang modern, responsif, dan terintegrasi[cite: 4, 9].

Di satu sisi, Eventra mempermudah kreator konten, komunitas, organisasi mahasiswa, hingga lembaga profesional untuk mempublikasikan acara mereka, mengelola kuota peserta, menerbitkan kupon diskon, hingga memantau penjualan tiket dan kehadiran secara real-time melalui dashboard analitik[cite: 4, 7]. Di sisi lain, Eventra memberikan pengalaman penjelajahan acara yang mulus bagi pengguna untuk menemukan kegiatan menarik, memesan tiket, melakukan simulasi pembayaran instan, hingga mendapatkan tiket elektronik berbasis kode QR yang siap diverifikasi di lokasi.

---

## 2. Problem Statement (Latar Belakang)
Banyak penyelenggara acara skala kecil hingga menengah—seperti organisasi kemahasiswaan, komunitas independen, dan UMKM—menghadapi kendala besar dalam mengelola administrasi acara secara efisien[cite: 4]. Beberapa masalah utama yang diselesaikan oleh Eventra meliputi[cite: 4]:
* **Proses Registrasi Manual:** Pendaftaran peserta sering kali masih menggunakan formulir daring terpisah yang tidak terintegrasi dengan ketersediaan kuota nyata[cite: 4].
* **Pendataan Berbasis Spreadsheet:** Manajemen data peserta yang mengandalkan pembaruan manual di lembar kerja spreadsheet sangat rentan terhadap duplikasi dan kesalahan data[cite: 4].
* **Absensi dan Verifikasi Tradisional:** Ketiadaan sistem validasi tiket digital yang cepat di pintu masuk (*gate*) acara menyebabkan antrean panjang dan risiko manipulasi tiket[cite: 4].
* **Kampanye Promosi Tidak Terpantau:** Kesulitan dalam merancang, membatasi, dan melacak efektivitas kupon promosi secara sistematis[cite: 4].

---

## 3. Vision & Mission Statements

### Visi
> "Menjadi platform manajemen acara dan pertiketan digital yang paling adaptif, ramah pengguna, dan tepercaya demi mendukung pertumbuhan komunitas kreatif serta penyebaran ilmu pengetahuan tanpa batas."[cite: 4]

### Misi
1. **Demokratisasi Manajemen Acara:** Menyediakan alat bantu manajemen yang komprehensif namun mudah dioperasikan, bahkan oleh organisasi non-profit maupun skala kecil[cite: 4].
2. **Transformasi Pengalaman Pertiketan:** Menghadirkan alur pemesanan tiket yang transparan, aman, dan instan melalui pemanfaatan e-ticket berbasis QR Code[cite: 4].
3. **Traceability & Efisiensi Operasional:** Menyediakan data yang akurat dan dapat dilacak mulai dari siklus transaksi keuangan, aktivitas sistem, hingga kehadiran peserta di lapangan[cite: 4, 8].

---

## 4. Target Users (Aktor Sistem)
Eventra membagi penggunanya ke dalam empat peran strategis dengan hak akses yang terukur[cite: 4, 7]:

* **Guest (Pengunjung):** Pengguna umum non-autentikasi yang dapat menjelajahi daftar acara, mencari berdasarkan kata kunci, menyaring berdasarkan kategori, dan mendaftarkan akun baru[cite: 4, 7].
* **Attendee (Peserta):** Pengguna terautentikasi yang memiliki kemampuan untuk melakukan pemesanan tiket, menerapkan kode kupon promosi, melihat riwayat transaksi, serta mengunduh e-ticket elektronik[cite: 4, 7].
* **Organizer (Penyelenggara):** Pengguna dengan hak istimewa yang dapat membuat, mengubah, mempublikasikan, atau membatalkan acara[cite: 4, 7]. Mereka juga berhak mengelola kupon diskon khusus acara mereka, melihat daftar peserta, memantau grafik analitik, dan melakukan pemindaian QR Code untuk check-in peserta[cite: 4, 7].
* **Administrator (Pengelola Platform):** Pihak internal yang bertanggung jawab menjaga kualitas platform, memoderasi konten acara yang melanggar aturan, serta menangguhkan atau mengaktifkan kembali akun pengguna[cite: 4, 7].

---

## 5. Strategic Technology Value (Kelebihan Arsitektur)
Eventra bukan sekadar aplikasi fungsional, melainkan sebuah proyek percontohan yang menerapkan standar industri modern:
* **Backend Monolith Modular:** Dibangun menggunakan Django REST Framework dengan pemisahan lapisan (*layered architecture*) yang ketat antara API, Services (Logika Bisnis), Selectors (Query), dan Models[cite: 3, 6, 11]. Hal ini memastikan kode sangat mudah dibaca, dirawat, dan siap jika di masa depan ingin dimigrasikan ke arsitektur microservices[cite: 5, 6].
* **Frontend Komponen Berbasis Fitur:** Menggunakan React JS dan Tailwind CSS v4 dengan pembagian modul berdasarkan fitur (*feature-based folder structure*)[cite: 3, 6, 11]. Manajemen state server dikelola secara optimal menggunakan TanStack Query untuk menghindari overhead memori[cite: 6, 11].
* **Premium & Anti-Generic Design System:** Mengusung identitas visual kustom bertema *Coral & Charcoal* yang bersih, berujung tumpul modern (*rounded-2xl*), serta menggunakan tipografi Inter yang elegan untuk memberikan impresi produk premium dan jauh dari kesan template AI standar[cite: 9].