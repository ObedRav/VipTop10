import { checkDatabase } from '../database/database'
import CountryModel from '../models/Country'
import { Country } from '../types'

/**
 * This function retrieves the ID of a country from a database based on its name.
 * @param {string} countryName - The `countryName` parameter is a string that represents the name of a
 * country. This function uses the `countryName` parameter to search for a country in the database and
 * return its ID.
 * @returns the `_id` of the country object that matches the given `countryName` parameter. If no
 * matching country is found, it will return `undefined`. The return value is wrapped in a Promise that
 * resolves to a string.
 */
export async function getCountryByName (countryName: string): Promise<string | null> {
  try {
    // Checking database connection
    await checkDatabase()

    const country: string | null = await CountryModel.findOne({ name: countryName }, '_id')
    return country
  } catch (error: any) {
    console.error(error.message)
    throw new Error('Failed to fetch country - countriesServices/getCountryByName')
  }
}

/**
 * This function fetches all countries from a database and returns their names as an array of Country
 * objects.
 * @returns The function `getCountries` returns a promise that resolves to an array of `Country`
 * objects. The `Country` objects contain a `name` property. If there is an error, the function throws
 * an error with the message "Failed to fetch countries".
 */
export async function getCountries (): Promise<Country[]> {
  try {
    // Checking database connection
    await checkDatabase()

    const countries: Country[] = await CountryModel.find({}, 'name')

    return countries
  } catch (error) {
    throw new Error('Failed to fetch countries')
  }
}
