import mongoose, { Schema } from 'mongoose'
import { Category } from '../types'

const categorySchema = new Schema<Category>({
  name: { type: String, required: true }
})

export default mongoose.model<Category>('Category', categorySchema)
