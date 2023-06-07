import City from '../models/City'
import * as countriesService from './countriesServices'

export async function getCitiesByCountry (country: string): Promise<any> {
  try {
    const countryId = await countriesService.getCountryByName(country)
    const cities = await City.find({ country: countryId }, 'name country')

    return cities.map((city) => city.name)
  } catch (err: any) {
    console.log(err.message)
    throw new Error('Failed to fetch cities - citiesServices/getCitiesByCountry')
  }
}
