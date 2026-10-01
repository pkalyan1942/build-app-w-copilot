import './config/database.js'
import cors from 'cors'
import express from 'express'
import { activitiesRouter, leaderboardRouter, teamsRouter, usersRouter, workoutsRouter } from './routes.js'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
const frontendOrigins = new Set(['http://localhost:5173', 'http://127.0.0.1:5173'])
if (codespaceName) frontendOrigins.add(`https://${codespaceName}-5173.app.github.dev`)

app.use(cors({
  origin: (origin, callback) => callback(null, Boolean(origin && frontendOrigins.has(origin))),
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
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
