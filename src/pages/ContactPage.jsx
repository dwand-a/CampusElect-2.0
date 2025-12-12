import './ContactPage.css'

export default function ContactPage() {
  const handleSubmit = (event) => {
    event.preventDefault()
    // basic client-side acknowledgement
    alert('Message was successfully submitted')
    event.target.reset()
  }

  return (
    <div className="contact-page">
      {/* <header className="contact-header">
        <h1>CampusElect</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/vote">Features</a>
          <a href="/support">Solutions</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </header> */}

      <div className="container">
        <div className="page-header">
          <h2>Get in Touch</h2>
          <p>We're here to help with your institutional voting needs</p>
        </div>

        <div className="contact-section">
          <div className="contact-form">
            <h3>Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Full Name *" required />
              <input type="email" name="email" placeholder="Email Address *" required />
              <input type="text" name="institution" placeholder="Institution Name" />
              <input type="text" name="subject" placeholder="Subject" />
              <textarea name="message" rows="4" placeholder="Message" />
              <button type="submit">Send Message</button>
            </form>
          </div>

          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>
              <i className="fas fa-map-marker-alt" /> <strong>Office Address</strong>
              <br />
              64 Trafalgar Road
              <br />
              New Kingston
              <br />
              Kingston
            </p>
            <br />
            <p>
              <i className="fas fa-envelope" /> <strong>Email</strong>
              <br />
              info@campuselect.com
            </p>
            <br />
            <p>
              <i className="fas fa-phone" /> <strong>Phone</strong>
              <br />
              +1 (876) 986-6146
            </p>
            <br />
            <p>
              <i className="fas fa-clock" /> <strong>Business Hours</strong>
              <br />
              Monday - Friday
              <br />
              9:00 AM - 5:00 PM
            </p>

            <div className="map" />

            <div className="social-icons">
              <p>
                <strong>Follow Us</strong>
              </p>
              <a href="#"><i className="fab fa-linkedin-in" /></a>
              <a href="#"><i className="fab fa-twitter" /></a>
              <a href="#"><i className="fab fa-facebook-f" /></a>
              <a href="#"><i className="fab fa-instagram" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

