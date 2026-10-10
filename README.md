:root {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.5;
  color: #eaf2ff;
  background: #07131d;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  min-height: 100vh;
}

body {
  background: linear-gradient(135deg, #08141d 0%, #0d1b2a 100%);
}

button, a {
  font: inherit;
}

.app-shell {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}

.sidebar {
  background: rgba(10, 17, 27, 0.9);
  border-right: 1px solid rgba(158, 180, 210, 0.14);
  padding: 24px 18px;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 8px 22px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #5ca6ff, #73f1d3);
  color: #07131d;
  font-weight: 900;
}

.brand-name {
  font-weight: 700;
  letter-spacing: 0.08em;
}

.brand-block small {
  color: #90a8c0;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
}

.nav a {
  text-decoration: none;
  color: #cfe0f0;
  padding: 10px 12px;
  border-radius: 10px;
  transition: 0.2s ease;
}

.nav a.active,
.nav a:hover {
  background: rgba(92, 166, 255, 0.12);
  color: #f1f7ff;
}

.mini-panel {
  margin-top: 28px;
  background: rgba(19, 34, 47, 0.7);
  border: 1px solid rgba(150, 178, 211, 0.14);
  border-radius: 16px;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #a8bfdc;
}

.mini-panel strong {
  color: #e2efff;
}

.main-panel {
  padding: 28px 30px 40px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
  gap: 20px;
}

.eyebrow {
  margin: 0 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 11px;
  color: #8ea9c6;
}

.topbar h1 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 2.7rem);
}

.topbar-actions {
  display: flex;
  gap: 12px;
}

.ghost-btn,
.primary-btn,
.quick-actions button {
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  cursor: pointer;
}

.ghost-btn {
  background: rgba(179, 195, 214, 0.08);
  color: #d9ebb5;
  border: 1px solid rgba(151, 176, 209, 0.12);
}

.primary-btn {
  background: linear-gradient(135deg, #5daafc, #74e3d2);
  color: #07131d;
  font-weight: 700;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.stat-card {
  background: rgba(16, 27, 38, 0.75);
  border: 1px solid rgba(154, 176, 204, 0.12);
  border-radius: 18px;
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-card.accent {
  background: linear-gradient(135deg, rgba(93, 170, 252, 0.18), rgba(116, 227, 210, 0.06));
}

.stat-card span,
.stat-card em {
  color: #9fb7d3;
}

.stat-card strong {
  font-size: clamp(1.5rem, 2vw, 2rem);
}

.content-grid,
.bottom-grid {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 18px;
  margin-top: 18px;
}

.panel {
  background: rgba(15, 26, 38, 0.75);
  border: 1px solid rgba(154, 176, 204, 0.12);
  border-radius: 18px;
  padding: 20px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.1rem;
}

.panel-header a {
  color: #8ec7ff;
  text-decoration: none;
}

.chip {
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 700;
}

.chip.success {
  background: rgba(105, 208, 140, 0.12);
  color: #adefc4;
}

.chart-bars {
  height: 220px;
  display: flex;
  align-items: end;
  gap: 16px;
  padding-top: 18px;
}

.bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 10px;
  height: 100%;
}

.bar {
  display: block;
  width: 100%;
  max-width: 38px;
  border-radius: 12px 12px 0 0;
  background: linear-gradient(180deg, #7dc5ff 0%, #7fe9d6 100%);
}

.h-40 { height: 40%; }
.h-52 { height: 52%; }
.h-58 { height: 58%; }
.h-70 { height: 70%; }
.h-80 { height: 80%; }
.h-96 { height: 96%; }

.bar-group label {
  color: #90a9c4;
  font-size: 12px;
}

.score-wrap {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 8px;
}

.score-ring {
  width: 130px;
  height: 130px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: conic-gradient(#7ce1d6 0 84%, rgba(255,255,255,0.09) 84% 100%);
  position: relative;
}

.score-ring::before {
  content: '';
  position: absolute;
  inset: 16px;
  background: rgba(10, 18, 27, 0.9);
  border-radius: 50%;
}

.score-ring span {
  position: relative;
  z-index: 1;
  font-weight: 800;
  font-size: 1.5rem;
}

.score-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
}

.score-list li {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: rgba(20, 36, 48, 0.7);
  border-radius: 10px;
  padding: 10px 12px;
}

.score-list strong {
  font-size: 1.2rem;
}

.score-list span {
  color: #a7bed8;
  font-size: 12px;
}

.customer-table {
  width: 100%;
  border-collapse: collapse;
  color: #e6edf9;
}

.customer-table th,
.customer-table td {
  text-align: left;
  padding: 12px 8px;
  border-bottom: 1px solid rgba(148, 170, 195, 0.12);
}

.customer-table th {
  color: #90a9c5;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 12px;
}

.status {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.status.active,
.status.qualified {
  background: rgba(96, 198, 145, 0.15);
  color: #aaf0c0;
}

.status.follow-up {
  background: rgba(255, 184, 94, 0.15);
  color: #ffd17d;
}

.status.new {
  background: rgba(120, 160, 255, 0.15);
  color: #b8d1ff;
}

.activity-list,
.lead-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-list li,
.lead-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(148, 170, 195, 0.12);
}

.activity-list li:last-child,
.lead-list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: linear-gradient(180deg, #7ccaff, #74f0d6);
  margin-top: 8px;
}

.activity-list strong,
.lead-list strong {
  display: block;
  margin-bottom: 4px;
}

.activity-list p,
.lead-list small {
  margin: 0;
  color: #a9c0d9;
  font-size: 0.9rem;
}

.activity-list span {
  margin-left: auto;
  color: #8ea9c5;
  font-size: 12px;
}

.lead-list li {
  justify-content: space-between;
  gap: 16px;
}

.lead-list li > div {
  flex: 1;
}

.lead-list li > div:last-of-type {
  text-align: right;
}

.lead-list span {
  display: block;
  color: #9fb8d0;
  font-size: 12px;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  gap: 12px;
}

.quick-actions button {
  background: rgba(118, 156, 195, 0.12);
  color: #eaf2ff;
  border: 1px solid rgba(150, 176, 208, 0.12);
}

.loading-box {
  background: rgba(19, 33, 46, 0.8);
  border: 1px solid rgba(148, 170, 195, 0.12);
  border-radius: 18px;
  padding: 30px;
  text-align: center;
  color: #bfd1ea;
}

@media (max-width: 980px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    border-right: none;
    border-bottom: 1px solid rgba(141, 163, 188, 0.14);
  }

  .stats-grid,
  .content-grid,
  .bottom-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .topbar-actions {
    width: 100%;
  }

  .quick-actions {
    grid-template-columns: 1fr;
  }
}
