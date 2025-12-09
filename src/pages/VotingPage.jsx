import './VotingPage.css'

export default function VotingPage() {
  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Your vote has been submitted.')
  }

  return (
    <div className="voting-page">
      <div className="container">
        <h1>Current Election: Student Council 2024</h1>
        <p className="timer">
          <i className="fa-regular fa-clock" /> Voting closes in 2h 45m
        </p>

        <div className="instructions">
          <strong>Important Instructions:</strong>
          <ul>
            <li>Select one candidate per position</li>
            <li>Review your choices before submission</li>
            <li>Your vote is anonymous and secure</li>
            <li>You cannot change your vote after submission</li>
          </ul>
        </div>

        <form id="voteForm" onSubmit={handleSubmit}>
          <div className="position">
            <h2>President</h2>
            <div className="candidate">
              <label>
                <input type="radio" name="president" value="Sarah Johnson" required />
                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Sarah Johnson" />
                <div>
                  <strong>Sarah Johnson</strong>
                  <br />
                  <small>Focusing on sustainable campus initiatives and improved student services</small>
                </div>
              </label>
            </div>
            <div className="candidate">
              <label>
                <input type="radio" name="president" value="Michael Chen" />
                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Michael Chen" />
                <div>
                  <strong>Michael Chen</strong>
                  <br />
                  <small>Advocating for academic excellence and inclusive student community</small>
                </div>
              </label>
            </div>
          </div>

          <div className="position">
            <h2>Vice President</h2>
            <div className="candidate">
              <label>
                <input type="radio" name="vp" value="Emily Rodriguez" required />
                <img src="https://randomuser.me/api/portraits/women/72.jpg" alt="Emily Rodriguez" />
                <div>
                  <strong>Emily Rodriguez</strong>
                  <br />
                  <small>Building stronger connections between faculty and students</small>
                </div>
              </label>
            </div>
            <div className="candidate">
              <label>
                <input type="radio" name="vp" value="David Park" />
                <img src="https://randomuser.me/api/portraits/men/64.jpg" alt="David Park" />
                <div>
                  <strong>David Park</strong>
                  <br />
                  <small>Enhancing campus life through cultural events and activities</small>
                </div>
              </label>
            </div>
          </div>

          <div className="position">
            <h2>Secretary</h2>
            <div className="candidate">
              <label>
                <input type="radio" name="secretary" value="Lisa Thompson" required />
                <img src="https://randomuser.me/api/portraits/women/23.jpg" alt="Lisa Thompson" />
                <div>
                  <strong>Lisa Thompson</strong>
                  <br />
                  <small>Implementing efficient communication systems for student body</small>
                </div>
              </label>
            </div>
            <div className="candidate">
              <label>
                <input type="radio" name="secretary" value="James Wilson" />
                <img src="https://randomuser.me/api/portraits/men/12.jpg" alt="James Wilson" />
                <div>
                  <strong>James Wilson</strong>
                  <br />
                  <small>Focusing on transparency and accurate record-keeping</small>
                </div>
              </label>
            </div>
          </div>

          <div className="review-box">
            <p>
              Please review your choices carefully before submitting.
              <br />
              You cannot change your vote after submission.
            </p>
            <div className="button-group">
              <button type="submit" className="submit-btn">
                Submit Vote
              </button>
              <button type="button" className="save-btn">
                Save Draft
              </button>
            </div>
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

