import './HomePage.css'

const fallbackElections = [
  {
    title: 'United Student Movement Elections',
    category: 'University',
    start: '2025-12-15 09:00',
    end: '2025-12-15 17:00',
  },
  {
    title: 'Department Representatives',
    category: 'University',
    start: '2025-12-18 10:00',
    end: '2025-12-18 16:00',
  },
  {
    title: 'Sports Committee Selection',
    category: 'University',
    start: '2025-12-20 08:00',
    end: '2025-12-20 18:00',
  },
]

export default function HomePage() {
  const elections = JSON.parse(localStorage.getItem('elections')) || fallbackElections

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>Modernize Your Campus Elections</h1>
          <p>Secure, Transparent, and Easy-to-use Voting Platform for Educational Institutions</p>
          <button type="button">
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
        <div className="cards">
          {elections.map((election) => (
            <div className="card" key={election.title}>
              <h4>
                <i className="fas fa-users" /> {election.title}
              </h4>
              <small>
                {election.category}
                <br />
                {election.start} - {election.end}
              </small>
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

