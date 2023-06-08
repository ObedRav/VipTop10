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
export async function connectDatabase (): Promise<void> {
  mongoose.connect(connectionString)
    .then(() => {
      console.log('Connected to MongoDB Atlas')
    })
    .catch((error: Error) => {
      console.error(`Failed to connect to MongoDB ${error.message}`)
    })
}

export async function checkDatabase (): Promise<void> {
  try {
    const validStates = [1, 2]
    // Attempt to connect to the database
    if (!validStates.includes(mongoose.connection.readyState)) {
      await connectDatabase()
    }
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.error(`There was an error calling the function to connect to the database: ${err}`)
  }
}
