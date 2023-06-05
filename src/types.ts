import mongoose, { Document } from 'mongoose'

export interface Category extends Document {
  name: string
}

export interface City {
  name: string
  country: mongoose.Types.ObjectId
  coordinates: string
  categories: mongoose.Types.ObjectId[]
}

export interface Country extends Document {
  name: string
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
  openHours: string
  contact: string
  description: string
  image: string
}
