import { isValidObjectId } from 'mongoose'
// import models
import PlaceModel from '../models/Place'
import CategoryModel from '../models/Category'
import CountryModel from '../models/Country'
import CityModel from '../models/City'
// import services
import * as categoriesServices from './categoriesServices'
import * as citiesServices from './citiesServices'
import { checkDatabase } from '../database/database'
import { Category, Country, City, Place } from '../types'
import { DatabaseError, IdError, NotFound } from '../utils/errors'

/**
 * Retrieves recommended places from a database and returns them as a transformed array.
 * @returns A Promise that resolves to an array of Place objects representing the recommended places.
 * @throws Throws an error with the message "Error retrieving recommended places" if there is an error
 * retrieving the places from the database.
 */
export async function getRecommsPlaces (): Promise<Place[]> {
  try {
    // Checking database connection
    await checkDatabase()

    const places = await PlaceModel.find().sort({ requests: -1 }).limit(6)
    const transformedPlaces = await transformPlaces(places)

    return transformedPlaces
  } catch (error) {
    throw new DatabaseError('Error retrieving recommended places')
  }
}

/**
 * Retrieves a place by its ID from a database, increments its request count, transforms it, and returns it.
 * @param ID - The ID of the place to retrieve.
 * @returns A Promise that resolves to an object representing a place with its properties transformed if
 * the place is found in the database and updated successfully.
 * @throws Throws an IdError with the message "Invalid ID" if the provided ID is not a valid ObjectId.
 * Throws a NotFound error with the message "Place not found" if the place is not found in the database.
 * Throws an error with the message "Error retrieving place by ID" if there is an error retrieving the place.
 */
export async function getPlaceById (ID: string): Promise<Place> {
  try {
    // Checking database connection
    await checkDatabase()

    // Check if is a valid ID
    if (!isValidObjectId(ID)) {
      throw new IdError('Invalid ID')
    }

    const place: Place | null = await PlaceModel.findById(ID)

    if (place != null) {
      place.requests += 1
      await place.save()

      const transformedPlace = await transformPlaces(place)

      return transformedPlace
    } else {
      throw new NotFound('Place not found')
    }
  } catch (error) {
    if (error instanceof IdError || error instanceof NotFound) {
      throw error
    } else {
      throw new DatabaseError('Error retrieving place by ID')
    }
  }
}

/**
 * Retrieves places from a database based on a given category ID and returns them in a sorted and transformed format.
 * @param categoryId - The ID of the category for which the places are being retrieved.
 * @returns A Promise that resolves to an array of Place objects representing the places that belong to the
 * specified category.
 * @throws Throws an IdError with the message "Invalid ID" if the provided category ID is not a valid ObjectId.
 * Throws a NotFound error with the message "Category not found" if the category is not found in the database.
 * Throws an error with the message "Error retrieving places by category" if there is an error retrieving the places.
 */
export async function getPlacesByCategory (categoryId: string): Promise<Place[]> {
  try {
    // Checking database connection
    await checkDatabase()

    // Check if is a valid ID
    if (!isValidObjectId(categoryId)) {
      throw new IdError('Invalid ID')
    }

    // Check if the categoryId exists in the database
    const categoryExists = await CategoryModel.exists({ _id: categoryId })
    if (categoryExists === null) {
      throw new NotFound('Category not found')
    }

    const places: Place[] = await PlaceModel.find({ category: categoryId }).sort({ requests: -1 }).limit(30)

    const transformedPlaces = await transformPlaces(places)

    return transformedPlaces
  } catch (error) {
    if (error instanceof IdError || error instanceof NotFound) {
      throw error
    } else {
      throw new DatabaseError('Error retrieving places by category')
    }
  }
}

/**
 * Retrieves places by city and category, increments their request count, and returns the transformed places.
 * @param cityName - The name of the city.
 * @param categoryName - The name of the category.
 * @returns A Promise that resolves to an array of transformed Place objects that match the given city name and category name.
 * @throws Throws an error with the message "Error retrieving places by city and category" if there is an error retrieving the places.
 */
export async function getPlacesByCityAndCategory (cityName: string, categoryName: string): Promise<Place[]> {
  try {
    // Checking database connection
    await checkDatabase()

    const cityId = await citiesServices.getCityByName(cityName)
    const categoryId = await categoriesServices.getCategoryByName(categoryName)

    const places: Place[] = await PlaceModel.find({ city: cityId, category: categoryId })

    const transformedPlaces = await transformPlaces(places)

    // Increment the request count for places and categories
    for (const place of places) {
      place.requests += 1
      await place.save()
    }

    const category: Category | null = await CategoryModel.findById(categoryId)
    if (category != null) {
      category.requests += 1
      await category.save()
    }

    return transformedPlaces
  } catch (error) {
    console.error(error)
    throw new DatabaseError('Error retrieving places by city and category')
  }
}

/**
 * Transforms a Place or an array of Places by populating their country, category, and city fields with their respective names.
 * @param places - The places to transform.
 * @returns A Promise that resolves to an array of transformed Place objects if the input is an array of Place objects,
 * or a single transformed Place object if the input is a single Place object.
 */
async function transformPlaces (places: Place | Place[]): Promise<any> {
  const isArray = Array.isArray(places)
  const placesArray = isArray ? places : [places]

  const placesWithoutIds = placesArray.map(async (placeId) => {
    const country: Country | null = await CountryModel.findById(placeId.country)
    const category: Category | null = await CategoryModel.findById(placeId.category)
    const city: City | null = await CityModel.findById(placeId.city)

    const place = {
      id: placeId._id,
      category: category?.name ?? '',
      city: city?.name ?? '',
      country: country?.name ?? '',
      name: placeId.name,
      coordinates: placeId.coordinates,
      rating: placeId.rating,
      address: placeId.address,
      description: placeId.description,
      image: placeId.image,
      requests: placeId.requests
    }

    return place
  })

  // Execute the asynchronous operations and wait for all promises to resolve
  const transformedPlaces = await Promise.all(placesWithoutIds)

  return isArray ? transformedPlaces : transformedPlaces[0]
}
