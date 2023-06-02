import mongoose, { Document, Schema } from 'mongoose'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Category from './Category'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Country from './Country'

interface City extends Document {
  name: string
  country: mongoose.Types.ObjectId
  coordinates: string
  categories: mongoose.Types.ObjectId[]
}

const citySchema = new Schema<City>({
  name: { type: String, required: true },
  country: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
  coordinates: { type: String, required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
})

export default mongoose.model<City>('City', citySchema)
