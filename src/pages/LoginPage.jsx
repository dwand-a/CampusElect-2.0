import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import voteImg from '../assets/vote.jpg' 
import './LoginPage.css'

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

              {status && <p className="status">{status}</p>}
            </form>

            <p className="forgot">Forgot password?</p>

            <p className="register">
              Don’t have an account? <a href="/register">Register here</a>
            </p>

            <div className="footer-links">
              <a href="/privacy">Privacy Policy</a> |
              <a href="/terms"> Terms of Service</a> |
              <a href="/help"> Help Center</a>
            </div>

            <p className="copyright">
              © 2024 CampusElect. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
