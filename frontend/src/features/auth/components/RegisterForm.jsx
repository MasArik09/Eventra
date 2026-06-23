import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const registerSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  full_name: z.string().min(1, 'Full name is required').max(100, 'Full name is too long'),
  role: z.enum(['attendee', 'organizer']),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
  confirm_password: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ['confirm_password'],
})

export default function RegisterForm() {
  const { register: registerAPI } = useAuth()
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [apiSuccess, setApiSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      full_name: '',
      role: 'attendee',
      password: '',
      confirm_password: '',
    },
  })

  const onSubmit = async (data) => {
    setApiError('')
    setApiSuccess('')
    setLoading(true)
    try {
      const response = await registerAPI({
        email: data.email,
        full_name: data.full_name,
        role: data.role,
        password: data.password,
        confirm_password: data.confirm_password,
      })
      if (response.success) {
        setApiSuccess('Account created successfully! Redirecting to login...')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.detail || 'An error occurred during registration.'
      setApiError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-white border border-charcoal-light/10 relative shadow-xl shadow-charcoal/5">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-coral to-charcoal-light rounded-t-3xl" />
      <h2 className="text-2xl font-bold text-charcoal text-center mb-2">Create an Account</h2>
      <p className="text-charcoal-light text-sm text-center mb-8">Get started with Eventra today</p>
      
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          ⚠️ {apiError}
        </div>
      )}

      {apiSuccess && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl">
          🎉 {apiSuccess}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-charcoal-light text-xs font-semibold uppercase tracking-wider mb-2">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            {...register('full_name')}
            className={`w-full bg-stone-50 border rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal-light focus:outline-none focus:border-coral transition-colors ${
              errors.full_name ? 'border-red-400 focus:border-red-400' : 'border-charcoal-light/20'
            }`}
          />
          {errors.full_name && <p className="text-red-500 text-xs mt-1.5">{errors.full_name.message}</p>}
        </div>
        <div>
          <label className="block text-charcoal-light text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
          <input
            type="email"
            placeholder="name@example.com"
            {...register('email')}
            className={`w-full bg-stone-50 border rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal-light focus:outline-none focus:border-coral transition-colors ${
              errors.email ? 'border-red-400 focus:border-red-400' : 'border-charcoal-light/20'
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-charcoal-light text-xs font-semibold uppercase tracking-wider mb-2">I want to join as</label>
          <select
            {...register('role')}
            className="w-full bg-stone-50 border border-charcoal-light/20 rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-coral transition-colors"
          >
            <option value="attendee">Attendee (Discover & Book Events)</option>
            <option value="organizer">Organizer (Create & Manage Events)</option>
          </select>
        </div>
        <div>
          <label className="block text-charcoal-light text-xs font-semibold uppercase tracking-wider mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            {...register('password')}
            className={`w-full bg-stone-50 border rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal-light focus:outline-none focus:border-coral transition-colors ${
              errors.password ? 'border-red-400 focus:border-red-400' : 'border-charcoal-light/20'
            }`}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>}
        </div>
        <div>
          <label className="block text-charcoal-light text-xs font-semibold uppercase tracking-wider mb-2">Confirm Password</label>
          <input
            type="password"
            placeholder="••••••••"
            {...register('confirm_password')}
            className={`w-full bg-stone-50 border rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal-light focus:outline-none focus:border-coral transition-colors ${
              errors.confirm_password ? 'border-red-400 focus:border-red-400' : 'border-charcoal-light/20'
            }`}
          />
          {errors.confirm_password && <p className="text-red-500 text-xs mt-1.5">{errors.confirm_password.message}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-coral hover:bg-coral-light disabled:bg-coral/50 text-white font-bold py-3 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
      <p className="text-center text-xs text-charcoal-light mt-6">
        Already have an account? <Link to="/login" className="text-coral hover:underline">Sign in</Link>
      </p>
    </div>
  )
}
