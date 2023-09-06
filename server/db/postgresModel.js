const { Pool } = require('pg');

require('dotenv').config()

const PG_URI = process.env.DB_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
