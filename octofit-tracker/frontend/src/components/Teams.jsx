import CollectionScreen from './CollectionScreen.jsx'

export default function Teams() {
  return (
    <CollectionScreen
      resource="teams"
      eyebrow="GROUPS & GOALS"
      title="Teams"
      description="Find your crew and see who is moving together."
      columns={[
        { label: 'Team', render: (record) => <strong>{record.name || 'Unnamed team'}</strong> },
        { label: 'Members', render: (record) => record.members?.length ?? 0 },
        { label: 'Member IDs', render: (record) => record.members?.length ? record.members.map((member) => String(member?.username || member?._id || member).slice(-6)).join(', ') : '—' },
      ]}
    />
  )
}