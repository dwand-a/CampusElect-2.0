import { useEffect, useState } from 'react'
import { fetchElections, fetchCandidates } from '../services/firestore'
import './HomePage.css'

export default function HomePage() {
  const [elections, setElections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const data = await fetchElections()
      if (!data.length) {
        setElections([])
        setLoading(false)
        return
      }
      const enriched = await Promise.all(
        data.map(async (election) => {
          const candidates = await fetchCandidates(election.candidateIds || [])
          return { ...election, candidates }
        }),
      )
      setElections(enriched)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>Modernize Your Campus Elections</h1>
          <p>Secure, Transparent, and Easy-to-use Voting Platform for Educational Institutions</p>
          <button type="button" onClick={() => (window.location.href = '/vote')}>
            <i className="fas fa-check-circle" /> Start Voting
          </button>
        </div>
        <div className="hero-image">
          <img src="/images/EVOTING.jpg" alt="E-voting" />
        </div>
      </section>

      <section className="section">
        <h2>
          <i className="fas fa-bullhorn" /> Active Elections
        </h2>
        {loading && <p>Loading elections...</p>}
        {!loading && !elections.length && <p>No active elections yet.</p>}
        <div className="cards">
          {elections.map((election) => (
            <div className="card" key={election.id}>
              <h4>
                <i className="fas fa-users" /> {election.name}
              </h4>
              <small>{election.date}</small>
              <p className="candidates-label">Candidates:</p>
              <ul className="candidate-list">
                {(election.candidates || []).map((c) => (
                  <li key={c.id}>{c.name}</li>
                ))}
              </ul>
              <a href="/vote">Vote Now →</a>
            </div>
          ))}
        </div>
      </section>

      <section className="features">
        <div className="feature-item">
          <i className="fas fa-shield-alt" />
          <h4>Secure Authentication</h4>
          <p>Multi-factor authentication and encrypted voting process ensures complete security</p>
        </div>
        <div className="feature-item">
          <i className="fas fa-chart-line" />
          <h4>Real-time Results</h4>
          <p>Watch live vote counting with our transparent result visualization system</p>
        </div>
        <div className="feature-item">
          <i className="fas fa-file-alt" />
          <h4>Audit Trail</h4>
          <p>Comprehensive logging and verification system for complete transparency</p>
        </div>
      </section>

      <section className="stats">
        <div className="stat">
          <h3>100+</h3>
          <p>Institutions</p>
        </div>
        <div className="stat">
          <h3>50,000+</h3>
          <p>Voters</p>
        </div>
        <div className="stat">
          <h3>99.9%</h3>
          <p>Uptime</p>
        </div>
        <div className="stat">
          <h3>0</h3>
          <p>Security Breaches</p>
        </div>
      </section>
    </>
  )
}

