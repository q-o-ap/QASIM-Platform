import { useEffect, useState } from 'react';

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        setDashboard(data);
      } catch (error) {
        console.error('Failed to fetch CRM data:', error);
        setDashboard({
          metrics: {
            monthlyRevenue: '$0',
            newLeads: '0',
            winRate: '0%',
            pipelineHealth: '0%'
          },
          leads: [],
          activity: [],
          overview: {
            activeDeals: '0',
            conversion: '0%',
            avgCycleTime: '0 days',
            teamTarget: '0%'
          }
        });
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">CRM dashboard</p>
          <h1>Revenue overview</h1>
        </div>
        <div className="topbar-actions">
          <button className="ghost-btn">Export</button>
          <button className="primary-btn">+ New deal</button>
        </div>
      </header>

      <section className="stats-grid">
        {dashboard ? (
          <>
            <div className="stat-card accent">
              <span>Monthly revenue</span>
              <strong>{dashboard.metrics.monthlyRevenue}</strong>
              <em>+12.4% vs last month</em>
            </div>
            <div className="stat-card">
              <span>New leads</span>
              <strong>{dashboard.metrics.newLeads}</strong>
              <em>+18.1% this week</em>
            </div>
            <div className="stat-card">
              <span>Win rate</span>
              <strong>{dashboard.metrics.winRate}</strong>
              <em>+2.1 pts</em>
            </div>
            <div className="stat-card">
              <span>Pipeline health</span>
              <strong>{dashboard.metrics.pipelineHealth}</strong>
              <em>Strong momentum</em>
            </div>
          </>
        ) : (
          <div className="loading-box">Loading CRM analytics...</div>
        )}
      </section>

      <section className="content-grid">
        <div className="panel large-panel">
          <div className="panel-header">
            <h2>Sales pipeline</h2>
            <span className="chip success">{dashboard?.overview?.conversion || '0%'}</span>
          </div>

          <div className="chart-bars" aria-label="Sales pipeline chart">
            <div className="bar-group"><span className="bar h-40"></span><label>Jan</label></div>
            <div className="bar-group"><span className="bar h-52"></span><label>Feb</label></div>
            <div className="bar-group"><span className="bar h-58"></span><label>Mar</label></div>
            <div className="bar-group"><span className="bar h-70"></span><label>Apr</label></div>
            <div className="bar-group"><span className="bar h-80"></span><label>May</label></div>
            <div className="bar-group"><span className="bar h-96"></span><label>Jun</label></div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Team performance</h2>
          </div>
          <div className="score-wrap">
            <div className="score-ring">
              <span>84%</span>
            </div>
            <ul className="score-list">
              <li><strong>{dashboard?.overview?.activeDeals || '0'}</strong><span>Active deals</span></li>
              <li><strong>{dashboard?.overview?.avgCycleTime || '0 days'}</strong><span>Avg cycle</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bottom-grid">
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
    </>
  );
}

export default Dashboard;
