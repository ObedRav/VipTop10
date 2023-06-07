import express from 'express'
import { Countries } from './types'

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
