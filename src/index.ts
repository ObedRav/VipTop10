import express from 'express'
import mongoose from 'mongoose'

const app = express()

app.use(express.json())

const PORT = 5000

mongoose.connect('mongodb://captone:capstonePassword@mongo:27017/capstone?authSource=admin')
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error: Error) => {
    console.log(`Failed to connect to MongoDB ${error.message}`)
  })

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
