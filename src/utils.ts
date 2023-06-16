import express from 'express'
import { Countries } from './types'
import { StatusCodes } from 'http-status-codes'
import cities from './services/JSONs/cities.json' // Import the available cities
import categories from './services/JSONs/categories.json' // Import the available categories

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
 * @param req - express.Request - This is the request object that contains information about the
 * incoming HTTP request.
 * @param res - `res` stands for response and it is an object that represents the HTTP response that an
 * Express app sends when it receives an HTTP request. It contains methods and properties that allow
 * the app to send data back to the client, such as `status`, `json`, `send`, etc. In the
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the chain. It is typically used to move on to the next middleware function after the current
 * middleware function has completed its task. If there are no more middleware functions in the chain,
 * `next` is used to
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
 * @param req - An object representing the HTTP request made to the server.
 * @param res - `res` stands for response and it is an object that represents the HTTP response that an
 * Express app sends when it receives an HTTP request. It contains methods to set the response status,
 * headers, and body. In the context of this code snippet, `res` is used to send an error response
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to move on to the next middleware function after the current
 * middleware function has completed its task. If there are no more middleware functions in the stack,
 * `next` is used to
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
