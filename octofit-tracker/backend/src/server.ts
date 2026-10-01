import './config/database.js'
import express from 'express'
import { activitiesRouter, leaderboardRouter, teamsRouter, usersRouter, workoutsRouter } from './routes.js'

const app = express()
const port = 8000
const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api', apiBaseUrl })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  if (error instanceof Error && error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
    return
  }

  console.error('API request failed:', error)
  response.status(500).json({ error: 'Internal server error' })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`)
})