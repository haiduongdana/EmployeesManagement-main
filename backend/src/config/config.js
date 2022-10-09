require("dotenv").config();
const config = process.env || {};

const DB_CONFIG = {
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  host: config.DB_HOST,
  dialect: config.DB_ENGINE,
};
module.exports = DB_CONFIG;
