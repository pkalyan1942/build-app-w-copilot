import { useEffect, useState } from 'react'
import octofitLogo from '../../../docs/octofitapp-small.png'

function App() {
  const [apiStatus, setApiStatus] = useState('Checking')

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/health', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('API request failed')
        return response.json()
      })
      .then(() => setApiStatus('Connected'))
      .catch((error) => {
        if (error.name !== 'AbortError') setApiStatus('Unavailable')
      })

    return () => controller.abort()
  }, [])

  return (
    <main className="container py-5">
      <header className="d-flex align-items-center gap-3 border-bottom pb-4 mb-5">
        <img src={octofitLogo} width="48" height="48" alt="OctoFit" />
        <div>
          <p className="small text-uppercase fw-semibold text-success mb-1">OctoFit</p>
          <h1 className="h4 mb-0">Tracker</h1>
        </div>
      </header>

      <section className="row align-items-center gy-5">
        <div className="col-lg-8">
          <p className="small text-uppercase fw-semibold text-success">Training, connected</p>
          <h2 className="display-5 fw-semibold">Your fitness, in motion.</h2>
          <p className="lead text-body-secondary mt-3 mb-0">
            Your OctoFit Tracker workspace is ready.
          </p>
        </div>
        <div className="col-lg-4">
          <div className="border-start border-3 border-success ps-3">
            <p className="small text-uppercase fw-semibold text-body-secondary mb-1">API service</p>
            <p className="h5 mb-1" role="status">{apiStatus}</p>
            <code>/api/health</code>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
