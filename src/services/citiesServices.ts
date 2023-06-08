import * as countriesService from './countriesServices'
import { checkDatabase } from '../database'
import City from '../models/City'

export async function getCitiesByCountry (country: string): Promise<any> {
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
