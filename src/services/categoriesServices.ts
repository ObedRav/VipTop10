import mongoose from 'mongoose'
import Category from '../models/Category'
import { connectDatabase } from '../database'

export async function getCategories (): Promise<string[]> {
  const maxRetries = 3 // Maximum number of retry attempts
  let retryCount = 0

  const retryDelay = 5000 // Delay in milliseconds before retrying

  while (retryCount < maxRetries) {
    try {
      // Check if the database connection is established
      if (mongoose.connection.readyState !== 1) {
        // Attempt to reconnect to the database
        connectDatabase()
          .then(() => console.log('Database connected from Categories'))
          .catch((err: Error) => console.error(`There was an error calling the function to connect to database: ${err.message}`))
      }

      const categories = await Category.find({}, 'name')
      const categoryNames = categories.map((category) => category.name)

      return categoryNames
    } catch (error) {
      if (retryCount === maxRetries - 1) {
        throw new Error('Failed to fetch categories from the database')
      }

      console.error('Connection error occurred. Retrying in 5 seconds...')
      await new Promise((resolve) => setTimeout(resolve, retryDelay))
      retryCount++
    }
  }

  throw new Error('Failed to fetch categories from the database')
}
