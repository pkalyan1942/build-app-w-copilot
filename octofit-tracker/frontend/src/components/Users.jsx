import CollectionScreen from './CollectionScreen.jsx'

// fetchCollection resolves this to https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/users/ in Codespaces.
export default function Users() {
  return (
    <CollectionScreen
      resource="users"
      eyebrow="YOUR COMMUNITY"
      title="Members"
      description="People building healthy routines together."
      columns={[
        { label: 'Username', render: (record) => <strong>{record.username || '—'}</strong> },
        { label: 'Name', render: (record) => [record.firstName, record.lastName].filter(Boolean).join(' ') || '—' },
        { label: 'Email', render: (record) => record.email || '—' },
      ]}
    />
  )
}