import express from 'express'
import { StatusCodes } from 'http-status-codes'
// import errors
import { IdError, NotFound } from '../utils/errors'

/**
 * This function handles errors and returns appropriate responses based on the type of error
 * encountered.
 * @returns The function `errorHandler` returns a response object with an appropriate HTTP status code
 * and error message based on the type of error that was passed in as the first argument. If the error
 * is an instance of `IdError`, it returns a 400 Bad Request status code with the error message. If the
 * error is an instance of `NotFound`, it returns a 404 Not Found status code with the error message.
 */
export const errorHandler = (
  err: Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
): any => {
  console.error(err.message)

  if (err instanceof IdError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message })
  } else if (err instanceof NotFound) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: err.message })
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: 'An internal server error occurred. Please try again later.',
    message: err.message
  })
}
