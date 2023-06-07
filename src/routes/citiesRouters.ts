import express from 'express'

const router = express.Router()

router.get('/cities', (_req, res) => {
  // To do
  // Router that returns all the cities
  res.send('Cities!')
})

export default router
