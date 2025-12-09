import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { fetchElections, fetchCandidates, submitVote } from '../services/firestore'
import './VotingPage.css'

export default function VotingPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [election, setElection] = useState(null)
  const [candidates, setCandidates] = useState([])
  const [selection, setSelection] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const elections = await fetchElections()
      if (!elections.length) {
        setLoading(false)
        return
      }
      const active = elections[0]
      setElection(active)
      const cands = await fetchCandidates(active.candidateIds || [])
      setCandidates(cands)
      setLoading(false)
    }
    load()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    if (!selection) {
      setMessage('Please choose a candidate.')
      return
    }
    try {
      await submitVote({ uid: user.uid, electionId: election.id, candidateId: selection })
      setMessage('Vote submitted. Thank you!')
    } catch (err) {
      setMessage(err.message)
    }
  }

  if (loading) {
    return <div className="voting-page">Loading election...</div>
  }

  if (!election) {
    return <div className="voting-page">No active election available.</div>
  }

  return (
    <div className="voting-page">
      <div className="container">
        <h1>Current Election: {election.name}</h1>
        <p className="timer">
          <i className="fa-regular fa-clock" /> {election.date || 'Ongoing'}
        </p>

        <div className="instructions">
          <strong>Important Instructions:</strong>
          <ul>
            <li>Select one candidate</li>
            <li>Review your choice before submission</li>
            <li>Your vote is stored in Firestore</li>
            <li>You cannot change your vote after submission</li>
          </ul>
        </div>

        <form id="voteForm" onSubmit={handleSubmit}>
          <div className="position">
            <h2>Candidates</h2>
            {candidates.map((candidate) => (
              <div className="candidate" key={candidate.id}>
                <label>
                  <input
                    type="radio"
                    name="candidate"
                    value={candidate.id}
                    checked={selection === candidate.id}
                    onChange={(e) => setSelection(e.target.value)}
                    required
                  />
                  <img src="/images/user.jpg" alt={candidate.name} />
                  <div>
                    <strong>{candidate.name}</strong>
                    <br />
                    <small>Votes: {candidate.votes || 0}</small>
                  </div>
                </label>
              </div>
            ))}
          </div>

          <div className="review-box">
            <p>
              Please review your choice carefully before submitting.
              <br />
              You cannot change your vote after submission.
            </p>
            <div className="button-group">
              <button type="submit" className="submit-btn">
                Submit Vote
              </button>
            </div>
            {message && <p className="status">{message}</p>}
          </div>
        </form>
      </div>

      <footer className="voting-footer">
        <div>
          <a href="#">FAQ</a> | <a href="#">Contact Support</a> | <a href="#">Voting Guide</a> |{' '}
          <a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a> | <a href="#">Election Rules</a> |{' '}
          <a href="#">Security</a>
        </div>
        <p>© 2024 CampusElect. All rights reserved.</p>
      </footer>
    </div>
  )
}

