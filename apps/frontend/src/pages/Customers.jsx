import { useState, useEffect } from 'react';
import '../styles/Customers.css';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, [search]);

  async function fetchCustomers() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      const response = await fetch(`/api/customers?${params}`);
      if (!response.ok) throw new Error('Failed to fetch customers');
      const data = await response.json();
      setCustomers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddCustomer(customerData) {
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
      });
      if (!response.ok) throw new Error('Failed to create customer');
      setShowForm(false);
      fetchCustomers();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdateCustomer(customerId, customerData) {
    try {
      const response = await fetch(`/api/customers/${customerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
      });
      if (!response.ok) throw new Error('Failed to update customer');
      setEditingCustomer(null);
      setShowForm(false);
      fetchCustomers();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteCustomer(customerId) {
    if (!window.confirm('Delete this customer?')) return;
    try {
      const response = await fetch(`/api/customers/${customerId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete customer');
      fetchCustomers();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Customer management</p>
          <h1>Accounts</h1>
        </div>
        <div className="topbar-actions">
          <button className="primary-btn" onClick={() => { setEditingCustomer(null); setShowForm(!showForm); }}>
            {showForm ? '✕ Close' : '+ New customer'}
          </button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <CustomerForm
          customer={editingCustomer}
          onSubmit={editingCustomer ? (data) => handleUpdateCustomer(editingCustomer.id, data) : handleAddCustomer}
          onCancel={() => { setShowForm(false); setEditingCustomer(null); }}
        />
      )}

      <div className="filter-panel">
        <input
          type="text"
          className="search-input"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading-box">Loading customers...</div>
      ) : customers.length > 0 ? (
        <div className="panel">
          <table className="customers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.company}</td>
                  <td>{customer.email}</td>
                  <td>{customer.plan}</td>
                  <td><span className={`status-badge ${customer.status.toLowerCase()}`}>{customer.status}</span></td>
                  <td>{customer.joinDate}</td>
                  <td>
                    <button className="icon-btn" onClick={() => { setEditingCustomer(customer); setShowForm(true); }}>✎</button>
                    <button className="icon-btn delete" onClick={() => handleDeleteCustomer(customer.id)}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p>No customers found</p>
          <button className="primary-btn" onClick={() => { setEditingCustomer(null); setShowForm(true); }}>Add first customer</button>
        </div>
      )}
    </>
  );
}

function CustomerForm({ customer, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(customer || {
    name: '',
    company: '',
    email: '',
    phone: '',
    plan: 'Growth',
    status: 'Active'
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
      <h2>{customer ? 'Edit customer' : 'Create new customer'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Company *</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Plan</label>
            <select name="plan" value={formData.plan} onChange={handleChange}>
              <option>Starter</option>
              <option>Growth</option>
              <option>Scale</option>
              <option>Enterprise</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option>Active</option>
              <option>Trial</option>
              <option>Paused</option>
              <option>Churned</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-btn">Save customer</button>
          <button type="button" className="ghost-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Customers;
