import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
// import routers
import placesRouters from './routes/placesRouters'
import countriesRouters from './routes/countriesRouters'
import citiesRouters from './routes/citiesRouters'
import categoriesRouters from './routes/categoriesRouters'
// databaseConnection
import { connectDatabase } from './database'

const app = express()

app.use(express.json())

// Config CORS
const corsOptions = {
  origin: '*', // Set the allowed origin(s)
  methods: ['GET', 'POST'], // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
  credentials: true // Enable sending cookies from the client
}

app.use(cors(corsOptions))

// Add Security for common vulnerabilities
app.use(helmet())

// Obtaining env variables
const PORT = process.env.PORT ?? 3500

// Connection to database
connectDatabase()
  .then(() => console.log('Database connected from Index'))
  .catch((err: Error) => console.error(`There was an error calling the function to connect to database: ${err.message}`))

// consuming the routers
app.use('/api', [placesRouters, countriesRouters, citiesRouters, categoriesRouters])

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
