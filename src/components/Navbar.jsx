import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { user, userRole, logout } = useAuth()
  const isAdmin = userRole === 'admin'

  return (
    <nav className="nav">
      <NavLink to="/" className="nav-logo">
        CampusElect
      </NavLink>
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/vote">Vote</NavLink>
        <NavLink to="/results">Results</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        {isAdmin && <NavLink to="/admin/home">Admin Dashboard</NavLink>}
        {user ? (
          <>
            <span className="nav-user">Hi, {user.displayName || user.email}</span>
            {isAdmin && <span className="nav-badge">Admin</span>}
            <button className="logout" type="button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink className="login" to="/login">
              Login
            </NavLink>
            <NavLink className="register" to="/register">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

