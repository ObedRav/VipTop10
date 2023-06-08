// import models
import CategoryModel from '../models/Category'
import CityModel from '../models/City'
import CountryModel from '../models/Country'
import PlaceModel from '../models/Place'
// import types
import { Country, Category, City, Place, GooglePlaceResult } from '../types'
// import the whole data
import categoriesData from './JSONs/categories.json'
import countriesData from './JSONs/countries.json'
import citiesData from './JSONs/citiesTest.json'

const API_KEY = process.env.API_KEY_GOOGLE_MAPS ?? 'default'

// Create Categories
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

// Create Countries
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

// Create the cities
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

async function createPlaces (cities: City[]): Promise<void> {
  try {
    for (const city of cities) {
      const country: Country | null = await CountryModel.findById(city.country)
      if (country == null) {
        console.warn("Country doesn't exist")
        continue
      }
      for (const categoryId of city.categories) {
        const category: Category | null = await CategoryModel.findById(categoryId)
        if (category == null) {
          console.warn("Category doesn't exist")
          continue
        }

        const searchString: string = `Top 10 ${category.name} near ${city.name} ${country.name}`

        const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchString}&key=${API_KEY}`)
        const data = await response.json()

        const places: Place = data.results.slice(0, 10).map((result: GooglePlaceResult) => {
          const place = {
            category: category._id,
            city: city._id,
            country: city.country._id,
            name: result.name,
            coordinates: `${result.geometry.location.lat},${result.geometry.location.lng}`,
            rating: result.rating ?? 0,
            address: result.formatted_address ?? '',
            openHours: result.opening_hours?.weekday_text ?? [],
            contact: result.formatted_phone_number ?? '',
            description: result.types?.join(', ') ?? '',
            image: result.photos?.[0].photo_reference ?? ''
          }

          return place
        })

        // Save the places to the database
        await PlaceModel.insertMany(places)
      }
    }

    console.log('Places created successfully')
  } catch (error) {
    console.error('Error creating places:', error)
    throw error
  }
}

// function to create data
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
