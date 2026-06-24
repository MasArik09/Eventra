import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../features/auth/context/AuthContext'
import AttendeeDashboard from '../features/dashboard/components/AttendeeDashboard'
import OrganizerDashboard from '../features/dashboard/components/OrganizerDashboard'

export default function Dashboard() {
  const { user } = useAuth()
  const isOrganizer = user?.role === 'organizer' || user?.role === 'admin'
  const [activeTab, setActiveTab] = useState('Overview')

  // Load tickets from localStorage or seed initial dummy data
  const [myTickets, setMyTickets] = useState(() => {
    const saved = localStorage.getItem('eventra_booked_tickets')
    if (saved) {
      return JSON.parse(saved)
    }
    const initialTickets = [
      {
        id: "TCK-2026-8801",
        eventTitle: "Symphony of Lights & Sound",
        date: "June 25, 2026",
        time: "7:00 PM - 11:00 PM",
        location: "Jakarta Amphitheater",
        category: "Music Concert",
        price: 75.00,
        status: "unused", // unused, used, expired
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TCK-2026-8801",
      },
      {
        id: "TCK-2026-9942",
        eventTitle: "Global Tech Summit 2026",
        date: "July 12-14, 2026",
        time: "9:00 AM - 5:00 PM",
        location: "Bandung Convention Center",
        category: "Technology",
        price: 0,
        status: "used",
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TCK-2026-9942",
      }
    ]
    localStorage.setItem('eventra_booked_tickets', JSON.stringify(initialTickets))
    return initialTickets
  })

  const handleDownloadTicket = (ticketId) => {
    alert(`Downloading PDF Ticket for ${ticketId}...`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-stone-50">
      {isOrganizer ? (
        <OrganizerDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
      ) : (
        <AttendeeDashboard 
          user={user} 
          myTickets={myTickets} 
          onDownloadTicket={handleDownloadTicket} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  )
}
