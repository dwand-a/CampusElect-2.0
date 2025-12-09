import { useEffect, useState } from 'react'
import { createElection, ensureSeedInstitutions, fetchInstitutions } from '../services/firestore'
import './PageLayout.css'

export default function ElectionCreationPage() {
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
    const title = form.get('title')
    const date = form.get('date')
    const institutionId = form.get('institution')
    const candidatesText = form.get('candidates') || ''
    const candidates = candidatesText
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean)
    if (!candidates.length) {
      setStatus('Add at least one candidate.')
      return
    }
    try {
      await createElection({ name: title, date, institutionId, candidates })
      setStatus('Election created!')
      event.target.reset()
    } catch (err) {
      setStatus(err.message)
    }
  }

  return (
    <div className="page">
      <h1>Create Election</h1>
      <p className="lead">Set up a new election with key details.</p>
      <div className="page-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" placeholder="Election title" required />
          <label htmlFor="date">Date</label>
          <input id="date" type="date" name="date" required />
          <label htmlFor="institution">Institution</label>
          <select id="institution" name="institution" required>
            <option value="">Select institution</option>
            {institutions.map((inst) => (
              <option key={inst.id} value={inst.id}>
                {inst.name}
              </option>
            ))}
          </select>
          <label htmlFor="candidates">Candidates (one per line)</label>
          <textarea id="candidates" name="candidates" rows="5" placeholder="Jane Doe&#10;John Smith" />
          <button type="submit">Create</button>
          {status && <p>{status}</p>}
        </form>
      </div>
    </div>
  )
}

