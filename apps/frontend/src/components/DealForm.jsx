import { useState } from 'react';

function DealForm({ deal, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(deal || {
    name: '',
    company: '',
    value: '$0',
    stage: 'Discovery',
    owner: 'Unassigned',
    probability: 50
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
      <h2>{deal ? 'Edit Deal' : 'Create New Deal'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Deal Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Deal name"
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

        <div className="form-row">
          <div className="form-group">
            <label>Stage</label>
            <select name="stage" value={formData.stage} onChange={handleChange}>
              <option>Discovery</option>
              <option>Proposal</option>
              <option>Negotiation</option>
              <option>Closed Won</option>
              <option>Closed Lost</option>
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
            <label>Probability (%)</label>
            <input
              type="number"
              name="probability"
              value={formData.probability}
              onChange={handleChange}
              min="0"
              max="100"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-btn">Save Deal</button>
          <button type="button" className="ghost-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default DealForm;
