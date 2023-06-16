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

/**
 * This function retrieves the ID of a city from a database by its name.
 * @param {string} cityName - The parameter `cityName` is a string that represents the name of a city.
 * It is used as a filter to search for a city in the database.
 * @returns a Promise that resolves to a string or null value. The string value is the ID of the city
 * found in the database, or null if the city is not found.
 */
export async function getCityByName (cityName: string): Promise<string | null> {
  try {
    // Checking database connection
    await checkDatabase()

    const country: string | null = await CityModel.findOne({ name: cityName }, '_id')
    return country
  } catch (error: any) {
    console.error(error.message)
    throw new Error('Failed to fetch country')
  }
}
