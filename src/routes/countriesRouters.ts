import express from 'express'

const router = express.Router()

router.get('/countries', (_req, res) => {
  // To do
  // Router that returns all the countries
  res.send('Countries!')
})

export default router
