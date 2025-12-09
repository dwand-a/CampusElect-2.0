import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './PageLayout.css'

export default function AdminLoginPage() {
  const { login, userRole, loading } = useAuth()
  const navigate = useNavigate()
  const [status, setStatus] = useState('')

  // Redirect if already logged in as admin
  useEffect(() => {
    if (!loading && userRole === 'admin') {
      navigate('/admin/home', { replace: true })
    }
  }, [userRole, loading, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const email = form.get('email')
    const password = form.get('password')
    setStatus('Logging in...')
    try {
      await login(email, password)
      // Check role after login (will be checked by ProtectedRoute)
      navigate('/admin/home')
    } catch (err) {
      setStatus(err.message || 'Login failed')
    }
  }

  return (
    <div className="page">
      <h1>Administrator Login</h1>
      <p className="lead">Access election management tools.</p>
      <div className="page-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="admin-email">Email</label>
          <input id="admin-email" type="email" name="email" placeholder="admin@example.com" required />
          <label htmlFor="admin-password">Password</label>
          <input id="admin-password" type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
          {status && <p style={{ color: status.includes('failed') || status.includes('error') ? '#E74C3C' : '#4F7C82' }}>{status}</p>}
        </form>
      </div>
    </div>
  )
}

