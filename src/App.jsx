import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import VotingPage from './pages/VotingPage'
import ResultsPage from './pages/ResultsPage'
import SupportPage from './pages/SupportPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import UserDashboardPage from './pages/UserDashboardPage'
import ProfilePage from './pages/ProfilePage'
import ElectionCreationPage from './pages/ElectionCreationPage'
import ReportPage from './pages/ReportPage'
import AdminInitPage from './pages/AdminInitPage'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/vote" element={<VotingPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route
            path="/admin/home"
            element={
              <ProtectedRoute requireAdmin>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-election"
            element={
              <ProtectedRoute requireAdmin>
                <ElectionCreationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute requireAdmin>
                <ReportPage />
              </ProtectedRoute>
            }
          />
          <Route path="/admin-init" element={<AdminInitPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
