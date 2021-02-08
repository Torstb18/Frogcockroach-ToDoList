const pg = require('pg');
const dbCredentials = process.env.DATABASE_URL || require('./localenv').credentials;

const pool = new pg.Pool({
    connectionString: dbCredentials,
    ssl: {
        rejectUnauthorized: false
    }
});