const pool = require('../db')
const express = require('express');
const router = express.Router()

// Get region data as a GeoJSON array for Leaflet use
router.get('/', async (req, res) => {
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

module.exports = router;