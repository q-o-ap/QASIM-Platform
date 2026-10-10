function DealFilters({ filters, setFilters }) {
  return (
    <div className="filter-panel">
      <input
        type="text"
        placeholder="Search by deal name or company..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="search-input"
      />
      <select
        value={filters.stage}
        onChange={(e) => setFilters({ ...filters, stage: e.target.value })}
      >
        <option value="">All stages</option>
        <option value="Discovery">Discovery</option>
        <option value="Proposal">Proposal</option>
        <option value="Negotiation">Negotiation</option>
        <option value="Closed Won">Closed Won</option>
        <option value="Closed Lost">Closed Lost</option>
      </select>
    </div>
  );
}

export default DealFilters;
