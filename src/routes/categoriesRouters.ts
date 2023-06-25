import express from 'express'
import * as categoriesServices from '../services/categoriesServices'

const router = express.Router()

router.get('/categories', (_req, res, next) => {
  categoriesServices.getCategories()
    .then((categories) => {
      res.json(categories)
    })
    .catch(next)
})

router.get('/categories/recomms', (_req, res, next) => {
  categoriesServices.getRecommsCategories()
    .then((categories) => {
      res.json(categories)
    })
    .catch(next)
})

export default router
