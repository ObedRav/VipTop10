import express from 'express'
import * as countriesServices from '../services/countriesServices'

const router = express.Router()

router.get('/countries', (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  countriesServices.getCountries()
    .then((countries) => {
      res.json(countries)
    })
    .catch(next)
})

export default router
