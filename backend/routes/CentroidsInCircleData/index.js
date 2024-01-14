const queries = require('../queries')
const pool = require('../../db')
const express = require('express');
const router = express.Router()

// Given the circle position and radius, returns a FeatureCollection
// where all features has centroids that are inside the userCircle
router.post('/', async (req, res) => {
  try {
    const {radius, position} = req.body;

    // Create a circle geometry
    const userCircle = queries.getUserCircle(position.lng, position.lat, radius);
    const query = `
    WITH 
      CentroidsInCircle AS (
        ${queries.getCentroidsWithinCircle(userCircle)}
      )
    SELECT     
      json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(
          json_build_object(
            'type', 'Feature',
            'id', ${process.env.TABLE_NAME}."Key",
            'properties', json_build_object(
              'income', ${process.env.TABLE_NAME}."income",
              'population', ${process.env.TABLE_NAME}."population",
              'centroid_coordinate', ST_AsGeoJSON(ST_Centroid("spatialobj"))::json->'coordinates'
            ),
            'geometry', ST_AsGeoJSON("spatialobj")::json
          )
        )
      ) AS geojson
    FROM ${process.env.TABLE_NAME}
    JOIN CentroidsInCircle ON CentroidsInCircle."Key" = ${process.env.TABLE_NAME}."Key"
  `;

    const { rows } = await pool.query(query)
    const geojsonData = rows[0].geojson;

    res.status(200).json(geojsonData)
  } catch (err) {
    console.error(err)
    res.status(500).send({error: err})
  }
})

module.exports = router;