const request = require('supertest');
const express = require('express');
const router = require('./index');
const pool = require('../../db')

const app = express();
app.use(express.json());
app.use('/results-data', router);

// // sample data for feature one
const sampleFeatureOne = {"type":"Feature","id":"480850317043","properties":{"income":125276,"population":662,"centroid_coordinate":[-96.8414311303947,32.9901132000428]},"geometry":{"type":"Polygon","coordinates":[[[-96.839554,32.987508],[-96.839782,32.987501],[-96.840053,32.987505],[-96.841044,32.987521],[-96.842061,32.987532],[-96.842213,32.987534],[-96.84241,32.987539],[-96.843115,32.987542],[-96.843981,32.987556],[-96.843952,32.98896],[-96.843941,32.989233],[-96.84391,32.990606],[-96.843915,32.990658],[-96.843923,32.990872],[-96.843898,32.992694],[-96.843745,32.992685],[-96.843121,32.992692],[-96.842033,32.992708],[-96.83889,32.9927],[-96.838912,32.991859],[-96.838918,32.991015],[-96.838987,32.989148],[-96.838946,32.988226],[-96.838948,32.987707],[-96.838953,32.98758],[-96.838955,32.987525],[-96.839328,32.987514],[-96.839554,32.987508]]]}}
// sample data for feature two
const sampleFeatureTwo = {"type":"Feature","id":"480850317041","properties":{"income":149323,"population":891,"centroid_coordinate":[-96.8413803100368,32.9951065479633]},"geometry":{"type":"Polygon","coordinates":[[[-96.843745,32.992685],[-96.843898,32.992694],[-96.843896,32.99295],[-96.843895,32.993091],[-96.843886,32.994111],[-96.843878,32.995039],[-96.843893,32.99521],[-96.843907,32.995331],[-96.843918,32.995421],[-96.843928,32.995572],[-96.843934,32.995653],[-96.843938,32.995889],[-96.843936,32.996185],[-96.843934,32.996463],[-96.843933,32.996727],[-96.843936,32.997118],[-96.843941,32.99723],[-96.843939,32.997304],[-96.843774,32.997341],[-96.843385,32.997431],[-96.843216,32.997473],[-96.843147,32.997485],[-96.843044,32.997502],[-96.84287,32.997519],[-96.842817,32.997522],[-96.842679,32.997526],[-96.842497,32.997522],[-96.842225,32.997516],[-96.841852,32.997507],[-96.841602,32.997498],[-96.841033,32.997502],[-96.840894,32.997505],[-96.84061,32.997506],[-96.840021,32.997507],[-96.83966,32.997511],[-96.838835,32.997521],[-96.838835,32.997448],[-96.838835,32.997379],[-96.838841,32.996867],[-96.838854,32.99609],[-96.838868,32.995933],[-96.838868,32.995391],[-96.838868,32.995017],[-96.838868,32.994345],[-96.838883,32.994011],[-96.83889,32.993522],[-96.83889,32.9927],[-96.842033,32.992708],[-96.843121,32.992692],[-96.843745,32.992685]]]}}

describe ("POST /results-data - Centroid Based Method", () => { 
  it(`should return 0 for both totalPopulation and avgIncome, given a circle outside all features`,
  async () => {
    // Create circle that's not centered on featureOne's centroid
    const requestBody = {
      radius: 50,
      position: {lng:32.9901132000428, lat: -96.8414311303947},
      calculationMethod: 'centroidBasedMethod'
    }

    // Perform the POST request
    const response = await request(app)
      .post('/results-data')
      .send(requestBody);
    
    // Assertions
    expect(response.statusCode).toBe(200);
    expect(Number(response.body.totalPopulation)).toBe(0)
    expect(Number(response.body.avgIncome)).toBe(0)
  })
  
  it(`should return sampleFeatureOne's totalPopulation and avgIncome, given a circle that contains sampleFeatureOne's centroid`,
  async () => {
    // Create circle that's centered on featureOne's centroid
    const requestBody = {
      radius: 50,
      position: {lng: -96.8414311303947, lat:32.9901132000428},
      calculationMethod: 'centroidBasedMethod'
    }

    // Perform the POST request
    const response = await request(app)
      .post('/results-data')
      .send(requestBody);
    
    // Assertions
    expect(response.statusCode).toBe(200);
    expect(Number(response.body.totalPopulation)).toBeCloseTo(sampleFeatureOne.properties.population)
    expect(Number(response.body.avgIncome)).toBeCloseTo(sampleFeatureOne.properties.income)
  })

  it(`should return totalPopulation and avgIncome for both sampleFeatureOne and sampleFeatureTwo`,
  async () => {
    // Create circle that's contains sampleFeatureOne and sampleFeatureTwo's centroids 
    const requestBody = {
      radius: 1000,
      position: {
        lat: 32.99160339017115,
        lng: -96.85010433197023
      },
      calculationMethod: 'centroidBasedMethod'
    }
    const expectedPopulation = sampleFeatureOne.properties.population + sampleFeatureTwo.properties.population
    const expectedAvgIncome = (sampleFeatureOne.properties.income + sampleFeatureTwo.properties.income)/2
    

    // Perform the POST request
    const response = await request(app)
      .post('/results-data')
      .send(requestBody);
    
    // Assertions
    expect(response.statusCode).toBe(200);
    expect(Number(response.body.totalPopulation)).toBeCloseTo(expectedPopulation)
    expect(Number(response.body.avgIncome)).toBeCloseTo(expectedAvgIncome)
  })
})

const queries = require('../queries')

describe ("POST /results-data - Areal Proportion Method", () => {
  it(`should return the correct totalPopulation and avgIncome based on sampleFeatureOne`,
  async () => {
    // Create circle that intersects with featureOne
    const requestBody = {
      radius: 500,
      position: {
        lat: 32.986671901637074,
        lng: -96.84529781341554
      },
      calculationMethod: 'arealProportionMethod'
    }

    // Create circle geometry
    const userCircle = queries.getUserCircle(requestBody.position.lng, requestBody.position.lat, requestBody.radius)
    // Get the intersecting percentage  
    const { rows } = await pool.query(queries.getPercentageOfIntersection(userCircle))
    const percentage = rows[0].intersection_percentage

    // Get the expected population and the average income
    const sampleData = {
      income: sampleFeatureOne.properties.income,
      population: sampleFeatureOne.properties.population
    }
    const expectedPopulation = sampleData.population*(percentage/100)
    const expectedAvgIncome = (sampleData.income*sampleData.population*(percentage/100))/expectedPopulation

    // Perform the POST request
    const response = await request(app)
      .post('/results-data')
      .send(requestBody);

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(Number(response.body.totalPopulation)).toBeCloseTo(expectedPopulation)
    expect(Number(response.body.avgIncome)).toBeCloseTo(expectedAvgIncome)
  })

  afterAll(async () => {
    await pool.end();
  })
})
