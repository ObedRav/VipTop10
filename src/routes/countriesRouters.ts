import express from 'express'
import * as countriesServices from '../services/countriesServices'
import { StatusCodes } from 'http-status-codes'

const router = express.Router()

router.get('/countries', (_req, res) => {
  // To do
  // Router that returns all the countries
  countriesServices.getCountries()
    .then((countries) => {
      res.json(countries)
    })
    .catch((err: Error) => {
      console.error(err.message)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'There was an error retrieving the categories, try again in some minutes' })
    })
})
export default router
