const queries = require('../queries')
const pool = require('../../db')
const express = require('express');
const router = express.Router()

// Given the circle position and radius, returns a FeatureCollection
// where all features are intersected inside the userCircle
router.post('/', async (req, res) => {
  try {
    const {radius, position} = req.body;

    // Create a circle geometry
    const userCircle = queries.getUserCircle(position.lng, position.lat, radius);
    const query = `
    SELECT     
      json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(IntersectedFeatures.features)
      ) AS geojson
    FROM (
      SELECT jsonb_build_object(
        'type',       'Feature',
        'id',         "Key",
        'geometry',   ST_AsGeoJSON(ST_Intersection("spatialobj", ${userCircle}))::json,
        'properties', json_build_object(
                        'income', "income",
                        'population', "population"
                      )
      ) AS features
      FROM ${process.env.TABLE_NAME}
      WHERE ST_Intersects("spatialobj", ${userCircle})
    ) IntersectedFeatures
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