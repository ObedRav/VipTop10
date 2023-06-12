import CategoryModel from '../models/Category'
import { checkDatabase } from '../database'
import { Category } from '../types'

/**
 * This function retrieves all categories from a database and returns them as an array of Category
 * objects.
 * @returns This function is returning an array of Category objects. The Category objects have a "name"
 * property, which is the only property being selected from the database. The function is also wrapped
 * in a try-catch block to handle any errors that may occur during the database query. If an error
 * occurs, the function will throw an error with the message "Failed to fetch categories".
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
 * This function retrieves the top 3 recommended categories from a database.
 * @returns an array of up to three recommended categories. Each category object in the array has a
 * "name" property.
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
