import { useState } from 'react';

function LeadDetail({ lead, onClose }) {
  if (!lead) return null;

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel panel" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header">
          <div>
            <p className="eyebrow">Lead details</p>
            <h2>{lead.name}</h2>
          </div>
          <button className="ghost-btn" onClick={onClose}>Close</button>
        </div>

        <div className="detail-grid">
          <div>
            <label>Company</label>
            <p>{lead.company}</p>
          </div>
          <div>
            <label>Email</label>
            <p>{lead.email}</p>
          </div>
          <div>
            <label>Phone</label>
            <p>{lead.phone || 'Not available'}</p>
          </div>
          <div>
            <label>Owner</label>
            <p>{lead.owner}</p>
          </div>
          <div>
            <label>Source</label>
            <p>{lead.source}</p>
          </div>
          <div>
            <label>Status</label>
            <p className={`status ${lead.status.toLowerCase().replace(/\s+/g, '-')}`}>{lead.status}</p>
          </div>
          <div>
            <label>Lead score</label>
            <p>{lead.score}/100</p>
          </div>
          <div>
            <label>Deal value</label>
            <p>{lead.value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadDetail;
