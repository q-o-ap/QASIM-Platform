function LeadList({ leads, onEdit, onDelete }) {
  return (
    <div className="panel">
      <table className="leads-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Source</th>
            <th>Status</th>
            <th>Score</th>
            <th>Value</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead.id}>
              <td><strong>{lead.name}</strong></td>
              <td>{lead.company}</td>
              <td>{lead.email}</td>
              <td><span className="tag">{lead.source}</span></td>
              <td><span className={`status ${lead.status.toLowerCase().replace(/\s+/g, '-')}`}>{lead.status}</span></td>
              <td><span className="score">{lead.score}</span></td>
              <td>{lead.value}</td>
              <td>{lead.owner}</td>
              <td>
                <button className="icon-btn" title="Edit" onClick={() => onEdit(lead)}>✎</button>
                <button className="icon-btn delete" title="Delete" onClick={() => onDelete(lead.id)}>✕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadList;
