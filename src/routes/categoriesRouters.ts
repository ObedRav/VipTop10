import express from 'express'

const router = express.Router()

router.get('/categories', (_req, res) => {
  // To do
  // Router that returns all the categories
  res.send('Categories!')
})

router.get('/categories/recomms', (_req, res) => {
  // To do
  // Router that returns 3 recommeded categories
  res.send('Recommeded Categories!')
})

export default router
