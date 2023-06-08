import Category from '../models/Category'
import { connectToDatabaseWithRetry } from '../database'

export async function getCategories (): Promise<string[]> {
  try {
    // Checking database connection
    await connectToDatabaseWithRetry(2)

    const categories = await Category.find({}, 'name')
    const categoryNames = categories.map((category) => category.name)

    return categoryNames
  } catch (error) {
    throw new Error('Failed to fetch categories')
  }
}
