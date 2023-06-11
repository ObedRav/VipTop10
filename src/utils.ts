import express from 'express'
import { Countries } from './types'

/**
 * This function validates if a given country is valid or not.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information such as the request method, headers, URL, and body.
 * @param res - `res` stands for response and it is an object that represents the HTTP response that an
 * Express app sends when it receives an HTTP request. It contains methods for setting the HTTP status
 * code, headers, and body of the response. In the context of the `validateCountry` function, `res`
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to move on to the next middleware function after the current
 * middleware function has completed its task. If an error occurs in the current middleware function,
 * `next` can be called with
 * @returns either a response with a 400 status code and an error message if the country is null or
 * invalid, or it is calling the next middleware function if the country is valid.
 */
export function validateCountry (req: express.Request, res: express.Response, next: express.NextFunction): any {
  const { country } = req.body

  if (country == null) {
    return res.status(400).json({ error: 'Country is required' })
  }

  if (!Object.values(Countries).includes(country)) {
    return res.status(400).json({ error: 'Invalid country' })
  }

  next()
}
