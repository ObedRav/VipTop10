import express from 'express'
import * as citiesServices from '../services/citiesServices'
import { validateCountry } from '../utils'
import { StatusCodes } from 'http-status-codes'

const router = express.Router()

router.post('/cities', validateCountry, (req, res) => {
  const { country } = req.body

  citiesServices.getCitiesByCountry(country)
    .then((filteredCities) => {
      res.status(StatusCodes.ACCEPTED).json(filteredCities)
    })
    .catch((err: Error) => {
      console.error(err.message)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'There was an error retrieving the cities, try again in some minutes' })
    })
})

export default router
