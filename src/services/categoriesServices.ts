import CategoryModel from '../models/Category'
import { checkDatabase } from '../database/database'
import { Category } from '../types'
import { DatabaseError } from '../utils/errors'

/**
 * Retrieves all categories from a database and returns them as an array of Category objects.
 * @returns An array of Category objects. Each Category object has a "name" property.
 * @throws Throws an error with the message "Failed to fetch categories" if an error occurs during
 * the database query.
 */
export async function getCategories (): Promise<Category[]> {
  try {
    // Checking database connection
    await checkDatabase()

    const categories: Category[] = await CategoryModel.find({}, 'name')

    return categories
  } catch (error) {
    throw new DatabaseError('Failed to fetch categories')
  }
}

/**
 * Retrieves the top 3 recommended categories from a database.
 * @returns An array of up to three recommended categories. Each category object in the array has a
 * "name" property.
 * @throws Throws an error with the message "Error retrieving recommended categories" if an error
 * occurs during the database query.
 */
export async function getRecommsCategories (): Promise<Category[]> {
  try {
    // Checking database connection
    await checkDatabase()

    const categories: Category[] = await CategoryModel.find({}, 'name').sort({ requests: -1 }).limit(3)

    return categories
  } catch (error) {
    throw new DatabaseError('Error retrieving recommended categories')
  }
}

/**
 * Retrieves the ID of a category from the database based on its name.
 * @param categoryName - The name of the category to fetch from the database.
 * @returns A Promise that resolves to a string or null. The string value is the ID of the category that
 * matches the provided category name, or null if no matching category is found.
 * @throws Throws an error with the message "The category doesn't exist" if an error occurs during
 * the database query or if the category is not found.
 */
export async function getCategoryByName (categoryName: string): Promise<string | null> {
  try {
    // Checking database connection
    await checkDatabase()

    const country: string | null = await CategoryModel.findOne({ name: categoryName }, '_id')
    return country
  } catch (error: any) {
    console.error(error.message)
    throw new DatabaseError('The category doesnt exists')
  }
}
