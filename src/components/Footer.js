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
          <a>Allegro-Clone.cz</a>
          <a>Allegro-Clone.sk</a>
          <a>Allegro-Clone.hu</a>
          <a>Allegro-Clone.sk</a>
          <a>Allegro-Clone.hr</a>
          <a>Allegro-Clone.com</a>
        </div>
        <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>▲</button>
      </div>
    </footer>
  );
}

export default Footer;
