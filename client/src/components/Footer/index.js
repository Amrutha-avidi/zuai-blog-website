import React from 'react'
import './index.css'

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Blog Platform. All rights reserved.</p>
          <p>Follow us on:
            <a href="https://twitter.com"> Twitter</a> |
            <a href="https://facebook.com"> Facebook</a> |
            <a href="https://instagram.com"> Instagram</a>
          </p>
          <p>Contact us: <a href="mailto:info@blogplatform.com">info@blogplatform.com</a></p>
        </div>
      </footer>
  )
}

export default Footer