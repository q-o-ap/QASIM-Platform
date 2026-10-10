import { useEffect, useState } from 'react';

function App() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        setDashboard(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setDashboard({
          metrics: {
            totalRevenue: '$0',
            activeUsers: '0',
            conversionRate: '0%',
            avgRetention: '0%'
          },
          customers: [],
          activity: [],
          overview: {
            monthlyGrowth: '0%',
            churnRate: '0%',
            responseTime: '0s'
          }
        });
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">Q</div>
          <div>
            <div className="brand-name">QASIM</div>
            <small>Growth Platform</small>
          </div>
        </div>

        <nav className="nav">
          <a className="active" href="#">Overview</a>
          <a href="#">Customers</a>
          <a href="#">Analytics</a>
          <a href="#">Revenue</a>
          <a href="#">Automation</a>
          <a href="#">Settings</a>
        </nav>

        <div className="mini-panel">
          <span>System status</span>
          <strong>{loading ? 'Checking...' : 'Healthy'}</strong>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>Customer overview</h1>
          </div>

          <div className="topbar-actions">
            <button className="ghost-btn">Export</button>
            <button className="primary-btn">+ New account</button>
          </div>
        </header>

        <section className="stats-grid">
          {dashboard ? (
            <>
              <div className="stat-card accent">
                <span>Total revenue</span>
                <strong>{dashboard.metrics.totalRevenue}</strong>
                <em>+12.4% vs last month</em>
              </div>
              <div className="stat-card">
                <span>Active users</span>
                <strong>{dashboard.metrics.activeUsers}</strong>
                <em>+8.1% this week</em>
              </div>
              <div className="stat-card">
                <span>Conversion rate</span>
                <strong>{dashboard.metrics.conversionRate}</strong>
                <em>+1.2 pts</em>
              </div>
              <div className="stat-card">
                <span>Retention</span>
                <strong>{dashboard.metrics.avgRetention}</strong>
                <em>Excellent health</em>
              </div>
            </>
          ) : (
            <div className="loading-box">Loading dashboard data...</div>
          )}
        </section>

        <section className="content-grid">
          <div className="panel large-panel">
            <div className="panel-header">
              <h2>Customer growth</h2>
              <span className="chip success">{dashboard?.overview?.monthlyGrowth || '+0%'}</span>
            </div>

            <div className="chart-bars" aria-label="Overview chart">
              <div className="bar-group"><span className="bar h-52"></span><label>Jan</label></div>
              <div className="bar-group"><span className="bar h-66"></span><label>Feb</label></div>
              <div className="bar-group"><span className="bar h-57"></span><label>Mar</label></div>
              <div className="bar-group"><span className="bar h-74"></span><label>Apr</label></div>
              <div className="bar-group"><span className="bar h-86"></span><label>May</label></div>
              <div className="bar-group"><span className="bar h-96"></span><label>Jun</label></div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>Health score</h2>
            </div>
            <div className="score-wrap">
              <div className="score-ring">
                <span>94%</span>
              </div>
              <ul className="score-list">
                <li><strong>{dashboard?.overview?.churnRate || '0%'}</strong><span>Churn</span></li>
                <li><strong>{dashboard?.overview?.responseTime || '0s'}</strong><span>Response</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel">
            <div className="panel-header">
              <h2>Top customers</h2>
              <a href="#">View all</a>
            </div>

            <table className="customer-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Plan</th>
                  <th>Value</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {(dashboard?.customers || []).map((customer) => (
                  <tr key={customer.name}>
                    <td>{customer.name}</td>
                    <td>{customer.plan}</td>
                    <td>{customer.value}</td>
                    <td><span className={`status ${customer.status.toLowerCase()}`}>{customer.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>Recent activity</h2>
            </div>
            <ul className="activity-list">
              {(dashboard?.activity || []).map((item) => (
                <li key={item.title}>
                  <div className="dot"></div>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </div>
                  <span>{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
