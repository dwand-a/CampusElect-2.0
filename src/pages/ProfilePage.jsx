import './PageLayout.css'

export default function ProfilePage() {
  return (
    <div className="page">
      <h1>Profile</h1>
      <p className="lead">Keep your details up to date.</p>
      <div className="page-card">
        <form>
          <label htmlFor="profile-name">Full Name</label>
          <input id="profile-name" name="name" placeholder="Your name" />
          <label htmlFor="profile-email">Email</label>
          <input id="profile-email" type="email" name="email" placeholder="you@example.com" />
          <label htmlFor="profile-program">Program</label>
          <input id="profile-program" name="program" placeholder="Program / Department" />
          <button type="button">Save</button>
        </form>
      </div>
    </div>
  )
}

