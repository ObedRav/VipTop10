import express from 'express'
import * as categoriesServices from '../services/categoriesServices'

const router = express.Router()

router.get('/categories', (_req, res) => {
  categoriesServices.getCategories()
    .then((categories) => {
      res.json(categories)
    })
    .catch((err: Error) => {
      console.log(err.message)
      res.status(500).json({ error: 'There was an error, try again in some minutes' })
    })
})

router.get('/categories/recomms', (_req, res) => {
  // To do
  // Router that returns 3 recommeded categories
  res.send('Recommeded Categories!')
})

export default router
