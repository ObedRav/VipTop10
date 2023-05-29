import express from 'express'

const app = express()

app.use(express.json())

const PORT = 3000

app.get('/taap', (_req, res) => {
  res.send('tap!')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
