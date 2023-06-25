import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { IdError, NotFound } from '../utils/errors'

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
