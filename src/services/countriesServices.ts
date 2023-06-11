import { checkDatabase } from '../database'
import Country from '../models/Country'

/**
 * This function retrieves the ID of a country from a database based on its name.
 * @param {string} countryName - The `countryName` parameter is a string that represents the name of a
 * country. This function uses the `countryName` parameter to search for a country in the database and
 * return its ID.
 * @returns the `_id` of the country object that matches the given `countryName` parameter. If no
 * matching country is found, it will return `undefined`. The return value is wrapped in a Promise that
 * resolves to a string.
 */
export async function getCountryByName (countryName: string): Promise<string> {
  try {
    // Checking database connection
    await checkDatabase()

    const country = await Country.findOne({ name: countryName })
    return country?._id
  } catch (error: any) {
    console.error(error.message)
    throw new Error('Failed to fetch country - countriesServices/getCountryByName')
  }
}

/**
 * This function fetches the names of all countries from a database.
 * @returns The function `getCountries` returns a Promise that resolves to an array of strings
 * representing the names of all countries in the database. If there is an error while fetching the
 * countries, the function throws an error with the message "Failed to fetch countries".
 */
export async function getCountries (): Promise<string[]> {
  try {
    // Checking database connection
    await checkDatabase()

    const countries = await Country.find({}, 'name')
    const contriesNames = countries.map((country) => country.name)

    return contriesNames
  } catch (error) {
    throw new Error('Failed to fetch countries')
  }
}
