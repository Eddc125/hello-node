const mysql = require("mysql");
const Promise = require("bluebird");

// 先建立資料庫連線
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  // 通常用在設定檔, 會根據設備不同做調整
  connectionLimit: process.env.CONNECTION_LIMIT || 10,
});

connection = Promise.promisifyAll(connection);

module.exports = connection;
