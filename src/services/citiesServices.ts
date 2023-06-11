import * as countriesService from './countriesServices'
import { checkDatabase } from '../database'
import City from '../models/City'

/**
 * This function retrieves the names of cities in a given country from a database.
 * @param {string} country - The `country` parameter is a string that represents the name of a country.
 * The function uses this parameter to retrieve the ID of the country from the database and then
 * fetches all the cities that belong to that country. Finally, it returns an array of city names.
 * @returns The function `getCitiesByCountry` returns a Promise that resolves to an array of strings
 * representing the names of cities in the specified country. If there is an error, it throws an error
 * message.
 */
export async function getCitiesByCountry (country: string): Promise<string[]> {
  try {
    // Checking database connection
    await checkDatabase()

    const countryId = await countriesService.getCountryByName(country)
    const cities = await City.find({ country: countryId }, 'name country')

    return cities.map((city) => city.name)
  } catch (err: any) {
    console.error(err.message)
    throw new Error('Failed to fetch cities - citiesServices/getCitiesByCountry')
  }
}
