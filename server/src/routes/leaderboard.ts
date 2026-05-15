import { prisma } from '../db'
import { Router } from 'express'
const router = Router()


router.get('/', async (req,res) => {
  const leaderboard = await prisma.matchPlayer.groupBy({
    by: ['playerName'],
    _count: {won: true},
    where: {won: true},
    orderBy: {_count: {won: 'desc'}},
    take: 10
  })
  res.json(leaderboard);
})

export { router as leaderboardRouter } 
