import mongoose, { Schema } from 'mongoose'
import { Country } from '../types'

const countrySchema = new Schema<Country>({
  name: { type: String, required: true },
  coordinates: { type: String, required: true },
  continent: { type: String, required: true }
})

export default mongoose.model<Country>('Country', countrySchema)
