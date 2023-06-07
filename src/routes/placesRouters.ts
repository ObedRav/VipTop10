import express from 'express'

const router = express.Router()

router.get('/places/recomms', (_req, res) => {
  // To do
  // Router that returns 6 recommeded places
  res.send('Recommended Places!')
})

router.post('/places', (_req, res) => {
  // To do
  // Router that returns places filtering by city and categeory
  res.send('Places filters by city and category!')
})

router.get('/places/:id', (_req, res) => {
  // To do
  // Router that returns a specific place
  res.send('Place with a specific ID!')
})

export default router
