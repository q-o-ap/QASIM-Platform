function DealList({ deals, onView, onEdit, onDelete }) {
  return (
    <div className="panel">
      <table className="deals-table">
        <thead>
          <tr>
            <th>Deal Name</th>
            <th>Company</th>
            <th>Value</th>
            <th>Stage</th>
            <th>Owner</th>
            <th>Probability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deals.map(deal => (
            <tr key={deal.id}>
              <td><strong>{deal.name}</strong></td>
              <td>{deal.company}</td>
              <td>{deal.value}</td>
              <td><span className={`stage ${deal.stage.toLowerCase().replace(/\s+/g, '-')}`}>{deal.stage}</span></td>
              <td>{deal.owner}</td>
              <td><span className="probability">{deal.probability}%</span></td>
              <td>
                <button className="icon-btn" title="View details" onClick={() => onView(deal)}>◉</button>
                <button className="icon-btn" title="Edit" onClick={() => onEdit(deal)}>✎</button>
                <button className="icon-btn delete" title="Delete" onClick={() => onDelete(deal.id)}>✕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DealList;
