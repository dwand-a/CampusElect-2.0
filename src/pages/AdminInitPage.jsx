import { useState } from 'react'
import { initializeDefaultAdmin } from '../services/firestore'
import './PageLayout.css'

/**
 * Manual admin initialization page
 * Use this if automatic initialization fails
 * Access at /admin-init (add route in App.jsx if needed)
 */
export default function AdminInitPage() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInit = async () => {
    setLoading(true)
    setStatus('Initializing admin...')
    try {
      const result = await initializeDefaultAdmin()
      if (result.success) {
        setStatus(`✅ Success: ${result.message}`)
      } else {
        setStatus(`❌ Error: ${result.message}${result.code ? ` (Code: ${result.code})` : ''}`)
      }
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h1>Admin Initialization</h1>
      <p className="lead">Manually initialize the default admin account if automatic initialization failed.</p>
      <div className="page-card">
        <p><strong>Default Admin Credentials:</strong></p>
        <ul>
          <li>Email: <code>dwanda@stu.ncu.edu.jm</code></li>
          <li>Password: <code>Password123</code></li>
        </ul>
        <button onClick={handleInit} disabled={loading}>
          {loading ? 'Initializing...' : 'Initialize Admin'}
        </button>
        {status && (
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: status.includes('✅') ? '#d4edda' : '#f8d7da', borderRadius: '8px' }}>
            {status}
          </div>
        )}
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
          <h3>⚠️ Troubleshooting</h3>
          <p>If initialization fails, check:</p>
          <ol>
            <li>Firestore security rules are set correctly (see FIRESTORE_RULES.md)</li>
            <li>Firebase project is correct: <code>campuselect-9711e</code></li>
            <li>Browser console for detailed error messages</li>
            <li>Firebase Console → Authentication → Users (check if admin user exists)</li>
            <li>Firebase Console → Firestore → Data (check if collections are created)</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

