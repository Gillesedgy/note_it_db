// Dependencies
const pgp = require("pg-promise")();
// To use .env variables
require(dotenv).config();

// DotEnv Variables
const cn = {
  host: process.env.PG,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
};

// Ref the Note_Dev Databse
const db = pgp(cn);

//Export
module.exports = db;
