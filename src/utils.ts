import express from 'express'
import { Countries } from './types'
import { StatusCodes } from 'http-status-codes'

/**
 * This function validates if a given country is valid or not.
 * @returns either a response with a 400 status code and an error message if the country is null or
 * invalid, or it is calling the next middleware function if the country is valid.
 */
export function validateCountry (req: express.Request, res: express.Response, next: express.NextFunction): any {
  const { country } = req.body

  if (country == null) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Country is required' })
  }

  if (!Object.values(Countries).includes(country)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid country' })
  }

  next()
}
