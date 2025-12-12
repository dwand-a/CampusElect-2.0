import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import voteImg from '../assets/vote.jpg' 
import './AuthPages.css'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [status, setStatus] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const email = form.get('email').trim()
    const password = form.get('password').trim()
    setStatus('Signing in...')
    try {
      await login(email, password)
      setStatus('Signed in!')
      navigate('/dashboard')
    } catch (err) {
      setStatus('Failed to login. Please check your credentials.')
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">

        <div className="login-page">

          {/* LEFT SIDE */}
          <div className="login-left">
            <img src={voteImg} alt="Secure Voting" />
            <h2>Secure Electronic Voting for Educational Institutions</h2>
          </div>

          {/* RIGHT SIDE */}
          <div className="login-right">
            <h1>Welcome back!</h1>
            <p>Sign in to your account</p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email or Student/Faculty ID</label>
              <input
                id="email"
                type="text"
                name="email"
                placeholder="Enter your email or ID"
                required
              />

              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
              />

              <button type="submit" disabled={status === 'Signing in...'}>
                Sign In
              </button>

              {status && (
                <p className={`login-status ${status.toLowerCase().includes('failed') ? 'error' : 'success'}`}>
                  {status}
                </p>
              )}
            </form>

            <div className="reg-footer-links">
              Don't have an account? <a href="/register">Register here</a>
            </div>

            <div className="reg-footer-links" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
              <a href="/privacy">Privacy Policy</a> |
              <a href="/terms"> Terms of Service</a> |
              <a href="/help"> Help Center</a>
            </div>

            <p className="copyright" style={{ fontSize: '0.8rem', color: '#999', marginTop: '1rem', textAlign: 'center' }}>
              © 2024 CampusElect. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
