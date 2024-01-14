const queries = require('../queries')
const pool = require('../../db')
const express = require('express');
const router = express.Router()

// Get region data as a GeoJSON array for Leaflet use
router.get('/', async (req, res) => {
  try {
    const query = queries.getFeaturesCollectionAsGeoJSONQuery();
    const { rows } = await pool.query(query)
    const geojsonData = rows[0].geojson;

    res.status(200).json(geojsonData)
  } catch (err) {
    console.error(err)
    res.status(500).send({error: err})
  }
})

module.exports = router;