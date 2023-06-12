import express from 'express'
import * as placesServices from '../services/placesServices'
import { StatusCodes } from 'http-status-codes'

const router = express.Router()

router.get('/places/recomms', (_req, res) => {
  placesServices.getRecommsPlaces()
    .then((places) => {
      res.json(places)
    })
    .catch((err: Error) => {
      console.error(err.message)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'There was an error retrieving the recomms places, try again in some minutes' })
    })
})

router.post('/places', (_req, res) => {
  // To do
  // Router that returns places filtering by city and categeory
  res.send('Places filters by city and category!')
})

router.get('/places/:id', (req, res) => {
  const id = req.params.id
  placesServices.getPlaceById(id)
    .then((place) => {
      res.json(place)
    })
    .catch((err: Error) => {
      console.error(err.message)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'There was an error retrieving the recomms places, try again in some minutes' })
    })
})

export default router
