import * as countriesService from './countriesServices'
import { checkDatabase } from '../database'
import CityModel from '../models/City'
import { City } from '../types'

/**
 * This function retrieves cities by country from a database and returns them as a Promise.
 * @param {string} country - The `country` parameter is a string that represents the name of a country.
 * The function uses this parameter to retrieve the ID of the country from the database and then
 * fetches all the cities that belong to that country.
 * @returns The function `getCitiesByCountry` returns a Promise that resolves to an array of `City`
 * objects. The `City` objects only have the `name` property, and they belong to the country specified
 * by the `country` parameter. If there is an error, the function throws an error with a message
 * "Failed to fetch cities - citiesServices/getCitiesByCountry".
 */
export async function getCitiesByCountry (country: string): Promise<City[]> {
  try {
    // Checking database connection
    await checkDatabase()

    const countryId = await countriesService.getCountryByName(country)
    const cities = await CityModel.find({ country: countryId }, 'name')

    return cities
  } catch (err: any) {
    console.error(err.message)
    throw new Error('Failed to fetch cities - citiesServices/getCitiesByCountry')
  }
}
