import { useState } from 'react';

function LeadForm({ lead, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(lead || {
    name: '',
    company: '',
    email: '',
    phone: '',
    source: 'Website',
    status: 'New',
    score: 50,
    value: '$0',
    owner: 'Unassigned'
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <div className="form-panel panel">
      <h2>{lead ? 'Edit Lead' : 'Create New Lead'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Lead name"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Company *</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              placeholder="Company name"
            />
          </div>
          <div className="form-group">
            <label>Source</label>
            <select name="source" value={formData.source} onChange={handleChange}>
              <option>Website</option>
              <option>Referral</option>
              <option>Outbound</option>
              <option>Campaign</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="email@company.com"
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1-555-0000"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option>New</option>
              <option>Qualified</option>
              <option>Follow-up</option>
              <option>Converted</option>
            </select>
          </div>
          <div className="form-group">
            <label>Owner</label>
            <input
              type="text"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              placeholder="Sales rep name"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Score (0-100)</label>
            <input
              type="number"
              name="score"
              value={formData.score}
              onChange={handleChange}
              min="0"
              max="100"
            />
          </div>
          <div className="form-group">
            <label>Deal Value</label>
            <input
              type="text"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="$0"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-btn">Save Lead</button>
          <button type="button" className="ghost-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default LeadForm;
