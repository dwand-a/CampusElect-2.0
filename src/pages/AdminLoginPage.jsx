import './PageLayout.css'

export default function AdminLoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Admin login submitted')
  }

  return (
    <div className="page">
      <h1>Administrator Login</h1>
      <p className="lead">Access election management tools.</p>
      <div className="page-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="admin-email">Email</label>
          <input id="admin-email" type="email" name="email" placeholder="admin@example.com" required />
          <label htmlFor="admin-password">Password</label>
          <input id="admin-password" type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

