import express from 'express'
import { StatusCodes } from 'http-status-codes'

const validApiKeys = process.env.API_KEYS_AUTHORIZED?.split(',') ?? []

/**
 * This function validates an API key in a request header and returns an error if it is not valid.
 * @returns If the `apiKey` is null or not included in the `validApiKeys` array, a JSON response with
 * an error message and a status code of 401 (Unauthorized) is returned. Otherwise, the `next()`
 * function is called to move on to the next middleware function.
 */
export function validateApiKey (req: express.Request, res: express.Response, next: express.NextFunction): any {
  const apiKey = req.headers.authorization ?? ''

  if (apiKey === null || !validApiKeys.includes(apiKey)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' })
  }

  next()
}
