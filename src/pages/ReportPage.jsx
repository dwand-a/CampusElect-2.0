import './PageLayout.css'

const reports = [
  { title: 'Security Audit Q1', link: '#', description: 'Summary of recent security review.' },
  { title: 'Participation Report', link: '#', description: 'Turnout trends across elections.' },
]

export default function ReportPage() {
  return (
    <div className="page">
      <h1>Reports</h1>
      <p className="lead">Download and review compliance and participation reports.</p>
      <div className="page-grid">
        {reports.map((report) => (
          <div className="page-card" key={report.title}>
            <h3>{report.title}</h3>
            <p>{report.description}</p>
            <a href={report.link}>View</a>
          </div>
        ))}
      </div>
    </div>
  )
}

