function getArealProportionMethodQuery(userCircle) {
  // Query to check if feature intersercts with circle
  const checkIntersection = `ST_Intersects("spatialobj", ${userCircle})
  `
  // Query to get the percentage of area that's intersecting with circle
  const percentageIntersecting = `
  (ST_Area(
      ST_Intersection("spatialobj", ${userCircle})
     ) / ST_Area("spatialobj")
    ) * 100 AS intersection_percentage
  `;

  // Create a table that only contains data that is in the circle
  // and select the total population, and total income of those areas
  const query = `
    WITH IntersectionData AS (
        SELECT 
          ${percentageIntersecting},
          population, 
          income
        FROM ${process.env.TABLE_NAME}
        WHERE ${checkIntersection}
      )
    SELECT 
      SUM(population * (intersection_percentage / 100)) AS total_population, 
      SUM(income * (intersection_percentage / 100)) / COUNT(*) AS avg_income
    FROM IntersectionData;
  `;

  return query;
}

function getCentroidBasedMethodQuery(userCircle) {
  // Query to get centroid of the spatialobj
  const centroid = `ST_Centroid("spatialobj")`;
  // Query to check if centroid is inside the circle
  const checkCentroidWithinCircle = `ST_Within(${centroid}, ${userCircle})`;

  // Create a table that only contains data that is in the circle
  // and select the total population, and total income of those areas
  const query = `
    WITH CentroidsInCircle AS (
        SELECT 
          population, 
          income
        FROM ${process.env.TABLE_NAME}
        WHERE ${checkCentroidWithinCircle}
      )
    SELECT 
      SUM(population) AS total_population, 
      AVG(income) AS avg_income
    FROM CentroidsInCircle;
  `;

  return query;
}

module.exports = {
  getArealProportionMethodQuery,
  getCentroidBasedMethodQuery
}