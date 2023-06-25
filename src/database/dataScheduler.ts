import cron from 'node-cron'
import PlaceModel from '../models/Place'
import CategoryModel from '../models/Category'
import CountryModel from '../models/Country'
import CityModel from '../models/City'
// Import the createData function
import { createData } from './setUpDatabase'
import { checkDatabase } from './database'

/**
 * This function clears multiple collections in a database and logs the success of each operation.
 */
async function clearDatabase (): Promise<void> {
  try {
    // Clear the categories collection
    await CategoryModel.deleteMany({})
    console.log('Categories collection cleared successfully')

    // Clear the countries collection
    await CountryModel.deleteMany({})
    console.log('Countries collection cleared successfully')

    // Clear the cities collection
    await CityModel.deleteMany({})
    console.log('Cities collection cleared successfully')

    // Clear the places collection
    await PlaceModel.deleteMany({})
    console.log('Places collection cleared successfully')
  } catch (error) {
    console.error('Error clearing database:', error)
    throw error
  }
}

/**
 * This function schedules a job to run every month on the 1st at midnight, which checks the database
 * connection, clears the database, creates new data, and logs a success message or an error message.
 */
export async function scheduleDataCreation (): Promise<void> {
  // Schedule the job to run every month on the 1st at 00:00 (midnight)
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  cron.schedule('0 0 1 * *', async () => {
    try {
      // Check database connection
      await checkDatabase()

      // Clear the database
      await clearDatabase()

      // Create new data
      await createData()

      console.log('Data creation scheduled successfully')
    } catch (error) {
      console.error('Error scheduling data creation:', error)
    }
  })
}
