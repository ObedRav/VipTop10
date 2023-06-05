import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()

app.use(express.json())

dotenv.config()

const PORT = process.env.PORT ?? 3500
const USER = process.env.DATABASE_USER ?? 'default'
const PASSWORD = process.env.DATABASE_PASSWORD ?? 'default'

const connectionString = `mongodb+srv://${USER}:${PASSWORD}@top10.6oki5fv.mongodb.net/?retryWrites=true&w=majority`

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
