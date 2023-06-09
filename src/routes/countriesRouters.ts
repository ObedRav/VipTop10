import express from 'express'
import * as countriesServices from '../services/countriesServices'

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
      res.status(500).json({ error: 'There was an error retrieving the categories, try again in some minutes' })
    })
})
export default router
