import { useEffect, useState } from 'react'
import { fetchTopResults } from '../services/firestore'
import './PageLayout.css'

export default function ResultsPage() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const data = await fetchTopResults()
      setResults(data)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="page">
      <h1>Election Results</h1>
      <p className="lead">Quick overview of recently completed and active counts.</p>
      {loading && <p>Loading results...</p>}
      {!loading && !results.length && <p>No results yet.</p>}
      <div className="page-grid">
        {results.map(({ election, candidates }) => (
          <div className="page-card" key={election.id}>
            <h3>{election.name}</h3>
            <p>Date: {election.date}</p>
            <p>Top candidates:</p>
            <ul>
              {candidates.map((c) => (
                <li key={c.id}>
                  {c.name} — {c.votes || 0} votes
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

