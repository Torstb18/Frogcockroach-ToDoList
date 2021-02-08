const pg = require('pg');
const dbCredentials = process.env.DATABASE_URL || require('./localenv').credentials;