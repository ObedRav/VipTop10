import mongoose, { Document, Schema } from 'mongoose'

interface Category extends Document {
  name: string
}

const categorySchema = new Schema<Category>({
  name: { type: String, required: true }
})

export default mongoose.model<Category>('Category', categorySchema)
