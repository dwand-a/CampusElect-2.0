import { useEffect, useState } from 'react'
import {
  fetchElections,
  fetchInstitutions,
  createInstitution,
  updateInstitution,
  deleteInstitution,
  createElection,
  deleteElection,
  fetchCandidates,
} from '../services/firestore'
import './PageLayout.css'
import './AdminPage.css'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({ elections: 0, institutions: 0, candidates: 0 })
  const [institutions, setInstitutions] = useState([])
  const [elections, setElections] = useState([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const [electionsList, institutionsList] = await Promise.all([
      fetchElections(),
      fetchInstitutions(),
    ])
    
    // Filter out deleted items
    const activeElections = electionsList.filter((e) => !e.deleted)
    const activeInstitutions = institutionsList.filter((i) => !i.deleted)
    
    setElections(activeElections)
    setInstitutions(activeInstitutions)
    
    // Count candidates
    let totalCandidates = 0
    for (const election of activeElections) {
      if (election.candidateIds) {
        totalCandidates += election.candidateIds.length
      }
    }
    
    setStats({
      elections: activeElections.length,
      institutions: activeInstitutions.length,
      candidates: totalCandidates,
    })
  }

  const handleCreateInstitution = async (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const name = form.get('name')
    setStatus('Creating institution...')
    try {
      await createInstitution(name)
      setStatus('Institution created successfully!')
      event.target.reset()
      await loadData()
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  const handleUpdateInstitution = async (institutionId, newName) => {
    setStatus('Updating institution...')
    try {
      await updateInstitution(institutionId, newName)
      setStatus('Institution updated successfully!')
      await loadData()
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  const handleDeleteInstitution = async (institutionId) => {
    if (!confirm('Are you sure you want to delete this institution? This cannot be undone if it has elections.')) {
      return
    }
    setStatus('Deleting institution...')
    try {
      await deleteInstitution(institutionId)
      setStatus('Institution deleted successfully!')
      await loadData()
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  const handleCreateElection = async (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const name = form.get('name')
    const date = form.get('date')
    const institutionId = form.get('institutionId')
    const candidates = form.get('candidates').split(',').map((c) => c.trim()).filter(Boolean)
    
    if (!candidates.length) {
      setStatus('Error: Please provide at least one candidate')
      return
    }
    
    setStatus('Creating election...')
    try {
      await createElection({ name, date, institutionId, candidates })
      setStatus('Election created successfully!')
      event.target.reset()
      await loadData()
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  const handleDeleteElection = async (electionId) => {
    if (!confirm('Are you sure you want to delete this election? This cannot be undone.')) {
      return
    }
    setStatus('Deleting election...')
    try {
      await deleteElection(electionId)
      setStatus('Election deleted successfully!')
      await loadData()
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  return (
    <div className="page admin-page">
      <h1>Admin Dashboard</h1>
      <p className="lead">Manage institutions, elections, and oversee the voting platform.</p>

      {status && (
        <div className={`admin-status ${status.includes('Error') ? 'error' : 'success'}`}>
          {status}
        </div>
      )}

      <div className="admin-tabs">
        <button
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={activeTab === 'institutions' ? 'active' : ''}
          onClick={() => setActiveTab('institutions')}
        >
          Institutions
        </button>
        <button
          className={activeTab === 'elections' ? 'active' : ''}
          onClick={() => setActiveTab('elections')}
        >
          Elections
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="admin-overview">
          <div className="page-grid">
            <div className="page-card">
              <h3>{stats.institutions}</h3>
              <p>Institutions</p>
            </div>
            <div className="page-card">
              <h3>{stats.elections}</h3>
              <p>Active Elections</p>
            </div>
            <div className="page-card">
              <h3>{stats.candidates}</h3>
              <p>Total Candidates</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'institutions' && (
        <div className="admin-institutions">
          <div className="page-card">
            <h2>Create New Institution</h2>
            <form onSubmit={handleCreateInstitution}>
              <label htmlFor="inst-name">Institution Name</label>
              <input id="inst-name" name="name" placeholder="e.g., University of Technology" required />
              <button type="submit">Create Institution</button>
            </form>
          </div>

          <div className="page-card">
            <h2>Manage Institutions</h2>
            {institutions.length === 0 ? (
              <p>No institutions found. Create one above.</p>
            ) : (
              <div className="admin-list">
                {institutions.map((inst) => (
                  <InstitutionItem
                    key={inst.id}
                    institution={inst}
                    onUpdate={handleUpdateInstitution}
                    onDelete={handleDeleteInstitution}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'elections' && (
        <div className="admin-elections">
          <div className="page-card">
            <h2>Create New Election</h2>
            <form onSubmit={handleCreateElection}>
              <label htmlFor="election-name">Election Name</label>
              <input id="election-name" name="name" placeholder="e.g., Student Council 2024" required />
              
              <label htmlFor="election-date">Election Date</label>
              <input id="election-date" type="datetime-local" name="date" required />
              
              <label htmlFor="election-institution">Institution</label>
              <select id="election-institution" name="institutionId" required>
                <option value="">Select institution</option>
                {institutions.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.name}
                  </option>
                ))}
              </select>
              
              <label htmlFor="election-candidates">
                Candidates (comma-separated)
              </label>
              <textarea
                id="election-candidates"
                name="candidates"
                placeholder="Candidate 1, Candidate 2, Candidate 3"
                rows="4"
                required
              />
              
              <button type="submit">Create Election</button>
            </form>
          </div>

          <div className="page-card">
            <h2>Manage Elections</h2>
            {elections.length === 0 ? (
              <p>No elections found. Create one above.</p>
            ) : (
              <div className="admin-list">
                {elections.map((election) => (
                  <ElectionItem
                    key={election.id}
                    election={election}
                    institutions={institutions}
                    onDelete={handleDeleteElection}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function InstitutionItem({ institution, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(institution.name)

  const handleSave = () => {
    if (name.trim() && name !== institution.name) {
      onUpdate(institution.id, name.trim())
    }
    setEditing(false)
  }

  return (
    <div className="admin-list-item">
      {editing ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ flex: 1, marginRight: '8px' }}
          />
          <button onClick={handleSave} style={{ marginRight: '8px' }}>
            Save
          </button>
          <button onClick={() => { setEditing(false); setName(institution.name) }}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span style={{ flex: 1 }}>{institution.name}</span>
          <button onClick={() => setEditing(true)} style={{ marginRight: '8px' }}>
            Edit
          </button>
          <button onClick={() => onDelete(institution.id)} className="danger">
            Delete
          </button>
        </>
      )}
    </div>
  )
}

function ElectionItem({ election, institutions, onDelete }) {
  const institution = institutions.find((i) => i.id === election.institutionId)
  const electionDate = election.date?.toDate ? election.date.toDate() : new Date(election.date)

  return (
    <div className="admin-list-item">
      <div style={{ flex: 1 }}>
        <strong>{election.name}</strong>
        <br />
        <small>
          Institution: {institution?.name || 'Unknown'} | Date:{' '}
          {electionDate.toLocaleString()} | Candidates: {election.candidateIds?.length || 0}
        </small>
      </div>
      <button onClick={() => onDelete(election.id)} className="danger">
        Delete
      </button>
    </div>
  )
}
