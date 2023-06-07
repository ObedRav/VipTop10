import express from 'express'
import * as citiesServices from '../services/citiesServices'
import { validateCountry } from '../utils'

const router = express.Router()

router.post('/cities', validateCountry, (req, res) => {
  const { country } = req.body

  citiesServices.getCitiesByCountry(country)
    .then((filteredCities) => {
      res.json(filteredCities)
    })
    .catch((err: Error) => {
      console.log(err.message)
      res.status(500).json({ error: 'There was an error, try again in some minutes' })
    })
})

export default router
