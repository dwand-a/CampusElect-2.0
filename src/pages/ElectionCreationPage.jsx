import { useEffect, useState } from 'react'
import { createElection, ensureSeedInstitutions, fetchInstitutions } from '../services/firestore'
import './PageLayout.css'

export default function ElectionCreationPage() {
  const [institutions, setInstitutions] = useState([])
  const [status, setStatus] = useState('')
  const [positions, setPositions] = useState([
    { positionName: '', candidatesText: '' }
  ])

  useEffect(() => {
    const load = async () => {
      await ensureSeedInstitutions()
      const list = await fetchInstitutions()
      setInstitutions(list)
    }
    load()
  }, [])

  const handleAddPosition = () => {
    setPositions([...positions, { positionName: '', candidatesText: '' }])
  }

  const handleRemovePosition = (index) => {
    if (positions.length === 1) return
    const copy = positions.filter((_, i) => i !== index)
    setPositions(copy)
  }

  const handlePositionChange = (index, field, value) => {
    const copy = [...positions]
    copy[index][field] = value
    setPositions(copy)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('')

    const form = new FormData(event.target)
    const title = form.get('title')
    const startDate = form.get('start_date')
    const endDate = form.get('end_date')
    const institutionId = form.get('institution')

    // Convert positions to clean structure
    const formattedPositions = positions.map((pos) => ({
      positionName: pos.positionName.trim(),
      candidates: pos.candidatesText
        .split('\n')
        .map((c) => c.trim())
        .filter(Boolean)
    }))

    // Validation
    for (const pos of formattedPositions) {
      if (!pos.positionName) {
        setStatus('All positions must have a name.')
        return
      }
      if (!pos.candidates.length) {
        setStatus(`Position "${pos.positionName}" must have at least one candidate.`)
        return
      }
    }

    try {
      await createElection({
        name: title,
        startDate,
        endDate,
        institutionId,
        positions: formattedPositions
      })

      setStatus('Election created successfully!')
      event.target.reset()
      setPositions([{ positionName: '', candidatesText: '' }])
    } catch (err) {
      setStatus(err.message)
    }
  }

  return (
    <div className="page">
      <h1>Create Election</h1>
      <p className="lead">Set up a new election with multiple positions.</p>

      <div className="page-card">
        <form onSubmit={handleSubmit}>

          {/* Basic Election Info */}
          <label htmlFor="title">Election Name</label>
          <input id="title" name="title" placeholder="USM 2025" required />

          <label htmlFor="start_date">Start Date</label>
          <input id="start_date" type="date" name="start_date" required />

          <label htmlFor="end_date">End Date</label>
          <input id="end_date" type="date" name="end_date" required />

          <label htmlFor="institution">Institution</label>
          <select id="institution" name="institution" required>
            <option value="">Select institution</option>
            {institutions.map((inst) => (
              <option key={inst.id} value={inst.id}>
                {inst.name}
              </option>
            ))}
          </select>

          <hr />
          <h2>Positions & Candidates</h2>

          {/* Dynamic Positions */}
          {positions.map((pos, index) => (
            <div key={index} className="position-box">
              <label>Position Name</label>
              <input
                value={pos.positionName}
                onChange={(e) =>
                  handlePositionChange(index, 'positionName', e.target.value)
                }
                placeholder="President"
                required
              />

              <label>Candidates (one per line)</label>
              <textarea
                rows="4"
                value={pos.candidatesText}
                onChange={(e) =>
                  handlePositionChange(index, 'candidatesText', e.target.value)
                }
                placeholder="Jane Doe&#10;John Smith"
              />

              {/* Remove Button */}
              {positions.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemovePosition(index)}
                  className="remove-btn"
                >
                  Remove Position
                </button>
              )}

              <hr />
            </div>
          ))}

          {/* Add Position Button */}
          <button type="button" onClick={handleAddPosition}>
            + Add Another Position
          </button>

          {/* Submit */}
          <button type="submit">Create Election</button>

          {status && <p>{status}</p>}
        </form>
      </div>
    </div>
  )
}
