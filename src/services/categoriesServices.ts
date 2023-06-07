import Category from '../models/Category'

export async function getCategories (): Promise<string[]> {
  const maxRetries = 3 // Maximum number of retry attempts
  let retryCount = 0

  const retryDelay = 5000 // Delay in milliseconds before retrying

  while (retryCount < maxRetries) {
    try {
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
