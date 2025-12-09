import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
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
        <NavLink to="/admin">Administration</NavLink>
        <NavLink className="login" to="/login">
          Login
        </NavLink>
        <NavLink className="register" to="/register">
          Register
        </NavLink>
      </div>
    </nav>
  )
}

