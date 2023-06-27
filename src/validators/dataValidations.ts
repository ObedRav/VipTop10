import express from 'express'
import { Countries } from '../types'
import { StatusCodes } from 'http-status-codes'
import cities from '../database/JSONs/cities.json' // Import the available cities
import categories from '../database/JSONs/categories.json' // Import the available categories

/**
 * This function validates if a given country is valid or not.
 * @param req - The Express request object
 * @param res - The Express response object
 * @param next - The Express next function
 * @returns If the `country` is null, it returns a JSON response with a status code of 400 (Bad Request)
 * and an error message indicating that the country is required. If the `country` is not a valid country
 * from the `Countries` enum, it returns a JSON response with a status code of 400 (Bad Request) and an
 * error message indicating that the country is invalid. Otherwise, it calls the `next()` function to
 * move on to the next middleware function.
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
 * This function validates if a city is present in a list of cities and returns an error message if it is not.
 * @param req - The Express request object
 * @param res - The Express response object
 * @param next - The Express next function
 * @returns If the `city` is null, it returns a JSON response with a status code of 400 (Bad Request) and an
 * error message indicating that the city is required. If the `city` is not present in the list of cities,
 * it returns a JSON response with a status code of 400 (Bad Request) and an error message indicating that
 * the city is invalid. Otherwise, it calls the `next()` function to move on to the next middleware function.
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
 * @param req - The Express request object
 * @param res - The Express response object
 * @param next - The Express next function
 * @returns If the `category` is null, it returns a JSON response with a status code of 400 (Bad Request)
 * and an error message indicating that the category is required. If the `category` is not present in the
 * list of categories, it returns a JSON response with a status code of 400 (Bad Request) and an error message
 * indicating that the category is invalid. Otherwise, it calls the `next()` function to move on to the next
 * middleware function.
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
