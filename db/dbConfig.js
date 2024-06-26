// Dependencies
const pgp = require("pg-promise")();
// To use .env variables
require("dotenv").config();

//
const { DATABASE_URL, PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD } =
  process.env;
// DotEnv Variables
const cn = DATABASE_URL
  ? {
      connectionString: DATABASE_URL,
      
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      host: PG_HOST,
      port: PG_PORT,
      database: PG_DATABASE,
      user: PG_USER,
      password: PG_PASSWORD,
    };

const db = pgp(cn);
//Export
module.exports = db;
