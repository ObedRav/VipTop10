import express from 'express'
import { StatusCodes } from 'http-status-codes'
// import errors
import { DatabaseError, IdError, NotFound } from '../utils/errors'

/**
 * Handles errors and returns appropriate responses based on the type of error encountered.
 * @param err - The error object.
 * @param _req - The Express request object (not used in this function).
 * @param res - The Express response object.
 * @param _next - The Express next function (not used in this function).
 * @returns The response object with an appropriate HTTP status code and error message based on the type
 * of error that was passed in as the first argument. If the error is an instance of `IdError`, it returns
 * a 400 Bad Request status code with the error message. If the error is an instance of `NotFound`, it
 * returns a 404 Not Found status code with the error message. If the error is an instance of `DatabaseError`,
 * it returns a 503 Service Unavailable status code with the error message. For any other type of error,
 * it returns a 500 Internal Server Error status code with a generic error message and the original error message.
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
  }
  if (err instanceof NotFound) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: err.message })
  } else if (err instanceof DatabaseError) {
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ error: err.message })
  }
  if (err instanceof DatabaseError) {
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ error: err.message })
  }
  if (err instanceof DatabaseError) {
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ error: err.message })
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: 'An internal server error occurred. Please try again later.',
    message: err.message
  })
}
