import express from 'express'
import * as categoriesServices from '../services/categoriesServices'

const router = express.Router()

router.get('/categories', (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  categoriesServices.getCategories()
    .then((categories) => {
      res.json(categories)
    })
    .catch(next)
})

router.get('/categories/recomms', (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  categoriesServices.getRecommsCategories()
    .then((categories) => {
      res.json(categories)
    })
    .catch(next)
})

export default router
