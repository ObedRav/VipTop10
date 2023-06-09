import express from 'express'
import * as categoriesServices from '../services/categoriesServices'

const router = express.Router()

router.get('/categories', (_req, res) => {
  categoriesServices.getCategories()
    .then((categories) => {
      res.json(categories)
    })
    .catch((err: Error) => {
      console.error(err.message)
      res.status(500).json({ error: 'There was an error retrieving the categories, try again in some minutes' })
    })
})

router.get('/categories/recomms', (_req, res) => {
  categoriesServices.getRecommsCategories()
    .then((categories) => {
      res.json(categories)
    })
    .catch((err: Error) => {
      console.error(err.message)
      res.status(500).json({ error: 'There was an error retrieving the recomms categories, try again in some minutes' })
    })
})

export default router
