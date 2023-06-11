import CategoryModel from '../models/Category'
import { checkDatabase } from '../database'

/**
 * This function retrieves category names from a database and returns them as an array of strings.
 * @returns an array of strings, which are the names of the categories fetched from the database.
 */
export async function getCategories (): Promise<string[]> {
  try {
    // Checking database connection
    await checkDatabase()

    const categories = await CategoryModel.find({}, 'name')
    const categoryNames = categories.map((category) => category.name)

    return categoryNames
  } catch (error) {
    throw new Error('Failed to fetch categories')
  }
}

/**
 * This function retrieves the names of the top 3 recommended categories from a database.
 * @returns an array of strings representing the names of the top 3 categories based on the number of
 * requests in the database.
 */
export async function getRecommsCategories (): Promise<string[]> {
  try {
    // Checking database connection
    await checkDatabase()

    const categories = await CategoryModel.find().sort({ requests: -1 }).limit(3)
    const categoryNames = categories.map((category) => category.name)

    return categoryNames
  } catch (error) {
    throw new Error('Error retrieving recommended categories')
  }
}
