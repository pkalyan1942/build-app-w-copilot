import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { API_BASE_URL } from './api.js'

const sections = [
  { label: 'Members', path: '/users' },
  { label: 'Teams', path: '/teams' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Workouts', path: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          <NavLink className="brand-lockup" to="/users" aria-label="OctoFit Tracker home">
            <img src={octofitLogo} width="42" height="42" alt="" />
            <span className="brand-name">OctoFit<span>TRACKER</span></span>
          </NavLink>
          <div className="api-indicator" title={API_BASE_URL || 'Using the local Vite API proxy'}>
            <span className="api-indicator-dot" />
            {API_BASE_URL ? 'CODESPACE API' : 'LOCAL API'}
          </div>
        </div>
      </header>

      <main className="app-main">
        <section className="page-heading">
          <div>
            <p className="eyebrow">TRAINING NETWORK <span>/</span> OVERVIEW</p>
            <h1>Move together.</h1>
          </div>
          <p className="page-intro">People, progress, and plans from across your OctoFit community.</p>
        </section>

        <nav className="section-nav" aria-label="Tracker sections">
          {sections.map(({ label, path }) => (
            <NavLink key={path} className={({ isActive }) => `section-link${isActive ? ' active' : ''}`} to={path}>
              {label}
            </NavLink>
          ))}
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
