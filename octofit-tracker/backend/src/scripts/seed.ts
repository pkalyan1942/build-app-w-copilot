import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    const sampleUsers = [
      { username: 'maya.chen', email: 'maya.chen@example.com', firstName: 'Maya', lastName: 'Chen' },
      { username: 'jordan.lee', email: 'jordan.lee@example.com', firstName: 'Jordan', lastName: 'Lee' },
      { username: 'sam.rivera', email: 'sam.rivera@example.com', firstName: 'Sam', lastName: 'Rivera' },
    ];
    const users = await Promise.all(sampleUsers.map((user) => User.findOneAndUpdate(
      { username: user.username },
      { $set: user },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
    )));
    const usersByUsername = new Map(users.map((user) => [user.username, user]));

    const teamDefinitions = [
      { name: 'Morning Movers', members: ['maya.chen', 'jordan.lee'] },
      { name: 'Weekend Trail Crew', members: ['sam.rivera'] },
    ];
    const teams = await Promise.all(teamDefinitions.map(({ name, members }) => Team.findOneAndUpdate(
      { name },
      { $set: { name, members: members.map((username) => usersByUsername.get(username)!._id) } },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
    )));
    const teamsByName = new Map(teams.map((team) => [team.name, team]));

    const sampleActivities = [
      { username: 'maya.chen', type: 'run', duration: 32, distance: 5.2, calories: 340, date: new Date('2026-09-28T07:15:00Z') },
      { username: 'jordan.lee', type: 'cycling', duration: 48, distance: 18.4, calories: 510, date: new Date('2026-09-28T08:00:00Z') },
      { username: 'sam.rivera', type: 'hike', duration: 95, distance: 7.8, calories: 620, date: new Date('2026-09-27T09:30:00Z') },
      { username: 'maya.chen', type: 'strength training', duration: 40, calories: 260, date: new Date('2026-09-26T17:45:00Z') },
    ];
    await Promise.all(sampleActivities.map(({ username, ...activity }) => {
      const user = usersByUsername.get(username)!;
      return Activity.findOneAndUpdate(
        { user: user._id, type: activity.type, date: activity.date },
        { $set: { user: user._id, ...activity } },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      );
    }));

    const teamByUsername = new Map([
      ['maya.chen', teamsByName.get('Morning Movers')!],
      ['jordan.lee', teamsByName.get('Morning Movers')!],
      ['sam.rivera', teamsByName.get('Weekend Trail Crew')!],
    ]);
    const scores = [
      { username: 'maya.chen', score: 1840 },
      { username: 'jordan.lee', score: 1625 },
      { username: 'sam.rivera', score: 1490 },
    ];
    await Promise.all(scores.map(({ username, score }) => {
      const user = usersByUsername.get(username)!;
      const team = teamByUsername.get(username)!;
      return LeaderboardEntry.findOneAndUpdate(
        { user: user._id, team: team._id },
        { $set: { user: user._id, team: team._id, score } },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      );
    }));

    const sampleWorkouts = [
      {
        name: 'Easy 5K Builder',
        description: 'A steady aerobic run with a relaxed cooldown.',
        difficulty: 'beginner',
        exercises: [{ name: 'Easy run', sets: 1, repetitions: 1 }, { name: 'Calf stretch', sets: 2, repetitions: 30 }],
      },
      {
        name: 'Full-Body Strength',
        description: 'A balanced strength session for legs, push, and pull.',
        difficulty: 'intermediate',
        exercises: [{ name: 'Goblet squat', sets: 3, repetitions: 10 }, { name: 'Push-up', sets: 3, repetitions: 12 }, { name: 'Dumbbell row', sets: 3, repetitions: 10 }],
      },
      {
        name: 'Hill Interval Ride',
        description: 'Short hill efforts followed by easy recovery spins.',
        difficulty: 'advanced',
        exercises: [{ name: 'Warm-up ride', sets: 1, repetitions: 1 }, { name: 'Hill interval', sets: 6, repetitions: 1 }, { name: 'Cooldown ride', sets: 1, repetitions: 1 }],
      },
    ];
    await Promise.all(sampleWorkouts.map((workout) => Workout.findOneAndUpdate(
      { name: workout.name },
      { $set: workout },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
    )));

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
