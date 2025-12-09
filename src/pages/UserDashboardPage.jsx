import './PageLayout.css'

const recentActivities = [
  'Viewed Student Council 2024 ballot',
  'Updated profile information',
  'Downloaded voting receipt',
]

export default function UserDashboardPage() {
  return (
    <div className="page">
      <h1>User Dashboard</h1>
      <p className="lead">Track your elections and profile activity.</p>
      <div className="page-grid">
        <div className="page-card">
          <h3>My Elections</h3>
          <p>Student Council 2024</p>
          <p>Department Representatives</p>
        </div>
        <div className="page-card">
          <h3>Recent Activity</h3>
          <ul>
            {recentActivities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

