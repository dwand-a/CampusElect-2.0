import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ensureSeedInstitutions, fetchInstitutions } from '../services/firestore'
import './PageLayout.css'

export default function RegistrationPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [institutions, setInstitutions] = useState([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    const load = async () => {
      await ensureSeedInstitutions()
      const list = await fetchInstitutions()
      setInstitutions(list)
    }
    load()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const name = form.get('name')
    const email = form.get('email')
    const password = form.get('password')
    const institutionId = form.get('institution')
    
    // Prevent admin account creation
    if (email.toLowerCase().includes('admin') || email === 'dwanda@stu.ncu.edu.jm') {
      setStatus('Error: Cannot create admin accounts through registration')
      return
    }
    
    setStatus('Creating account...')
    try {
      await register({ email, password, displayName: name, institutionId })
      setStatus('Registered! Redirecting...')
      navigate('/dashboard')
    } catch (err) {
      setStatus(err.message || 'Registration failed')
    }
  }

  return (
    <div className="page">
      <h1>Register</h1>
      <p className="lead">Create your CampusElect account to participate in elections.</p>
      <div className="page-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" placeholder="Full Name" required />
          <label htmlFor="reg-email">Email</label>
          <input id="reg-email" type="email" name="email" placeholder="you@example.com" required />
          <label htmlFor="reg-password">Password</label>
          <input id="reg-password" type="password" name="password" placeholder="Password" required />
          <label htmlFor="institution">Institution</label>
          <select id="institution" name="institution" required>
            <option value="">Select institution</option>
            {institutions.map((inst) => (
              <option key={inst.id} value={inst.id}>
                {inst.name}
              </option>
            ))}
          </select>
          <button type="submit">Create Account</button>
          {status && <p>{status}</p>}
        </form>
      </div>
    </div>
  )
}

