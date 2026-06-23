import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
})

export default function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    setApiError('')
    setLoading(true)
    try {
      await login(data.email, data.password)
      navigate('/dashboard')
    } catch (err) {
      const msg = err.response?.data?.detail || err.response?.data?.message || 'Invalid email or password.'
      setApiError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-white border border-charcoal-light/10 relative shadow-xl shadow-charcoal/5">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-coral to-charcoal-light rounded-t-3xl" />
      <h2 className="text-2xl font-bold text-charcoal text-center mb-2">Welcome Back</h2>
      <p className="text-charcoal-light text-sm text-center mb-8">Sign in to your Eventra account to continue</p>
      
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          ⚠️ {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-coral hover:bg-coral-light disabled:bg-coral/50 text-white font-bold py-3 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin" />
              Signing In...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>
      <p className="text-center text-xs text-charcoal-light mt-6">
        Don't have an account? <Link to="/register" className="text-coral hover:underline">Sign up</Link>
      </p>
    </div>
  )
}
