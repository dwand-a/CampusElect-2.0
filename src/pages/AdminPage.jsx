import './PageLayout.css'

const adminStats = [
  { label: 'Active Elections', value: 3 },
  { label: 'Registered Voters', value: 5200 },
  { label: 'Pending Approvals', value: 12 },
]

export default function AdminPage() {
  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      <p className="lead">Manage elections, review reports, and oversee access.</p>
      <div className="page-grid">
        {adminStats.map((stat) => (
          <div className="page-card" key={stat.label}>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

