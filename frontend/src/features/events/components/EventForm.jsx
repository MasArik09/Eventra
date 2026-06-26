import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCategories } from '../hooks/useCategories'

const eventSchema = z.object({
  title: z.string().min(1, 'Judul event wajib diisi').max(255, 'Judul terlalu panjang'),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
  date: z.string().min(1, 'Tanggal wajib diisi'),
  time: z.string().min(1, 'Waktu wajib diisi'),
  location: z.string().min(1, 'Lokasi wajib diisi'),
  price: z.preprocess((val) => Number(val), z.number().min(0, 'Harga tidak boleh negatif')),
  available_tickets: z.preprocess((val) => Number(val), z.number().int().min(0, 'Jumlah tiket tidak boleh negatif')),
  category_id: z.string().min(1, 'Pilih kategori event'),
})

export default function EventForm({ initialData, onSubmit, loading }) {
  const { data: categories = [], isLoading: isLoadingCats } = useCategories()
  const [imagePreview, setImagePreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      price: 0,
      available_tickets: 0,
      category_id: '',
    },
  })

  // Pre-populate form if initialData exists (edit mode)
  useEffect(() => {
    if (initialData) {
      setValue('title', initialData.title || '')
      setValue('description', initialData.description || '')
      setValue('date', initialData.date || '')
      setValue('time', initialData.time || '')
      setValue('location', initialData.location || '')
      setValue('price', initialData.price || 0)
      setValue('available_tickets', initialData.available_tickets || 0)
      if (initialData.category) {
        setValue('category_id', String(initialData.category.id))
      }
      if (initialData.banner) {
        setImagePreview(initialData.banner)
      }
    }
  }, [initialData, setValue])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFormSubmit = (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('date', data.date)
    formData.append('time', data.time)
    formData.append('location', data.location)
    formData.append('price', String(data.price))
    formData.append('available_tickets', String(data.available_tickets))
    formData.append('category_id', data.category_id)
    if (selectedFile) {
      formData.append('banner', selectedFile)
    }
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 max-w-3xl mx-auto bg-white p-8 rounded-3xl border border-charcoal-light/10 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-coral to-charcoal-light" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Text inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-charcoal-light text-xs font-semibold uppercase tracking-wider mb-2">Judul Event</label>
            <input
              type="text"
              placeholder="Contoh: Tech Summit 2026"
              {...register('title')}
              className={`w-full bg-stone-50 border rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal-light focus:outline-none focus:border-coral transition-colors ${
                errors.title ? 'border-red-400 focus:border-red-400' : 'border-charcoal-light/20'
              }`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1.5">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-charcoal-light text-xs font-semibold uppercase tracking-wider mb-2">Kategori</label>
            <select
              {...register('category_id')}
              className={`w-full bg-stone-50 border rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-coral transition-colors cursor-pointer ${
                errors.category_id ? 'border-red-400 focus:border-red-400' : 'border-charcoal-light/20'
              }`}
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category_id && <p className="text-red-500 text-xs mt-1.5">{errors.category_id.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-charcoal-light text-xs font-semibold uppercase tracking-wider mb-2">Tanggal</label>
              <input
                type="date"
                {...register('date')}
                className={`w-full bg-stone-50 border rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-coral transition-colors ${
                  errors.date ? 'border-red-400 focus:border-red-400' : 'border-charcoal-light/20'
                }`}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1.5">{errors.date.message}</p>}
            </div>

            <div>
              <label className="block text-charcoal-light text-xs font-semibold uppercase tracking-wider mb-2">Waktu / Jam</label>
              <input
                type="text"
                placeholder="Contoh: 19:00 - 21:00 WIB"
                {...register('time')}
                className={`w-full bg-stone-50 border rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal-light focus:outline-none focus:border-coral transition-colors ${
                  errors.time ? 'border-red-400 focus:border-red-400' : 'border-charcoal-light/20'
                }`}
              />
              {errors.time && <p className="text-red-500 text-xs mt-1.5">{errors.time.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-charcoal-light text-xs font-semibold uppercase tracking-wider mb-2">Lokasi / Tempat</label>
            <input
              type="text"
              placeholder="Contoh: Balai Kartini, Jakarta atau Online Zoom"
              {...register('location')}
              className={`w-full bg-stone-50 border rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal-light focus:outline-none focus:border-coral transition-colors ${
                errors.location ? 'border-red-400 focus:border-red-400' : 'border-charcoal-light/20'
              }`}
            />
            {errors.location && <p className="text-red-500 text-xs mt-1.5">{errors.location.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-charcoal-light text-xs font-semibold uppercase tracking-wider mb-2">Harga Tiket (USD)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0"
                {...register('price')}
                className={`w-full bg-stone-50 border rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-coral transition-colors ${
                  errors.price ? 'border-red-400 focus:border-red-400' : 'border-charcoal-light/20'
                }`}
              />
              {errors.price && <p className="text-red-500 text-xs mt-1.5">{errors.price.message}</p>}
            </div>

            <div>
              <label className="block text-charcoal-light text-xs font-semibold uppercase tracking-wider mb-2">Kuota Tiket</label>
              <input
                type="number"
                placeholder="100"
                {...register('available_tickets')}
                className={`w-full bg-stone-50 border rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-coral transition-colors ${
                  errors.available_tickets ? 'border-red-400 focus:border-red-400' : 'border-charcoal-light/20'
                }`}
              />
              {errors.available_tickets && <p className="text-red-500 text-xs mt-1.5">{errors.available_tickets.message}</p>}
            </div>
          </div>
        </div>

        {/* Right Column: Banner Upload & Description */}
        <div className="space-y-6 flex flex-col">
          <div>
            <label className="block text-charcoal-light text-xs font-semibold uppercase tracking-wider mb-2">Banner Event</label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-charcoal-light/20 rounded-2xl p-4 bg-stone-50 hover:bg-stone-100 transition-colors relative min-h-[200px]">
              {imagePreview ? (
                <div className="relative w-full h-44 rounded-xl overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null)
                      setSelectedFile(null)
                    }}
                    className="absolute top-2 right-2 bg-charcoal/80 text-white rounded-full p-1 text-xs hover:bg-charcoal transition-colors w-6 h-6 flex items-center justify-center cursor-pointer"
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <span className="text-3xl block">🖼️</span>
                  <p className="text-xs text-charcoal-light">Drag & drop or click to upload event banner</p>
                  <p className="text-[10px] text-charcoal-light/60">Supports PNG, JPG, JPEG</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex-grow flex flex-col">
            <label className="block text-charcoal-light text-xs font-semibold uppercase tracking-wider mb-2">Deskripsi Lengkap</label>
            <textarea
              placeholder="Tuliskan rincian detail event, agenda, pembicara, dll..."
              rows={6}
              {...register('description')}
              className={`w-full bg-stone-50 border rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal-light focus:outline-none focus:border-coral transition-colors flex-grow resize-none ${
                errors.description ? 'border-red-400 focus:border-red-400' : 'border-charcoal-light/20'
              }`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1.5">{errors.description.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex gap-4 border-t border-charcoal-light/5 pt-6 justify-end">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="bg-stone-100 hover:bg-stone-200 border border-charcoal-light/10 text-charcoal font-bold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-coral hover:bg-coral-light disabled:bg-coral/50 text-white font-bold text-sm px-8 py-3 rounded-xl transition-all shadow-md shadow-coral/10 hover:shadow-coral/20 cursor-pointer flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin" />
              Menyimpan...
            </>
          ) : (
            'Simpan Event'
          )}
        </button>
      </div>
    </form>
  )
}
