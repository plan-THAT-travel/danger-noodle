const { Pool } = require('pg');
const path = require('path');
const PG_URI = require(path.join(__dirname, 'dbURL'));

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
