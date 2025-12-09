import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './PageLayout.css'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [status, setStatus] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const email = form.get('email')
    const password = form.get('password')
    setStatus('Signing in...')
    try {
      await login(email, password)
      setStatus('Signed in!')
      navigate('/dashboard')
    } catch (err) {
      setStatus(err.message)
    }
  }

  return (
    <div className="page">
      <h1>Login</h1>
      <p className="lead">Welcome back! Access your CampusElect account.</p>
      <div className="page-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" placeholder="you@example.com" required />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
          {status && <p>{status}</p>}
        </form>
      </div>
    </div>
  )
}

