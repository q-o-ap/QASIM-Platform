import { useEffect, useState } from 'react';
import LeadForm from '../components/LeadForm';
import LeadList from '../components/LeadList';
import LeadFilters from '../components/LeadFilters';
import LeadDetail from '../components/LeadDetail';
import '../styles/Leads.css';

function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [filters, setFilters] = useState({ status: '', source: '', search: '' });

  useEffect(() => {
    fetchLeads();
  }, [filters]);

  async function fetchLeads() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.source) params.append('source', filters.source);
      if (filters.search) params.append('search', filters.search);

      const response = await fetch(`/api/leads?${params}`);
      if (!response.ok) throw new Error('Failed to fetch leads');
      const data = await response.json();
      setLeads(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddLead(leadData) {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      if (!response.ok) throw new Error('Failed to create lead');
      setShowForm(false);
      fetchLeads();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdateLead(leadId, leadData) {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      if (!response.ok) throw new Error('Failed to update lead');
      setEditingLead(null);
      setShowForm(false);
      fetchLeads();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteLead(leadId) {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      const response = await fetch(`/api/leads/${leadId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete lead');
      fetchLeads();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Leads Management</p>
          <h1>Sales pipeline</h1>
        </div>
        <div className="topbar-actions">
          <button className="primary-btn" onClick={() => { setEditingLead(null); setShowForm(!showForm); }}>
            {showForm ? '✕ Close' : '+ New lead'}
          </button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <LeadForm 
          lead={editingLead} 
          onSubmit={editingLead ? 
            (data) => handleUpdateLead(editingLead.id, data) : 
            handleAddLead
          }
          onCancel={() => { setShowForm(false); setEditingLead(null); }}
        />
      )}

      <LeadFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="loading-box">Loading leads...</div>
      ) : leads.length > 0 ? (
        <LeadList 
          leads={leads} 
          onView={(lead) => setSelectedLead(lead)}
          onEdit={(lead) => { setEditingLead(lead); setShowForm(true); }}
          onDelete={handleDeleteLead}
        />
      ) : (
        <div className="empty-state">
          <p>No leads found</p>
          <button className="primary-btn" onClick={() => { setEditingLead(null); setShowForm(true); }}>
            Create your first lead
          </button>
        </div>
      )}

      {selectedLead && <LeadDetail lead={selectedLead} onClose={() => setSelectedLead(null)} />}
    </>
  );
}

export default Leads;
