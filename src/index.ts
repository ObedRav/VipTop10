import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import placesRouters from './routes/placesRouters'
import countriesRouters from './routes/countriesRouters'
import citiesRouters from './routes/citiesRouters'
import categoriesRouters from './routes/categoriesRouters'
import cors from 'cors'
import helmet from 'helmet'

const app = express()

app.use(express.json())

// Load the env variables
dotenv.config()

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

app.use('/api', [placesRouters, countriesRouters, citiesRouters, categoriesRouters])

// Obtaining env variables for the connection
const PORT = process.env.PORT ?? 3500
const USER = process.env.DATABASE_USER ?? 'default'
const PASSWORD = process.env.DATABASE_PASSWORD ?? 'default'

// String connection
const connectionString = `mongodb+srv://${USER}:${PASSWORD}@top10.6oki5fv.mongodb.net/?retryWrites=true&w=majority`

// Connect to the database
mongoose.connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB Atlas')
  })
  .catch((error: Error) => {
    console.log(`Failed to connect to MongoDB ${error.message}`)
  })

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
