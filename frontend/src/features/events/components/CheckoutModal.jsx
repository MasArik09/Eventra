import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrency } from '../../../shared/context/CurrencyContext'

export default function CheckoutModal({ event, onClose, onSuccess }) {
  const navigate = useNavigate()
  const { currency, setCurrency, formatPrice, exchangeRate } = useCurrency()

  const [step, setStep] = useState('input') // 'input', 'processing', 'result'
  const [couponCode, setCouponCode] = useState('')
  const [couponDiscount, setCouponDiscount] = useState(0) // fraction (e.g. 0.1 for 10%)
  const [couponError, setCouponError] = useState('')
  const [couponSuccess, setCouponSuccess] = useState('')
  
  // Payment Form State
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('success') // 'success', 'pending', 'failure'
  const [processingMsg, setProcessingMsg] = useState('Verifying payment details...')
  const [errorMessage, setErrorMessage] = useState('')

  // Calculate prices
  const originalPriceUsd = event.price || 0
  const discountAmountUsd = originalPriceUsd * couponDiscount
  const finalPriceUsd = Math.max(0, originalPriceUsd - discountAmountUsd)

  // Apply Coupon Code
  const handleApplyCoupon = (e) => {
    e.preventDefault()
    setCouponError('')
    setCouponSuccess('')

    const code = couponCode.trim().toUpperCase()
    if (code === 'EVENTRA10') {
      setCouponDiscount(0.1)
      setCouponSuccess('Promo Applied: 10% Discount!')
    } else if (code === 'WELCOME5') {
      // 5 USD discount
      const rate = originalPriceUsd > 0 ? (5 / originalPriceUsd) : 0
      setCouponDiscount(Math.min(1, rate))
      setCouponSuccess('Promo Applied: $5.00 Off!')
    } else if (code === '') {
      setCouponError('Please enter a coupon code.')
    } else {
      setCouponError('Invalid coupon code. Try "EVENTRA10".')
    }
  }

  // Handle Payment Submit
  const handlePayment = (e) => {
    e.preventDefault()
    if (originalPriceUsd > 0 && (!cardNumber || !cardName || !expiry || !cvv)) {
      setErrorMessage('Please fill in all credit card details.')
      return
    }

    setErrorMessage('')
    setStep('processing')

    // Simulate Processing Steps
    setTimeout(() => {
      setProcessingMsg('Securing seat allocations...')
      setTimeout(() => {
        setProcessingMsg('Generating encrypted QR check-in token...')
        setTimeout(() => {
          if (paymentStatus === 'success') {
            const ticketId = `TCK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
            const newTicket = {
              id: ticketId,
              eventTitle: event.title,
              date: event.date,
              time: event.time,
              location: event.location,
              category: event.category,
              price: finalPriceUsd,
              status: 'unused',
              qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketId}`,
              bookedAt: new Date().toISOString()
            }
            setStep('result')
            onSuccess(newTicket)
          } else if (paymentStatus === 'pending') {
            setStep('result')
          } else {
            setStep('input')
            setErrorMessage('Simulated transaction failed. Please select "Success" in the simulation controls.')
          }
        }, 1200)
      }, 1000)
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      
      {/* Modal Surface */}
      <div className="bg-white rounded-3xl border border-charcoal-light/10 w-full max-w-lg p-6 sm:p-8 shadow-2xl relative overflow-hidden my-8">
        
        {/* Close Button */}
        {step !== 'processing' && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-charcoal-light hover:text-charcoal text-2xl font-bold transition-colors cursor-pointer"
          >
            &times;
          </button>
        )}

        {/* STEP 1: PAYMENT FORM INPUT */}
        {step === 'input' && (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-coral px-3 py-1 rounded-full bg-coral/10 border border-coral/20">
                🎫 Safe Checkout
              </span>
              <h2 className="text-2xl font-extrabold text-charcoal mt-3">Book Your Spot</h2>
              <p className="text-charcoal-light text-xs mt-1">Review event details, apply coupons, and choose currency.</p>
            </div>

            {/* Event Summary Card */}
            <div className="bg-stone-50 border border-charcoal-light/10 rounded-2xl p-4 flex gap-4">
              {event.image && (
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-16 h-16 object-cover rounded-xl border border-charcoal-light/5 flex-shrink-0"
                />
              )}
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-charcoal-light">{event.category}</span>
                <h4 className="text-sm font-bold text-charcoal leading-tight line-clamp-1">{event.title}</h4>
                <p className="text-[11px] text-charcoal-light">📍 {event.location} &bull; 📅 {event.date}</p>
              </div>
            </div>

            {/* Billing Controls (Currency Selector & Coupon) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-charcoal-light block mb-1.5">Currency Preference</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-stone-50 border border-charcoal-light/20 rounded-xl px-3 py-2 text-xs font-bold text-charcoal focus:outline-none focus:border-coral transition-colors cursor-pointer"
                >
                  <option value="USD">USD ($)</option>
                  <option value="IDR">IDR (Rp)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-charcoal-light block mb-1.5">Apply Promo Code</label>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. EVENTRA10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow bg-stone-50 border border-charcoal-light/20 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-coral transition-colors"
                  />
                  <button 
                    type="submit"
                    className="bg-charcoal hover:bg-charcoal-light text-white text-[10px] font-extrabold px-3 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {couponError && <p className="text-red-500 text-[10px] font-semibold mt-1">{couponError}</p>}
                {couponSuccess && <p className="text-emerald-600 text-[10px] font-semibold mt-1">{couponSuccess}</p>}
              </div>
            </div>

            {/* Price Summary Breakdown */}
            <div className="bg-stone-50 border border-charcoal-light/10 rounded-2xl p-4 space-y-2.5 text-xs text-charcoal-light">
              <div className="flex justify-between">
                <span>Original Price</span>
                <span className="font-semibold text-charcoal">{formatPrice(originalPriceUsd)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(discountAmountUsd)}</span>
                </div>
              )}
              <hr className="border-charcoal-light/5" />
              <div className="flex justify-between text-sm text-charcoal font-bold">
                <span>Total Amount Due</span>
                <span className="text-coral text-lg font-black">{formatPrice(finalPriceUsd)}</span>
              </div>
            </div>

            {/* Card Form & Simulation controls */}
            <form onSubmit={handlePayment} className="space-y-4">
              {originalPriceUsd > 0 && (
                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase font-extrabold tracking-wider text-charcoal-light border-b border-charcoal-light/5 pb-1">Payment Method (Simulated Visa/MC)</h4>
                  
                  <div>
                    <label className="text-[9px] uppercase font-bold tracking-wider text-charcoal-light block mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-stone-50 border border-charcoal-light/20 rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-coral transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-charcoal-light block mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full bg-stone-50 border border-charcoal-light/20 rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-coral transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase font-bold tracking-wider text-charcoal-light block mb-1">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full bg-stone-50 border border-charcoal-light/20 rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-coral transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[9px] uppercase font-bold tracking-wider text-charcoal-light block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full bg-stone-50 border border-charcoal-light/20 rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-coral transition-colors"
                      />
                    </div>
                    
                    {/* Sandbox Mode Selector */}
                    <div className="col-span-2">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-charcoal-light block mb-1">Simulation Result</label>
                      <select
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                        className="w-full bg-coral/5 border border-coral/20 rounded-xl px-3 py-2.5 text-xs font-bold text-coral focus:outline-none cursor-pointer"
                      >
                        <option value="success">Success Scenario</option>
                        <option value="pending">Pending Payment Scenario</option>
                        <option value="failure">Failure Scenario</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                  ⚠️ {errorMessage}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 bg-stone-100 hover:bg-stone-200 border border-charcoal-light/10 text-charcoal text-xs font-extrabold py-3.5 rounded-xl transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-coral hover:bg-coral-light text-white text-xs font-extrabold py-3.5 rounded-xl shadow-md shadow-coral/10 hover:shadow-coral/20 transition-all transform hover:-translate-y-0.5 cursor-pointer text-center"
                >
                  {finalPriceUsd === 0 ? 'Claim Free Ticket' : `Pay ${formatPrice(finalPriceUsd)}`}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: PROCESSING OVERLAY */}
        {step === 'processing' && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-16 h-16 border-4 border-coral/30 border-t-coral rounded-full animate-spin" />
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-charcoal">Processing Simulated Transaction</h3>
              <p className="text-charcoal-light text-xs animate-pulse">{processingMsg}</p>
            </div>
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-charcoal-light">Secure Payment Sandbox</span>
          </div>
        )}

        {/* STEP 3: RESULTS (PENDING STATUS VIEW - SUCCESS IS ROUTED TO DASHBOARD) */}
        {step === 'result' && (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-6">
            {paymentStatus === 'success' ? (
              <>
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-250 rounded-full flex items-center justify-center text-3xl shadow-sm text-emerald-500">
                  ✅
                </div>
                <div className="space-y-2 max-w-sm">
                  <h3 className="text-xl font-extrabold text-charcoal">Payment Successful!</h3>
                  <p className="text-charcoal-light text-xs leading-relaxed">
                    Your simulated transaction completed successfully. Your digital entry ticket has been issued!
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-amber-50 border border-amber-250 rounded-full flex items-center justify-center text-3xl shadow-sm text-amber-500">
                  ⏳
                </div>
                <div className="space-y-2 max-w-sm">
                  <h3 className="text-xl font-extrabold text-charcoal">Payment is Pending</h3>
                  <p className="text-charcoal-light text-xs leading-relaxed">
                    Your payment simulation returned a <strong className="text-amber-600">Pending</strong> response. Once verified by the payment gateway, the ticket will be issued.
                  </p>
                </div>
              </>
            )}
            
            <div className="bg-stone-50 border border-charcoal-light/10 rounded-2xl p-4 w-full text-xs text-charcoal-light text-left space-y-1.5">
              <p><strong>Transaction:</strong> TXN-{Math.floor(100000 + Math.random() * 900000)}</p>
              <p><strong>Status:</strong> {paymentStatus === 'success' ? 'Completed (Simulated)' : 'Pending Verification'}</p>
              <p><strong>Amount:</strong> {formatPrice(finalPriceUsd)}</p>
            </div>

            <div className="flex gap-3 w-full">
              <button
                onClick={onClose}
                className="w-1/2 bg-stone-100 hover:bg-stone-200 border border-charcoal-light/10 text-charcoal text-xs font-bold py-3.5 rounded-xl transition-all cursor-pointer"
              >
                Close Window
              </button>
              <button
                onClick={() => {
                  onClose()
                  navigate('/dashboard')
                }}
                className="w-1/2 bg-coral hover:bg-coral-light text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-md shadow-coral/10"
              >
                View Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
