import PlaceModel from '../models/Place'
import CategoryModel from '../models/Category'
import CountryModel from '../models/Country'
import CityModel from '../models/City'
import { checkDatabase } from '../database'
import { Category, Country, City, Place } from '../types'

/**
 * This function retrieves recommended places from a database and transforms the data before returning
 * it.
 * @returns an array of recommended places. Each place object in the array contains information such as
 * the category, city, country, name, coordinates, rating, address, description, image, and number of
 * requests.
 */
export async function getRecommsPlaces (): Promise<any> {
  try {
    // Checking database connection
    await checkDatabase()

    const places = await PlaceModel.find().sort({ requests: -1 }).limit(6)
    const transformedPlaces = await transformPlaces(places)

    return transformedPlaces
  } catch (error) {
    throw new Error('Error retrieving recommended places')
  }
}

/**
 * This function retrieves a place by its ID from a database, increments its request count, transforms
 * it, and returns it.
 * @param {string} ID - The ID parameter is a string that represents the unique identifier of a place
 * in the database.
 * @returns a Promise that resolves to an object representing a place, with its properties transformed,
 * if the place is found in the database and updated successfully. If the place is not found, an error
 * is thrown. If there is an error retrieving the place, an error is thrown as well.
 */
export async function getPlaceById (ID: string): Promise<any> {
  try {
    // Checking database connection
    await checkDatabase()

    const place: Place | null = await PlaceModel.findById(ID)

    if (place != null) {
      place.requests += 1
      await place.save()

      const transformedPlace = await transformPlaces(place)
      return transformedPlace
    } else {
      throw new Error('Place not found')
    }
  } catch (error) {
    console.error(error)
    throw new Error('Error retrieving place by ID')
  }
}

/**
 * This is an asynchronous function that transforms an array of places by retrieving additional
 * information about each place's country, category, and city.
 * @param {any} places - an array or object containing information about places, including their IDs,
 * categories, cities, countries, names, coordinates, ratings, addresses, descriptions, images, and
 * requests.
 * @returns The `transformPlaces` function returns a Promise that resolves to an array of transformed
 * places if the input `places` is an array, or a single transformed place object if the input `places`
 * is not an array. The transformed place object(s) contain information about the place's category,
 * city, country, name, coordinates, rating, address, description, image, and requests.
 */
async function transformPlaces (places: any): Promise<any> {
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
