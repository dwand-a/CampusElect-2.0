import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ensureSeedInstitutions, fetchInstitutions } from '../services/firestore'
import voteImg from '../assets/vote.jpg' 
import './RegistrationPage.css'

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
    <div className="reg-wrapper">
      {/* MAIN CENTERED CONTAINER */}
      <div className="reg-container">

        {/* LEFT SIDE */}
        <div className="reg-left">
        <img src={voteImg} alt="Secure Voting" />
        <h2>Secure Electronic Voting for Educational Institutions</h2>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="reg-right">
          <h1>Create an account</h1>
          <p>Register to participate in your institution's elections</p>

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

            {status && <p className="status">{status}</p>}
          </form>

          <p className="login-link">
            Already have an account? <a href="/login">Sign in here</a>
          </p>

          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a> | 
            <a href="/terms">Terms</a> | 
            <a href="/help">Help Center</a>
          </div>

          <p className="copyright">© 2024 CampusElect. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
