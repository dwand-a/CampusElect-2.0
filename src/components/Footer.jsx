import './Footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <h4>CampusElect</h4>
          <p>Making campus elections secure, transparent, and accessible.</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-twitter" /></a>
            <a href="#"><i className="fab fa-linkedin" /></a>
            <a href="#"><i className="fab fa-facebook" /></a>
            <a href="#"><i className="fab fa-instagram" /></a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/vote">Vote</a>
          <a href="/contact">Contact</a>
          <a href="/support">Support</a>
        </div>
        <div>
          <h4>Contact</h4>
          <p><i className="fas fa-envelope" /> info@campuselect.com</p>
          <p><i className="fas fa-phone" /> +1 (876) 986-6146</p>
          <p><i className="fas fa-map-marker-alt" /> 64 Trafalgar Road<br />New Kingston,<br />Kingston<br />Jamaica</p>
        </div>
      </div>
      <div className="copyright">© 2024 CampusElect. All rights reserved.</div>
    </footer>
  )
}

