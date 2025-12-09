import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import './PageLayout.css'

export default function UserDashboardPage() {
  const { user } = useAuth()
  const [voterData, setVoterData] = useState(null)

  useEffect(() => {
    const load = async () => {
      if (!user) return
      const snap = await getDoc(doc(db, 'voters', user.uid))
      if (snap.exists()) setVoterData(snap.data())
    }
    load()
  }, [user])

  return (
    <div className="page">
      <h1>User Dashboard</h1>
      <p className="lead">Track your elections and profile activity.</p>
      <div className="page-grid">
        <div className="page-card">
          <h3>My Elections</h3>
          <p>{voterData ? `Votes cast: ${Object.keys(voterData.votes || {}).length}` : 'No votes yet.'}</p>
        </div>
        <div className="page-card">
          <h3>Recent Activity</h3>
          <ul>
            {voterData &&
              Object.entries(voterData.votes || {}).map(([electionId, candidateId]) => (
                <li key={electionId}>
                  Election {electionId}: voted for {candidateId}
                </li>
              ))}
            {!voterData && <li>Sign in to view your activity.</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}

