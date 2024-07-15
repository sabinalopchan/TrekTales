// Footer.js
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import "./Footer.css";
import logo from "../../assets/logo-removebg-preview.png"; // Replace with the path to your logo

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* <img src={logo} alt="Logo" className="footer-logo" />
        <div className="footer-social-links">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-links">
          <a href="/blog">Blog</a>
          <a href="/help">Help</a>
          <a href="/features">Features</a>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;
