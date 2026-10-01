import { Router } from 'express'
import type { Model } from 'mongoose'
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js'

function createResourceRouter(model: Model<any>, sort?: Record<string, 1 | -1>) {
  const router = Router()

  router.get('/', async (_request, response) => {
    const records = await model.find().sort(sort ?? {}).lean()
    response.json(records)
  })

  router.post('/', async (request, response) => {
    const record = await model.create(request.body)
    response.status(201).json(record)
  })

  return router
}

export const usersRouter = createResourceRouter(User)
export const teamsRouter = createResourceRouter(Team)
export const activitiesRouter = createResourceRouter(Activity)
export const leaderboardRouter = createResourceRouter(LeaderboardEntry, { score: -1 })
export const workoutsRouter = createResourceRouter(Workout)