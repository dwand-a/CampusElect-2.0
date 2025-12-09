import './AboutPage.css'

export default function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>CampusElect</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/contact">Contact</a>
          <a href="/about">About</a>
          <a href="/support">Resources</a>
          <button className="btn-primary" type="button">
            Get Started
          </button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h2>Modernizing Campus Elections</h2>
          <p>
            A comprehensive electronic voting platform designed to transform electoral processes
            across educational institutions. Secure, transparent, and accessible.
          </p>
          <button className="btn-primary" type="button">
            Learn More
          </button>
        </div>
        <div className="hero-image">
          <img src="/images/Voteimages.jpeg" alt="Voting System" />
        </div>
      </section>

      <section className="features">
        <h3>Transforming Educational Democracy</h3>
        <div className="features-grid">
          <div className="feature">
            <i className="fas fa-shield-alt" />
            <h4>Secure Voting</h4>
            <p>End-to-end encryption and robust authentication ensure the integrity of every vote.</p>
          </div>
          <div className="feature">
            <i className="fas fa-chart-bar" />
            <h4>Real-time Results</h4>
            <p>Instant vote counting and result visualization with complete transparency.</p>
          </div>
          <div className="feature">
            <i className="fas fa-plug" />
            <h4>Easy Integration</h4>
            <p>Seamlessly integrates with existing school management systems.</p>
          </div>
        </div>
      </section>

      <section className="vision">
        <img src="/images/Team.jpg" alt="Team Collaboration" />
        <div className="vision-text">
          <h3>Our Vision &amp; Goals</h3>
          <p>
            CampusElect envisions a future where every educational institution can conduct fair, secure, and
            efficient elections. We’re committed to democratizing the voting process and ensuring every student’s
            voice is heard.
          </p>
          <ul>
            <li>Enhance electoral accessibility and participation</li>
            <li>Ensure complete transparency and security</li>
            <li>Streamline administrative processes</li>
            <li>Promote democratic engagement in education</li>
          </ul>
        </div>
      </section>

      <section className="team">
        <h3>Meet Our Team</h3>
        <div className="team-members">
          <div className="card">
            <img src="/images/Sarah Johnson.jpg" alt="Sarah Johnson" />
            <h4>Sarah Johnson</h4>
            <p>
              Project Lead
              <br />
              10+ years in EdTech
            </p>
          </div>
          <div className="card">
            <img src="/images/DavidChen.jpg" alt="David Chen" />
            <h4>David Chen</h4>
            <p>
              Security Expert
              <br />
              Cryptography &amp; Secure Systems
            </p>
          </div>
          <div className="card">
            <img src="/images/Zen.jpg" alt="Dwanda Pennants" />
            <h4>Dwanda Pennants</h4>
            <p>
              CEO
              <br />
              10+ years
            </p>
          </div>
          <div className="card">
            <img src="/images/Zach.jpg" alt="Zachery Daley" />
            <h4>Zachery Daley</h4>
            <p>Data Analyst</p>
          </div>
        </div>
      </section>
    </div>
  )
}

