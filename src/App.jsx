
import React from 'react';
import './styles/index.css';
import CVBuilder from './components/CVBuilder';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>CV Builder</h1>
        <p>Create and export your professional CV in minutes</p>
      </header>
      <main>
        <CVBuilder />
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} CV Builder</p>
      </footer>
    </div>
  );
}

export default App;