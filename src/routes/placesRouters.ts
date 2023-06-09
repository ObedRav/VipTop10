import express from 'express'
import * as placesServices from '../services/placesServices'

const router = express.Router()

router.get('/places/recomms', (_req, res) => {
  placesServices.getRecommsPlaces()
    .then((places) => {
      res.json(places)
    })
    .catch((err: Error) => {
      console.error(err.message)
      res.status(500).json({ error: 'There was an error retrieving the recomms places, try again in some minutes' })
    })
})

router.post('/places', (_req, res) => {
  // To do
  // Router that returns places filtering by city and categeory
  res.send('Places filters by city and category!')
})

router.get('/places/:id', (_req, res) => {
  // To do
  // Router that returns a specific place
  res.send('Place with a specific ID!')
})

export default router
