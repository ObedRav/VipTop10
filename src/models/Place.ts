import mongoose, { Document, Schema } from 'mongoose'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Category from './Category'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import City from './City'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Country from './Country'

interface Place extends Document {
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

const placeSchema = new Schema<Place>({
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
  country: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
  name: { type: String, required: true },
  coordinates: { type: String, required: true },
  rating: { type: Number, required: true },
  address: { type: String, required: false },
  openHours: { type: String, required: false },
  contact: { type: String, required: false },
  description: { type: String, required: true },
  image: { type: String, required: false }
})

export default mongoose.model<Place>('Place', placeSchema)
