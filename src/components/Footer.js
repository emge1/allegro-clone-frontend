import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">allegro clone</div>
      </div>

      <div className="footer-bottom">
        <p>Allegro Clone Serwices</p>
        <div className="footer-links">
            <a href="http://localhost:3000/" target="_blank" rel="noopener noreferrer">
                Allegro-Clone.cz
            </a>
            <a href="http://localhost:3000/" target="_blank" rel="noopener noreferrer">
                Allegro-Clone.sk
            </a>
            <a href="http://localhost:3000/" target="_blank" rel="noopener noreferrer">
                Allegro-Clone.hu
            </a>
            <a href="http://localhost:3000/" target="_blank" rel="noopener noreferrer">
                Allegro-Clone.sk
            </a>
            <a href="http://localhost:3000/" target="_blank" rel="noopener noreferrer">
                Allegro-Clone.hr
            </a>
            <a href="http://localhost:3000/" target="_blank" rel="noopener noreferrer">
                Allegro-Clone.com
            </a>
        </div>
          <button className="scroll-to-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>▲</button>
      </div>
    </footer>
  );
}

export default Footer;
