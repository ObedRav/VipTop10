import mongoose, { Document } from 'mongoose'

export enum Countries {
  Colombia = 'Colombia',
  DominicanRepublic = 'Dominican Republic',
  UnitedStates = 'United States'
}

export interface Category extends Document {
  name: string
}

export interface City extends Document {
  name: string
  country: mongoose.Types.ObjectId
  coordinates: string
  categories: mongoose.Types.ObjectId[]
}

export interface Country extends Document {
  name: Countries
  coordinates: string
  continent: string
}

export interface Place extends Document {
  category: mongoose.Types.ObjectId
  city: mongoose.Types.ObjectId
  country: mongoose.Types.ObjectId
  name: string
  coordinates: string
  rating: number
  address: string
  openHours: string[]
  contact: string
  description: string
  image: string
}

export interface GooglePlaceResult {
  name: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  rating?: number
  formatted_address?: string
  opening_hours?: {
    weekday_text: string[]
  }
  formatted_phone_number?: string
  types?: string[]
  photos?: Array<{
    photo_reference: string
  }>
}
