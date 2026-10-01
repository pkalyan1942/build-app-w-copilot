import CollectionScreen from './CollectionScreen.jsx'
import { displayReference } from '../formatters.js'

// fetchCollection resolves this to https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/leaderboard/ in Codespaces.
export default function Leaderboard() {
  return (
    <CollectionScreen
      resource="leaderboard"
      eyebrow="COMMUNITY STANDINGS"
      title="Leaderboard"
      description="Points earned across individual and team challenges."
      columns={[
        { label: 'Rank', render: (_record, index) => <span className="rank-number">{String(index + 1).padStart(2, '0')}</span> },
        { label: 'Member', render: (record) => <strong>{displayReference(record.user)}</strong> },
        { label: 'Team', render: (record) => displayReference(record.team) },
        { label: 'Points', render: (record) => <span className="score-value">{record.score ?? 0}</span> },
      ]}
    />
  )
}