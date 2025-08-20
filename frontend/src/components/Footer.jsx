import React from "react";
import {
  Phone,
  Mail,
  GitHub,
  YouTube,
  Instagram,
  LinkedIn,
} from "@mui/icons-material";
import "../componentStyles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section1 */}
        <div className="footer-section container">
          <h3>Contact Us</h3>
          <p>
            <Phone fontSize="small" />
            Phone : +9865467888
          </p>
          <p>
            <Mail fontSize="small" />
            Email: dhakalshristi09@gmail.com
          </p>
        </div>

        {/* Section2 */}
        <div className="footer-section social">
          <h3>Follow me</h3>
          <div className="social-links">
            <a href="" target="_blank">
              <GitHub className="social-icon" />
            </a>
            <a href="" target="_blank">
              <LinkedIn className="social-icon" />
            </a>
            <a href="" target="_blank">
              <YouTube className="social-icon" />
            </a>
            <a href="" target="_blank">
              <Instagram className="social-icon" />
            </a>
          </div>
        </div>

        {/* Section3 */}
        <div className="footer-section about">
          <h3>About</h3>
          <p>
            Providing web development tutorials and courses to help you grow
            your skills.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Shristi . All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
