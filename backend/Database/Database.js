const { Pool } = require("pg");

const pool = new Pool({
  user: "username",
  host: "127.0.0.1",
  database: "databasename",
  password: "password",
  port: 5432, // portnumber
});

module.exports = pool;
