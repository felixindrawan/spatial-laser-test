require('dotenv').config()
const {Pool} = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT_NUMBER,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionString: `${process.env.DATABASE_URL}`, // Use the DATABASE_URL from your Heroku config vars
  ssl: {
    rejectUnauthorized: false // This should only be used for development
  }
})

module.exports = pool
