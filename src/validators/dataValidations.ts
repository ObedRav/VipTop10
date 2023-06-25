import express from 'express'
import { Countries } from '../types'
import { StatusCodes } from 'http-status-codes'
import cities from '../services/JSONs/cities.json' // Import the available cities
import categories from '../services/JSONs/categories.json' // Import the available categories

/**
 * This function validates if a given country is valid or not.
 * @returns either a response with a 400 status code and an error message if the country is null or
 * invalid, or it is calling the next middleware function if the country is valid.
 */
export function validateCountry (req: express.Request, res: express.Response, next: express.NextFunction): any {
  const { country } = req.body

  if (country === null) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Country is required' })
  }

  if (!Object.values(Countries).includes(country)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid country' })
  }

  next()
}

/**
 * This function validates if a city is present in a list of cities and returns an error message if it
 * is not.
 * @returns either a response with a status code and error message if the city is null or invalid, or
 * it is calling the next middleware function if the city is valid.
 */
export function validateCity (req: express.Request, res: express.Response, next: express.NextFunction): any {
  const { city } = req.body

  if (city === null) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'City is required' })
  }

  const cityNames = cities.map((city) => city.name)

  if (!cityNames.includes(city)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid city' })
  }

  next()
}

/**
 * This function validates if a category is present in the request body and if it is a valid category.
 * @returns either a response with a status code and error message if the category is null or invalid,
 * or it is calling the next middleware function if the category is valid.
 */
export function validateCategory (req: express.Request, res: express.Response, next: express.NextFunction): any {
  const { category } = req.body

  if (category === null) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Category is required' })
  }

  const categoryNames = categories.map((category) => category.name)

  if (!categoryNames.includes(category)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid category' })
  }

  next()
}
