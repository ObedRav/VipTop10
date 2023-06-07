import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Load the env variables
dotenv.config()

// Obtaining env variables for the connection
const USER = process.env.DATABASE_USER ?? 'default'
const PASSWORD = process.env.DATABASE_PASSWORD ?? 'default'

// String connection
const connectionString = `mongodb+srv://${USER}:${PASSWORD}@top10.6oki5fv.mongodb.net/?retryWrites=true&w=majority`

// Connect to the database
export async function connectDatabase (): Promise<any> {
  mongoose.connect(connectionString)
    .then(() => {
      console.log('Connected to MongoDB Atlas')
      return true
    })
    .catch((error: Error) => {
      console.error(`Failed to connect to MongoDB ${error.message}`)
      return false
    })
}
