import './PageLayout.css'

export default function SupportPage() {
  return (
    <div className="page">
      <h1>Support</h1>
      <p className="lead">Find answers, guides, and ways to contact our team.</p>
      <div className="page-grid">
        <div className="page-card">
          <h3>FAQ</h3>
          <p>Common questions about voting, eligibility, and troubleshooting.</p>
        </div>
        <div className="page-card">
          <h3>Documentation</h3>
          <p>Integration guides, API references, and administrator resources.</p>
        </div>
        <div className="page-card">
          <h3>Contact Support</h3>
          <p>Email: support@campuselect.com</p>
          <p>Phone: +1 (876) 986-6146</p>
        </div>
      </div>
    </div>
  )
}

