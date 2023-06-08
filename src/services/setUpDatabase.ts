// import models
import CategoryModel from '../models/Category'
import CityModel from '../models/City'
import CountryModel from '../models/Country'
// import types
import { Country, Category, City } from '../types'
// import the whole data
import categoriesData from './JSONs/categories.json'
import countriesData from './JSONs/countries.json'
import citiesData from './JSONs/cities.json'

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
async function createCities (categories: Category[], countries: Country[]): Promise<void> {
  try {
    const cities = citiesData.map((city: any) => {
      // loading the country
      const country = countries.find((country) => country.name === city.country)

      const tmp: City = {
        name: city.name,
        country: country?._id,
        coordinates: city.coordinates,
        categories: categories.map((category) => category._id)
      }

      return tmp
    })

    await CityModel.insertMany(cities)
    console.log('Cities created successfully')
  } catch (error) {
    console.error('Error creating cities:', error)
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
    await createCities(categories, countries)
  } catch (error) {
    console.error('Error creating data:', error)
  }
}
