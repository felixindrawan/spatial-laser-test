require('dotenv').config()

const express = require('express')
const cors = require('cors');
const port = process.env.PORT
const resultsDataRoute = require('./routes/ResultsData')
const regionDataRoute = require('./routes/RegionData')

const app = express()
app.use(cors());
app.use(express.json())

// Check if API is working
app.get('/', async (req, res) => {
  res.status(200).send({message: 'Success'})
})

app.use('/region-data', regionDataRoute)

app.use('/results-data', resultsDataRoute)

app.listen (port, () => console.log(`Server has started on port: ${port}`))
