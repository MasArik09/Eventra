import { createContext, useContext, useState, useEffect } from 'react'

const CurrencyContext = createContext(null)

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(() => {
    return localStorage.getItem('preferred_currency') || 'USD'
  })

  const [exchangeRate, setExchangeRate] = useState(() => {
    const cached = localStorage.getItem('exchange_rate_usd_idr')
    return cached ? parseFloat(cached) : 15000 // fallback rate
  })

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const response = await fetch('https://api.frankfurter.app/latest?base=USD&symbols=IDR')
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        const rate = data.rates?.IDR
        if (rate) {
          setExchangeRate(rate)
          localStorage.setItem('exchange_rate_usd_idr', rate.toString())
          console.log(`Successfully fetched real-time exchange rate: 1 USD = ${rate} IDR`)
        }
      } catch (error) {
        console.warn('Failed to fetch real-time exchange rate, using fallback:', error)
      }
    }
    fetchRate()
  }, [])

  const setCurrency = (val) => {
    localStorage.setItem('preferred_currency', val)
    setCurrencyState(val)
  }

  const formatPrice = (usdAmount) => {
    if (usdAmount === 0 || usdAmount === '0' || usdAmount === 'Free' || usdAmount === 'free') {
      return 'Free'
    }
    
    // Parse input to float if it is a string with formatting
    let amount = usdAmount
    if (typeof usdAmount === 'string') {
      const clean = usdAmount.replace(/[^0-9.]/g, '')
      amount = parseFloat(clean)
    }

    if (isNaN(amount)) return usdAmount

    if (currency === 'IDR') {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount * exchangeRate)
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, exchangeRate }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
export default CurrencyContext
