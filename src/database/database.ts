import mongoose from 'mongoose'
import { DatabaseError, CredentialsError } from '../utils/errors'

// Obtaining env variables for the connection
const USER = process.env.DATABASE_USER ?? 'default'
const PASSWORD = process.env.DATABASE_PASSWORD ?? 'default'

// String connection
const connectionString = `mongodb+srv://${USER}:${PASSWORD}@top10.6oki5fv.mongodb.net/top10?retryWrites=true&w=majority`

/**
 * This function connects to a MongoDB Atlas database using a provided connection string.
 */
export async function connectDatabase (): Promise<void> {
  mongoose.connect(connectionString)
    .then(() => {
      console.log('Connected to MongoDB Atlas')
    })
    .catch((error: Error) => {
      if (error.message.includes('authentication failed')) {
        throw new CredentialsError('Invalid database credentials')
      } else {
        throw new DatabaseError(`Failed to connect to MongoDB: ${error.message}`)
      }
    })
}

/**
 * This function checks if the database is connected and attempts to connect if it is not.
 */
export async function checkDatabase (): Promise<void> {
  try {
    const validStates = [1, 2]
    // Attempt to connect to the database
    if (!validStates.includes(mongoose.connection.readyState)) {
      await connectDatabase()
    }
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new DatabaseError(`There was an error calling the function to connect to the database: ${err}`)
  }
}
