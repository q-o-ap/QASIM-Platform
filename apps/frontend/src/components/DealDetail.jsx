import { useState } from 'react';

function DealDetail({ deal, onClose, onConvertToCustomer }) {
  const [showConvertForm, setShowConvertForm] = useState(false);
  const [convertData, setConvertData] = useState({
    plan: 'Growth',
    contact: { name: deal.name, email: '', phone: '' }
  });

  function handleConvertChange(e) {
    const { name, value } = e.target;
    if (name.startsWith('contact.')) {
      const field = name.replace('contact.', '');
      setConvertData(prev => ({
        ...prev,
        contact: { ...prev.contact, [field]: value }
      }));
    } else {
      setConvertData(prev => ({ ...prev, [name]: value }));
    }
  }

  function handleConvertSubmit(e) {
    e.preventDefault();
    if (deal.stage !== 'Closed Won') {
      alert('Only closed deals can be converted to customers');
      return;
    }
    onConvertToCustomer(deal.id, convertData);
    setShowConvertForm(false);
  }

  if (!deal) return null;

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel panel" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header">
          <div>
            <p className="eyebrow">Deal details</p>
            <h2>{deal.name}</h2>
          </div>
          <button className="ghost-btn" onClick={onClose}>Close</button>
        </div>

        {!showConvertForm ? (
          <>
            <div className="detail-grid">
              <div>
                <label>Company</label>
                <p>{deal.company}</p>
              </div>
              <div>
                <label>Deal value</label>
                <p>{deal.value}</p>
              </div>
              <div>
                <label>Owner</label>
                <p>{deal.owner}</p>
              </div>
              <div>
                <label>Stage</label>
                <p className={`stage ${deal.stage.toLowerCase().replace(/\s+/g, '-')}`}>{deal.stage}</p>
              </div>
              <div>
                <label>Probability</label>
                <p>{deal.probability}%</p>
              </div>
              <div>
                <label>Created</label>
                <p>{deal.createdAt}</p>
              </div>
            </div>

            {deal.stage === 'Closed Won' && (
              <div className="convert-section">
                <button className="primary-btn" onClick={() => setShowConvertForm(true)}>
                  ✓ Convert to Customer
                </button>
              </div>
            )}
          </>
        ) : (
          <form onSubmit={handleConvertSubmit} className="convert-form">
            <h3>Convert Deal to Customer</h3>
            
            <div className="form-group">
              <label>Plan *</label>
              <select name="plan" value={convertData.plan} onChange={handleConvertChange}>
                <option>Starter</option>
                <option>Growth</option>
                <option>Scale</option>
                <option>Enterprise</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Contact name</label>
                <input
                  type="text"
                  name="contact.name"
                  value={convertData.contact.name}
                  onChange={handleConvertChange}
                  placeholder="Contact name"
                />
              </div>
              <div className="form-group">
                <label>Contact email</label>
                <input
                  type="email"
                  name="contact.email"
                  value={convertData.contact.email}
                  onChange={handleConvertChange}
                  placeholder="email@company.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Contact phone</label>
              <input
                type="tel"
                name="contact.phone"
                value={convertData.contact.phone}
                onChange={handleConvertChange}
                placeholder="+1-555-0000"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-btn">Complete conversion</button>
              <button type="button" className="ghost-btn" onClick={() => setShowConvertForm(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default DealDetail;
