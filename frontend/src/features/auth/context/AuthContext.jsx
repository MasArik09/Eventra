import { createContext, useContext, useState, useEffect } from 'react'
import { loginAPI, registerAPI, logoutAPI, getProfileAPI } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const restoreSession = async () => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      try {
        const profileData = await getProfileAPI()
        if (profileData && profileData.success) {
          setUser(profileData.data)
        } else {
          clearTokens()
        }
      } catch (err) {
        clearTokens()
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    restoreSession()
  }, [])

  const clearTokens = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
  }

  const login = async (email, password) => {
    try {
      const data = await loginAPI(email, password)
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      
      const profileData = await getProfileAPI()
      if (profileData && profileData.success) {
        setUser(profileData.data)
        return profileData.data
      } else {
        throw new Error('Failed to retrieve user profile.')
      }
    } catch (err) {
      clearTokens()
      throw err
    }
  }

  const register = async (registerData) => {
    return await registerAPI(registerData)
  }

  const logout = async () => {
    const refreshToken = localStorage.getItem('refresh_token')
    if (refreshToken) {
      try {
        await logoutAPI(refreshToken)
      } catch (err) {
        console.error('Logout error:', err)
      }
    }
    clearTokens()
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
export default AuthContext
