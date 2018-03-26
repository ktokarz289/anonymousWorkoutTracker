const { Pool, Client } = require('pg');
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGSECRET,
    port: process.env.PGPORT
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};