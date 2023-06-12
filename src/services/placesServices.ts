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
