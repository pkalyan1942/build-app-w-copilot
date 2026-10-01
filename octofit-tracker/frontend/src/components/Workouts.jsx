import CollectionScreen from './CollectionScreen.jsx'

export default function Workouts() {
  return (
    <CollectionScreen
      resource="workouts"
      eyebrow="TRAINING PLANS"
      title="Workouts"
      description="A library of sessions for your next training day."
      columns={[
        { label: 'Workout', render: (record) => <strong>{record.name || 'Untitled workout'}</strong> },
        { label: 'Description', render: (record) => record.description || '—' },
        { label: 'Difficulty', render: (record) => <span className={`difficulty-tag difficulty-${record.difficulty || 'beginner'}`}>{record.difficulty || 'beginner'}</span> },
        { label: 'Exercises', render: (record) => record.exercises?.length ?? 0 },
      ]}
    />
  )
}