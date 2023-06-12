import PlaceModel from '../models/Place'
import CategoryModel from '../models/Category'
import CountryModel from '../models/Country'
import CityModel from '../models/City'
import { checkDatabase } from '../database'
import { Category, Country, City, Place } from '../types'

/**
 * This function retrieves recommended places from a database and returns them as a transformed array.
 * @returns a Promise that resolves to an array of Place objects.
 */
export async function getRecommsPlaces (): Promise<Place[]> {
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
export async function getPlaceById (ID: string): Promise<Place> {
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
 * This function retrieves places from a database based on a given category ID and returns them in a
 * sorted and transformed format.
 * @param {string} categoryId - string parameter representing the ID of the category for which the
 * places are being retrieved.
 * @returns a Promise that resolves to an array of Place objects that belong to the category specified
 * by the categoryId parameter. The places are sorted in descending order based on the number of
 * requests they have received. The function also transforms the retrieved places using the
 * transformPlaces function before returning them. If an error occurs, the function throws an error
 * with the message "Error retrieving places by category".
 */
export async function getPlacesByCategory (categoryId: string): Promise<Place[]> {
  try {
    // Checking database connection
    await checkDatabase()

    const places: Place[] = await PlaceModel.find({ category: categoryId }).sort({ requests: -1 })

    const transformedPlaces = await transformPlaces(places)

    return transformedPlaces
  } catch (error) {
    console.error(error)
    throw new Error('Error retrieving places by category')
  }
}

/**
 * The function transforms a Place or an array of Places by populating their country, category, and
 * city fields with their respective names.
 * @param {Place | Place[]} places - The parameter `places` can be either a single `Place` object or an
 * array of `Place` objects.
 * @returns The `transformPlaces` function returns a Promise that resolves to an array of transformed
 * `Place` objects if the input is an array of `Place` objects, or a single transformed `Place` object
 * if the input is a single `Place` object. The transformed `Place` objects have additional properties
 * such as the names of the associated `Country`, `Category`, and `City` objects.
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
