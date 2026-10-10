function LeadFilters({ filters, setFilters }) {
  return (
    <div className="filter-panel">
      <input
        type="text"
        placeholder="Search by name, company, or email..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="search-input"
      />
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">All statuses</option>
        <option value="New">New</option>
        <option value="Qualified">Qualified</option>
        <option value="Follow-up">Follow-up</option>
        <option value="Converted">Converted</option>
      </select>
      <select
        value={filters.source}
        onChange={(e) => setFilters({ ...filters, source: e.target.value })}
      >
        <option value="">All sources</option>
        <option value="Website">Website</option>
        <option value="Referral">Referral</option>
        <option value="Outbound">Outbound</option>
        <option value="Campaign">Campaign</option>
      </select>
    </div>
  );
}

export default LeadFilters;
