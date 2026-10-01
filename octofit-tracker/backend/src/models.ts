import mongoose from 'mongoose'

const { Schema } = mongoose

export const User = mongoose.models.User ?? mongoose.model('User', new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
}))

export const Team = mongoose.models.Team ?? mongoose.model('Team', new Schema({
  name: { type: String, required: true, trim: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}))

export const Activity = mongoose.models.Activity ?? mongoose.model('Activity', new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, trim: true },
  duration: { type: Number, min: 0 },
  distance: { type: Number, min: 0 },
  calories: { type: Number, min: 0 },
  date: { type: Date, default: Date.now },
}))

export const LeaderboardEntry = mongoose.models.LeaderboardEntry ?? mongoose.model('LeaderboardEntry', new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  score: { type: Number, required: true, min: 0, default: 0 },
}))

export const Workout = mongoose.models.Workout ?? mongoose.model('Workout', new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  exercises: [{ name: { type: String, required: true }, sets: Number, repetitions: Number }],
}))