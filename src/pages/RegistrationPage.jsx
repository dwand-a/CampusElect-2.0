import './PageLayout.css'

export default function RegistrationPage() {
  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Registration submitted')
  }

  return (
    <div className="page">
      <h1>Register</h1>
      <p className="lead">Create your CampusElect account to participate in elections.</p>
      <div className="page-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" placeholder="Full Name" required />
          <label htmlFor="reg-email">Email</label>
          <input id="reg-email" type="email" name="email" placeholder="you@example.com" required />
          <label htmlFor="reg-password">Password</label>
          <input id="reg-password" type="password" name="password" placeholder="Password" required />
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  )
}

