// import models
import CategoryModel from '../models/Category'
import CityModel from '../models/City'
import CountryModel from '../models/Country'
import PlaceModel from '../models/Place'
// import types
import { Country, Category, City, Place, GooglePlaceResult } from '../types'
// import the whole data
import categoriesData from '../services/JSONs/categories.json'
import countriesData from '../services/JSONs/countries.json'
import citiesData from '../services/JSONs/cities.json'

const API_KEY = process.env.API_KEY_GOOGLE_MAPS ?? 'default'

/**
 * This function creates categories by inserting data into a CategoryModel and returns the created
 * categories as a Promise.
 * @returns The function `createCategories` returns a Promise that resolves to an array of `Category`
 * objects.
 */
async function createCategories (): Promise<Category[]> {
  try {
    const categories = await CategoryModel.insertMany(categoriesData as Category[])
    console.log('Categories created successfully')

    return categories
  } catch (error) {
    console.error('Error creating categories:', error)
    throw error
  }
}

/**
 * This function creates countries by inserting data into a CountryModel and returns a Promise of an
 * array of Country objects.
 * @returns The function `createCountries` returns a Promise that resolves to an array of `Country`
 * objects.
 */
async function createCountries (): Promise<Country[]> {
  try {
    const countries = await CountryModel.insertMany(countriesData as Country[])
    console.log('Countries created successfully')

    return countries
  } catch (error) {
    console.error('Error creating countries:', error)
    throw error
  }
}

/**
 * This is an asynchronous function that creates cities by mapping through citiesData and finding the
 * corresponding country and categories, then inserting the cities into the CityModel and returning the
 * list of created cities.
 * @param {Category[]} categories - An array of Category objects.
 * @param {Country[]} countries - An array of objects representing countries, where each object has a
 * "name" property.
 * @returns a Promise that resolves to an array of City objects.
 */
async function createCities (categories: Category[], countries: Country[]): Promise<City[]> {
  try {
    const cities = citiesData.map((city: any) => {
      // loading the country
      const country = countries.find((country) => country.name === city.country)

      const tmp = {
        name: city.name,
        country: country?._id,
        coordinates: city.coordinates,
        categories: categories.map((category) => category._id)
      }

      return tmp
    })

    const citiesList = await CityModel.insertMany(cities)
    console.log('Cities created successfully')
    return citiesList
  } catch (error) {
    console.error('Error creating cities:', error)
    throw error
  }
}

/**
 * This function creates places based on categories and cities by making a request to the Google Maps
 * API and saving the results to a database.
 * @param {City[]} cities - The `cities` parameter is an array of `City` objects.
 */
async function createPlaces (cities: City[]): Promise<void> {
  try {
    for (const city of cities) {
      // Get Country
      const country: Country | null = await CountryModel.findById(city.country)
      if (country == null) { // Check country
        console.warn("Country doesn't exist")
        continue
      }

      for (const categoryId of city.categories) {
        // Get Category
        const category: Category | null = await CategoryModel.findById(categoryId)
        if (category == null) { // Check Category
          console.warn("Category doesn't exist")
          continue
        }

        const searchString: string = `Top 10 ${category.name} near ${city.name} ${country.name}`

        // Making the peticion to the maps API
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchString}&key=${API_KEY}`)
        console.log('Fetch completed')
        const data = await response.json()

        // Parsing the info
        const places: Place = data.results.slice(0, 10).map((result: GooglePlaceResult) => {
          const place = {
            category: category._id,
            city: city._id,
            country: city.country._id,
            name: result.name,
            coordinates: `${result.geometry.location.lat},${result.geometry.location.lng}`,
            rating: result.rating ?? 0,
            address: result.formatted_address ?? '',
            description: result.types?.join(', ') ?? '',
            image: result.photos?.[0].photo_reference ?? ''
          }

          return place
        })

        // Save the places to the database
        await PlaceModel.insertMany(places)
        console.log('Category and city places created')
      }
    }

    console.log('Places created successfully')
  } catch (error) {
    console.error('Error creating places:', error)
    throw error
  }
}

/**
 * This function creates data by creating categories, countries, cities, and places.
 */
export async function createData (): Promise<void> {
  try {
    // Create categories
    const categories = await createCategories()

    // Create countries
    const countries = await createCountries()

    // Create cities
    const cities = await createCities(categories, countries)

    // Create Places
    await createPlaces(cities)
  } catch (error) {
    console.error('Error creating data:', error)
  }
}
