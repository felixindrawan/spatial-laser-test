function getUserCircle(lng, lat, radius) {
  return `
    ST_Buffer(
      ST_MakePoint(${lng}, ${lat}):: geography,
      ${radius}
    )::geometry
  `
}

// Returns the percentage of the area of the feature intersecting the circle
// i.e. how much of the feature is covered by the circle
function  getPercentageOfIntersection (userCircle) {
  return `
    SELECT 
      income,
      population,
      (
        ST_Area(ST_Intersection(spatialobj, ${userCircle})) / ST_Area(spatialobj)
      ) * 100 AS intersection_percentage
    FROM ${process.env.TABLE_NAME}
    WHERE ST_Intersects(spatialobj, ${userCircle})
  `
}

// Returns the total population given an intersection percentage
function getTotalPopulationInAnIntersection() {
  return `
    SELECT 
      SUM(population * (intersection_percentage / 100)) AS total_population
    FROM IntersectionData
  `
}

function getArealProportionMethodQuery(userCircle) {

  // Create a table that only contains data that is in the circle
  // and select the total population, and total income of those areas
  const query = `
    WITH 
      IntersectionData AS 
        (${getPercentageOfIntersection(userCircle)}),
      TotalPopulation AS 
        (${getTotalPopulationInAnIntersection()})
    SELECT 
      (SELECT total_population FROM TotalPopulation),
      SUM(income * population *(intersection_percentage / 100)) / (SELECT total_population FROM TotalPopulation) AS avg_income
    FROM IntersectionData;
  `;

  return query;
}

// Returns data that has the centroids within the user's circle
function getCentroidsWithinCircle(userCircle) {
  return `
    SELECT 
      population, 
      income
    FROM ${process.env.TABLE_NAME}
    WHERE ST_Within(ST_Centroid(spatialobj), ${userCircle})
  `
}

function getCentroidBasedMethodQuery(userCircle) {
  // Create a table that only contains data that is in the circle
  // and select the total population, and total income of those areas
  const query = `
    WITH CentroidsInCircle AS (
        ${getCentroidsWithinCircle(userCircle)}
      )
    SELECT 
      SUM(population) AS total_population, 
      AVG(income) AS avg_income
    FROM CentroidsInCircle;
  `;

  return query;
}

module.exports = {
  getUserCircle,
  getArealProportionMethodQuery,
  getCentroidBasedMethodQuery,
  getTotalPopulationInAnIntersection,
  getPercentageOfIntersection
}