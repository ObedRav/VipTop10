import express from 'express'
import { StatusCodes } from 'http-status-codes'
import * as categoriesServices from '../services/categoriesServices'

const router = express.Router()

router.get('/categories', (_req, res) => {
  categoriesServices.getCategories()
    .then((categories) => {
      res.json(categories)
    })
    .catch((err: Error) => {
      console.error(err.message)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'There was an error retrieving the categories, try again in some minutes' })
    })
})

router.get('/categories/recomms', (_req, res) => {
  categoriesServices.getRecommsCategories()
    .then((categories) => {
      res.json(categories)
    })
    .catch((err: Error) => {
      console.error(err.message)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'There was an error retrieving the recomms categories, try again in some minutes' })
    })
})

export default router
