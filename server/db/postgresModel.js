const { Pool } = require('pg');
const PG_URI = require('dbURL');

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
