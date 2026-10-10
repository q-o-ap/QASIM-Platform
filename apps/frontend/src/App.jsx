import { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">Q</div>
          <div>
            <div className="brand-name">QASIM CRM</div>
            <small>Sales Workspace</small>
          </div>
        </div>

        <nav className="nav">
          <a 
            className={currentPage === 'dashboard' ? 'active' : ''}
            onClick={() => setCurrentPage('dashboard')}
            href="#"
          >
            Dashboard
          </a>
          <a 
            className={currentPage === 'leads' ? 'active' : ''}
            onClick={() => setCurrentPage('leads')}
            href="#"
          >
            Leads
          </a>
          <a href="#">Pipeline</a>
          <a href="#">Accounts</a>
          <a href="#">Reports</a>
          <a href="#">Automation</a>
        </nav>

        <div className="mini-panel">
          <span>System status</span>
          <strong>Online</strong>
        </div>
      </aside>

      <main className="main-panel">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'leads' && <Leads />}
      </main>
    </div>
  );
}

export default App;
