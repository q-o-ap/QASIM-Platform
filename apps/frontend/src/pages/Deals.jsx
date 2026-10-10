import { useEffect, useState } from 'react';
import DealForm from '../components/DealForm';
import DealList from '../components/DealList';
import DealFilters from '../components/DealFilters';
import DealDetail from '../components/DealDetail';
import '../styles/Deals.css';

function Deals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [filters, setFilters] = useState({ stage: '', owner: '', search: '' });

  useEffect(() => {
    fetchDeals();
  }, [filters]);

  async function fetchDeals() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.stage) params.append('stage', filters.stage);
      if (filters.owner) params.append('owner', filters.owner);
      if (filters.search) params.append('search', filters.search);

      const response = await fetch(`/api/deals?${params}`);
      if (!response.ok) throw new Error('Failed to fetch deals');
      const data = await response.json();
      setDeals(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddDeal(dealData) {
    try {
      const response = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dealData)
      });
      if (!response.ok) throw new Error('Failed to create deal');
      setShowForm(false);
      fetchDeals();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdateDeal(dealId, dealData) {
    try {
      const response = await fetch(`/api/deals/${dealId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dealData)
      });
      if (!response.ok) throw new Error('Failed to update deal');
      setEditingDeal(null);
      setShowForm(false);
      fetchDeals();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteDeal(dealId) {
    if (!window.confirm('Are you sure you want to delete this deal?')) return;
    try {
      const response = await fetch(`/api/deals/${dealId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete deal');
      fetchDeals();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleConvertToCustomer(dealId, customerData) {
    try {
      const response = await fetch(`/api/deals/${dealId}/convert-customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
      });
      if (!response.ok) throw new Error('Failed to convert deal to customer');
      setSelectedDeal(null);
      fetchDeals();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Pipeline Management</p>
          <h1>Sales deals</h1>
        </div>
        <div className="topbar-actions">
          <button className="primary-btn" onClick={() => { setEditingDeal(null); setShowForm(!showForm); }}>
            {showForm ? '✕ Close' : '+ New deal'}
          </button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <DealForm 
          deal={editingDeal} 
          onSubmit={editingDeal ? 
            (data) => handleUpdateDeal(editingDeal.id, data) : 
            handleAddDeal
          }
          onCancel={() => { setShowForm(false); setEditingDeal(null); }}
        />
      )}

      <DealFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="loading-box">Loading deals...</div>
      ) : deals.length > 0 ? (
        <DealList 
          deals={deals} 
          onView={(deal) => setSelectedDeal(deal)}
          onEdit={(deal) => { setEditingDeal(deal); setShowForm(true); }}
          onDelete={handleDeleteDeal}
        />
      ) : (
        <div className="empty-state">
          <p>No deals found</p>
          <button className="primary-btn" onClick={() => { setEditingDeal(null); setShowForm(true); }}>
            Create your first deal
          </button>
        </div>
      )}

      {selectedDeal && (
        <DealDetail 
          deal={selectedDeal} 
          onClose={() => setSelectedDeal(null)}
          onConvertToCustomer={handleConvertToCustomer}
        />
      )}
    </>
  );
}

export default Deals;
