import { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Deals from './pages/Deals';
import Customers from './pages/Customers';
import Tasks from './pages/Tasks';

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
          <a className={currentPage === 'dashboard' ? 'active' : ''} onClick={() => setCurrentPage('dashboard')} href="#">Dashboard</a>
          <a className={currentPage === 'leads' ? 'active' : ''} onClick={() => setCurrentPage('leads')} href="#">Leads</a>
          <a className={currentPage === 'deals' ? 'active' : ''} onClick={() => setCurrentPage('deals')} href="#">Pipeline</a>
          <a className={currentPage === 'customers' ? 'active' : ''} onClick={() => setCurrentPage('customers')} href="#">Accounts</a>
          <a className={currentPage === 'tasks' ? 'active' : ''} onClick={() => setCurrentPage('tasks')} href="#">Tasks</a>
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
        {currentPage === 'deals' && <Deals />}
        {currentPage === 'customers' && <Customers />}
        {currentPage === 'tasks' && <Tasks />}
      </main>
    </div>
  );
}

export default App;
