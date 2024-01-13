const queries = require('./queries')
const pool = require('../../db')
const express = require('express');
const router = express.Router()

// Given the circle position and radius, return the total population, and avg income
router.post('/', async (req, res) => {
  try {
    const {radius, position, calculationMethod} = req.body;

    // Create a circle geometry
    const userCircle = queries.getUserCircle(position.lng, position.lat, radius);

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

module.exports = router;