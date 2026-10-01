import useCollection from '../useCollection.js'

export default function CollectionScreen({ title, eyebrow, description, resource, columns }) {
  const { records, status, error } = useCollection(resource)

  return (
    <section className="collection-screen" aria-labelledby={`${resource}-heading`}>
      <div className="collection-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${resource}-heading`}>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="record-count" aria-live="polite">
          <span>{status === 'ready' ? records.length : '—'}</span>
          <small>RECORDS</small>
        </div>
      </div>

      <div className="collection-table-wrap">
        {status === 'loading' && <p className="collection-message" role="status">Loading {title.toLowerCase()}…</p>}
        {status === 'error' && <p className="collection-message error-message" role="alert">{error}</p>}
        {status === 'ready' && records.length === 0 && (
          <p className="collection-message">No {title.toLowerCase()} have been added yet.</p>
        )}
        {status === 'ready' && records.length > 0 && (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead><tr>{columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}</tr></thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={record._id || record.id || `${resource}-${index}`}>
                    {columns.map((column) => <td key={column.label}>{column.render(record, index)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}