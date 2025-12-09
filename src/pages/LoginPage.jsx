import './PageLayout.css'

export default function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Login submitted')
  }

  return (
    <div className="page">
      <h1>Login</h1>
      <p className="lead">Welcome back! Access your CampusElect account.</p>
      <div className="page-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" placeholder="you@example.com" required />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

