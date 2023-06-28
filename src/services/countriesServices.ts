import { checkDatabase } from '../database/database'
import CountryModel from '../models/Country'
import { Country } from '../types'
import { DatabaseError } from '../utils/errors'

/**
 * Retrieves the ID of a country from a database based on its name.
 * @param countryName - The name of the country to fetch from the database.
 * @returns A Promise that resolves to a string or null. The string value is the `_id` of the country
 * object that matches the given `countryName` parameter. If no matching country is found, it will
 * return `undefined`.
 * @throws Throws an error with the message "Failed to fetch country - countriesServices/getCountryByName"
 * if an error occurs during the database query.
 */
export async function getCountryByName (countryName: string): Promise<string | null> {
  try {
    // Checking database connection
    await checkDatabase()

    const country: string | null = await CountryModel.findOne({ name: countryName }, '_id')
    return country
  } catch (error: any) {
    console.error(error.message)
    throw new DatabaseError('Failed to fetch country - countriesServices/getCountryByName')
  }
}

/**
 * Fetches all countries from a database and returns their names as an array of Country objects.
 * @returns A Promise that resolves to an array of Country objects. Each Country object has a "name"
 * property. If there is an error, the function throws an error with the message "Failed to fetch countries".
 * @throws Throws an error with the message "Failed to fetch countries" if an error occurs during the
 * database query.
 */
export async function getCountries (): Promise<Country[]> {
  try {
    // Checking database connection
    await checkDatabase()

    const countries: Country[] = await CountryModel.find({}, 'name')

    return countries
  } catch (error) {
    throw new DatabaseError('Failed to fetch countries')
  }
}
