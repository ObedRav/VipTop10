import CategoryModel from '../models/Category'
import { checkDatabase } from '../database'

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
