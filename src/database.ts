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

async function connectToDatabaseWithRetry (retryCount: number): Promise<void> {
  try {
    // Attempt to connect to the database
    await connectDatabase()
    console.log('Database connected from Categories')
  } catch (error) {
    console.error(`There was an error calling the function to connect to the database: ${error.message}`)
    if (retryCount > 0) {
      // Retry after a certain delay (e.g., 10 seconds)
      console.log('Retrying connection in 10 seconds...')
      await delay(10000) // Delay function to wait for 10 seconds
      await connectToDatabaseWithRetry(retryCount - 1) // Recursive call with decreased retry count
    } else {
      console.error('Failed to connect to the database after retries.')
      // Handle the failed connection attempt
      // You can throw an error or handle it in any other way that suits your application's needs
    }
  }
}
