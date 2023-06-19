import express from 'express'
import * as placesServices from '../services/placesServices'
import { StatusCodes } from 'http-status-codes'
import { validateCategory, validateCity } from '../utils'

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

router.post('/places', validateCity, validateCategory, (req, res) => {
  const { city } = req.body
  const { category } = req.body

  placesServices.getPlacesByCityAndCategory(city, category)
    .then((categoryFilteredPlaces) => {
      res.status(StatusCodes.ACCEPTED).json(categoryFilteredPlaces)
    })
    .catch((err: Error) => {
      console.error(err.message)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'There was an error retrieving the cities, try again in some minutes' })
    })
})

router.get('/places/:id', (req, res) => {
  const id = req.params.id

  placesServices.getPlaceById(id)
    .then((place) => {
      res.json(place)
    })
    .catch((err: Error) => {
      console.error(err.message)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'There was an error retrieving the place, try again in some minutes' })
    })
})

router.get('/places/category/:categoryid', (req, res) => {
  const id = req.params.categoryid

  placesServices.getPlacesByCategory(id)
    .then((places) => {
      res.json(places)
    })
    .catch((err: Error) => {
      console.error(err.message)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'There was an error retrieving the places by category, try again in some minutes' })
    })
})

export default router
