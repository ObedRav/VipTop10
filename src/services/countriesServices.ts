import { checkDatabase } from '../database'
import Country from '../models/Country'

export async function getCountryByName (countryName: string): Promise<any> {
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
