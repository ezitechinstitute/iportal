import React from 'react'

export const InternFooter = () => {
  return (
   <>
   <footer className="footer">
    <div className="footer-container">
            <div className="footer-column">
        <p>Office #304-B. Amna Plaza, Main<br/>
        Peshawar Rd, Rawalpindi, Punjab</p>
        <p>(92) 337-7777860</p>
        <p><a href="mailto:info@ezitech.org">info@ezitech.org</a></p>
      </div>
      <div className="footer-column">
        <h3>Explore More</h3>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Partners</a></li>
          <li><a href="#">Portfolio</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>Internships</h3>
        <ul>
          <li><a href="#">Strategy</a></li>
          <li><a href="#">eCommerce</a></li>
          <li><a href="#">Digital Marketing</a></li>
          <li><a href="#">Branding</a></li>
          <li><a href="#">Design</a></li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>Updates</h3>
        <p>Subscribe our newsletter to get the latest news &amp; updates.</p>
        <div class="subscribe-box">
          <input type="email" placeholder="Enter email address"/>
          <button style={{color: "#181B31"}}>GO</button>
        </div>
      </div>

    </div>

    <hr/>
    <div className="footer-bottom">
        <a href="https://wa.me/923377777860" 
     className="whatsapp-btn" 
     target="_blank" 
     title="Chat on WhatsApp" 
     rel="noopener">
   <i className="fab fa-whatsapp"></i>
    </a>    
      <p>© 2024 Ezitech Institute. All rights reserved | Design &amp; Develop by Ezitech Solutions</p>
      <div className="footer-links">

        <a href="#">Terms &amp; Conditions</a>
        <a href="#">Privacy Policy</a>
        
  <button id="backToTop" title="Back to Top">↑</button>
      </div>
    </div>


  </footer>
   </>
  )
}
