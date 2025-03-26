import React from 'react';
import './styles/index.css';
import CVBuilder from './components/CVBuilder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';


function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className="logo-container">
            <FontAwesomeIcon icon={faFileAlt} className="app-logo" />
            <h1>CV Builder Free</h1>
          </div>
          <p className="app-tagline">Create and export your professional CV in minutes</p>
        </div>
      </header>
      <main>
        <div className="container">
          <CVBuilder />
        </div>
      </main>
      <footer>
        <div className="container">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} CV Builder Free</p>
            <div className="footer-links">
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="https://github.com/LucanF/cv-builder-free" className="footer-link">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;