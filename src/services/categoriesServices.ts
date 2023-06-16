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

/**
 * This function retrieves the ID of a category from the database based on its name.
 * @param {string} categoryName - The parameter `categoryName` is a string that represents the name of
 * the category that we want to fetch from the database.
 * @returns a Promise that resolves to a string or null value. The string value is the ID of the
 * category that matches the provided category name, or null if no matching category is found.
 */
export async function getCategoryByName (categoryName: string): Promise<string | null> {
  try {
    // Checking database connection
    await checkDatabase()

    const country: string | null = await CategoryModel.findOne({ name: categoryName }, '_id')
    return country
  } catch (error: any) {
    console.error(error.message)
    throw new Error('Failed to fetch country')
  }
}
