import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase'
import { registerVoter, ensureSeedInstitutions, getUserRole, initializeDefaultAdmin } from '../services/firestore'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize default admin on app start (only once)
    initializeDefaultAdmin()
      .then((result) => {
        if (result.success) {
          console.log('✅ Admin initialization:', result.message)
        } else {
          console.error('❌ Admin initialization failed:', result.message)
          console.error('Error code:', result.code)
        }
      })
      .catch((error) => {
        console.error('❌ Admin initialization error:', error)
      })

    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) {
        try {
          const role = await getUserRole(u.uid)
          setUserRole(role)
        } catch (error) {
          console.error('Error fetching user role:', error)
          setUserRole(null)
        }
      } else {
        setUserRole(null)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

  const logout = async () => {
    await signOut(auth)
    setUserRole(null)
  }

  const register = async ({ email, password, displayName, institutionId }) => {
    // Prevent admin account creation from registration
    if (email.toLowerCase().includes('admin') || email === 'dwanda@stu.ncu.edu.jm') {
      throw new Error('Cannot create admin accounts through registration')
    }

    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName) {
      await updateProfile(cred.user, { displayName })
    }
    await registerVoter(cred.user.uid, {
      email,
      name: displayName || email,
      institutionId,
      role: 'voter', // Explicitly set as voter
    })
    
    // Update role state
    setUserRole('voter')
    return cred.user
  }

  const value = { user, userRole, loading, login, logout, register, ensureSeedInstitutions }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}

