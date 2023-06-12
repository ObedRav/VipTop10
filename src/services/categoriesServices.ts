import CategoryModel from '../models/Category'
import { checkDatabase } from '../database'
import { Category } from '../types'

/**
 * This function retrieves category names from a database and returns them as an array of strings.
 * @returns an array of strings, which are the names of the categories fetched from the database.
 */
export async function getCategories (): Promise<Category[]> {
  try {
    // Checking database connection
    await checkDatabase()

    const categories: Category[] = await CategoryModel.find({}, 'name')

    return categories
  } catch (error) {
    throw new Error('Failed to fetch categories')
  }
}

/**
 * This function retrieves the names of the top 3 recommended categories from a database.
 * @returns an array of strings representing the names of the top 3 categories based on the number of
 * requests in the database.
 */
export async function getRecommsCategories (): Promise<Category[]> {
  try {
    // Checking database connection
    await checkDatabase()

    const categories: Category[] = await CategoryModel.find({}, 'name').sort({ requests: -1 }).limit(3)

    return categories
  } catch (error) {
    throw new Error('Error retrieving recommended categories')
  }
}
