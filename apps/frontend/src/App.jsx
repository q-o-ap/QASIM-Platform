import { useEffect, useState } from 'react';

function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHealth() {
      try {
        const response = await fetch('/api/health');
        const data = await response.json();
        setHealth(data);
      } catch (error) {
        console.error('Failed to fetch API health:', error);
        setHealth({ status: 'offline', service: 'qasim-platform-backend' });
      } finally {
        setLoading(false);
      }
    }

    fetchHealth();
  }, []);

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="badge">QASIM Platform</div>
        <h1>Build smarter digital experiences.</h1>
        <p>
          A modern platform starter for teams building scalable products, internal tools,
          and developer-focused applications.
        </p>
      </header>

      <main className="content-grid">
        <section className="card">
          <h2>Platform Overview</h2>
          <ul>
            <li>React frontend for UI experiences</li>
            <li>Express API for backend services</li>
            <li>PostgreSQL-ready database layer</li>
            <li>Dockerized local development</li>
          </ul>
        </section>

        <section className="card">
          <h2>Backend Status</h2>
          {loading ? (
            <p>Checking system health...</p>
          ) : (
            <div>
              <p>
                Status: <strong>{health?.status}</strong>
              </p>
              <p>Service: {health?.service}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
