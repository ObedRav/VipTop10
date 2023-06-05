import mongoose, { Document, Schema } from 'mongoose'

interface Country extends Document {
  name: string
  coordinates: string
  continent: string
}

const countrySchema = new Schema<Country>({
  name: { type: String, required: true },
  coordinates: { type: String, required: true },
  continent: { type: String, required: true }
})

export default mongoose.model<Country>('Country', countrySchema)
