import * as countriesService from './countriesServices'
import { checkDatabase } from '../database/database'
import CityModel from '../models/City'
import { City } from '../types'
import { DatabaseError } from '../utils/errors'
/**
 * Retrieves cities by country from a database and returns them as a Promise.
 * @param country - The name of the country for which to retrieve the cities.
 * @returns A Promise that resolves to an array of City objects. Each City object has a "name"
 * property and belongs to the specified country. If there is an error, the function throws an error
 * with the message "Failed to fetch cities - citiesServices/getCitiesByCountry".
 * @throws Throws an error with the message "Failed to fetch cities - citiesServices/getCitiesByCountry"
 * if an error occurs during the database query.
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
    throw new DatabaseError('Failed to fetch cities - citiesServices/getCitiesByCountry')
  }
}

/**
 * Retrieves the ID of a city from a database by its name.
 * @param cityName - The name of the city to fetch from the database.
 * @returns A Promise that resolves to a string or null. The string value is the ID of the city found
 * in the database, or null if the city is not found.
 * @throws Throws an error with the message "The city doesn't exist" if an error occurs during the
 * database query or if the city is not found.
 */
export async function getCityByName (cityName: string): Promise<string | null> {
  try {
    // Checking database connection
    await checkDatabase()

    const country: string | null = await CityModel.findOne({ name: cityName }, '_id')
    return country
  } catch (error: any) {
    console.error(error.message)
    throw new DatabaseError('The city doesnt exists')
  }
}
