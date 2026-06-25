import { useCategories } from '../hooks/useCategories'

export default function CategorySelector({ value, onChange, className = '', error = '' }) {
  const { data: categories = [], isLoading } = useCategories()

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-bold uppercase tracking-wider text-charcoal">
        Kategori
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
        className={`w-full bg-stone-50 border ${
          error ? 'border-red-500' : 'border-charcoal-light/20'
        } rounded-xl px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-coral transition-colors disabled:opacity-50`}
      >
        <option value="">Pilih kategori</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  )
}
