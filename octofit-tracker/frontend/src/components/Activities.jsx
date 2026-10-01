import CollectionScreen from './CollectionScreen.jsx'
import { displayReference } from '../formatters.js'

// fetchCollection resolves this to https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/activities/ in Codespaces.
function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date)
}

export default function Activities() {
  return (
    <CollectionScreen
      resource="activities"
      eyebrow="SESSION LOG"
      title="Activities"
      description="A running record of effort across your community."
      columns={[
        { label: 'Activity', render: (record) => <strong>{record.type || 'Workout'}</strong> },
        { label: 'Member', render: (record) => displayReference(record.user) },
        { label: 'Date', render: (record) => formatDate(record.date) },
        { label: 'Duration', render: (record) => record.duration != null ? `${record.duration} min` : '—' },
        { label: 'Distance', render: (record) => record.distance != null ? `${record.distance} km` : '—' },
        { label: 'Calories', render: (record) => record.calories ?? '—' },
      ]}
    />
  )
}