
require('dotenv').config()

const express = require('express')
const cors = require('cors');
const pool = require('./db')
const port = process.env.APP_PORT_NUMBER

const queries = require('./functions/queries')


const app = express()
app.use(cors());
app.use(express.json())

// Check if API is working
app.get('/', async (req, res) => {
  res.status(200).send({message: 'Success'})
})

// Get region data as a GeoJSON array for Leaflet use
app.get('/region-data', async (req, res) => {
  try {
    const query = `
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(
          json_build_object(
            'type', 'Feature',
            'id', "Key",
            'properties', json_build_object(
              'income', "income",
              'population', "population",
              'centroid_coordinate', ST_AsGeoJSON(ST_Centroid("spatialobj"))::json->'coordinates'
            ),
            'geometry', ST_AsGeoJSON("spatialobj")::json
          )
        )
      ) AS geojson
      FROM ${process.env.TABLE_NAME};
    `;
    const { rows } = await pool.query(query)
    const geojsonData = rows[0].geojson;

    res.status(200).json(geojsonData)
  } catch (err) {
    console.error(err)
    res.status(500).send({error: err})
  }
})

// Given the circle position and radius, return the total population, and avg income
app.post('/results-data', async (req, res) => {
  try {
    const {radius, position, calculationMethod} = req.body;
    // query to create the user's circle in PostGIS
    const userCircle = `
      ST_Buffer(
        ST_MakePoint(${position.lng}, ${position.lat}):: geography,
        ${radius}
      )::geometry
    `
    let totalPopulation = 0;
    let avgIncome = 0;
    if (calculationMethod === "centroidBasedMethod") {
      const query = queries.getCentroidBasedMethodQuery(userCircle)
      const { rows } = await pool.query(query)

      totalPopulation = rows[0].total_population;
      avgIncome = rows[0].avg_income
    } else if (calculationMethod === "arealProportionMethod") {
      const query = queries.getArealProportionMethodQuery(userCircle)
      const { rows } = await pool.query(query)
      totalPopulation = rows[0].total_population;
      avgIncome = rows[0].avg_income
    }    

    res.status(200).json({
      totalPopulation,
      avgIncome
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({error: err})
  }
})

app.listen (port, () => console.log(`Server has started on port: ${port}`))
