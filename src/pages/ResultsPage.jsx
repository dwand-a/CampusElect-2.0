import './PageLayout.css'

const sampleResults = [
  { title: 'Student Council 2024', status: 'Completed', winner: 'Sarah Johnson', turnout: '62%' },
  { title: 'Department Representatives', status: 'Counting', winner: 'TBD', turnout: '48%' },
]

export default function ResultsPage() {
  return (
    <div className="page">
      <h1>Election Results</h1>
      <p className="lead">Quick overview of recently completed and active counts.</p>
      <div className="page-grid">
        {sampleResults.map((result) => (
          <div className="page-card" key={result.title}>
            <h3>{result.title}</h3>
            <p>Status: {result.status}</p>
            <p>Winner: {result.winner}</p>
            <p>Turnout: {result.turnout}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

