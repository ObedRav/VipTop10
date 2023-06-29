import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { NoApiKeyError } from '../utils/errors'

const validApiKeys = process.env.API_KEYS_AUTHORIZED?.split(',') as string[]
if (validApiKeys === undefined) {
  throw new NoApiKeyError('No API key provided')
}

/**
 * This function validates an API key in a request header and returns an error if it is not valid.
 * @param req - The request object containing the headers.
 * @param res - The response object used to send the error response.
 * @param next - The next function to call if the API key is valid.
 * @returns If the `apiKey` is null or not included in the `validApiKeys` array, a JSON response with
 * an error message and a status code of 401 (Unauthorized) is returned. Otherwise, the `next()`
 * function is called to move on to the next middleware function.
 */
export function validateApiKey (req: express.Request, res: express.Response, next: express.NextFunction): any {
  const apiKey = req.headers.authorization ?? ''

  if (!validApiKeys.includes(apiKey)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' })
  }

  next()
}
