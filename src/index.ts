// modules
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import helmetCsp from 'helmet-csp'
import https from 'https'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
// import routers
import placesRouters from './routes/placesRouters'
import countriesRouters from './routes/countriesRouters'
import citiesRouters from './routes/citiesRouters'
import categoriesRouters from './routes/categoriesRouters'
// databaseConnection
import { connectDatabase } from './database/database'
// schedule data creation
// import { scheduleDataCreation } from './database/dataScheduler'
// validation api key
import { validateApiKey } from './middleware/apiKey'
import { errorHandler } from './utils/errorHandler'

// Load the env variables
dotenv.config()

// Obtaining env variables
const PORT = process.env.PORT ?? 5000

// Creating app
const app = express()

// Middleware json
app.use(express.json())

// Config CORS
const corsOptions = {
  origin: '*', // Set the allowed origin(s)
  methods: ['GET', 'POST'], // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
  credentials: true // Enable sending cookies from the client
}

// Using cors
app.use(cors(corsOptions))

// Add Security for common vulnerabilities
app.use(helmet())

// Configure CSP
app.use(
  helmetCsp({
    directives: {
      defaultSrc: ["'none'"],
      frameAncestors: ["'none'"],
      formAction: ["'none'"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  })
)

// Apply cache-control middleware
app.use((_req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  next()
})

// Adding secure protocol
const serverOptions = {
  key: fs.readFileSync(path.join(__dirname, '../SSL_Certificates/server.key')),
  cert: fs.readFileSync(path.join(__dirname, '../SSL_Certificates/server.cert'))
}

// creating the secure protocolo server
const server = https.createServer(serverOptions, app)

// Connection to database
connectDatabase()
  .then(() => console.log('Database connected from Index'))
  .catch((err: Error) => console.error(`There was an error calling the function to connect to database: ${err.message}`))

/* Call the function to schedule data creation
scheduleDataCreation()
  .then(() => console.log('The scheduleDataCreation was called'))
  .catch(() => console.log('Data creation failed')) */

// Apply API Key middleware to the entire API
app.use(validateApiKey)

// consuming the routers
app.use('/api', [placesRouters, countriesRouters, citiesRouters, categoriesRouters])

// implementing the errors
app.use(errorHandler)

// https server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
