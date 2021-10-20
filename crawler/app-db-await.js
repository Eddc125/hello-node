const axios = require("axios");
const moment = require("moment");
const fs = require("fs/promises");
const mysql = require("mysql");
require('dotenv').config({path:'./.env'});

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

connection.connect();

function inserPromise(insertData){
  return new Promise((resolve,reject) =>{
    connection.query(
      "INSERT IGNORE INTO daily_stock (stock_no,date, trading_volume, amount, count) VALUES (?, ?, ?, ?, ?);",
      insertData,
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results);
        }
      }
    );
  })
}

async function queryData() {
  let today = moment().format("YYYYMMDD"); // 自動給當天的日期
  let format = "json";
  // let stockCode = "2303";
  try {
    let stockCode = await fs.readFile("stock.txt", "utf-8");
    console.log("stockCode", stockCode);

    let res = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: format,
          date: today,
          stockNo: stockCode,
        },
      }
    );
    // console.log(res.data.data);
    let firstItem = res.data.data[0];
    // console.log(firstItem);

    let insertData = [
      stockCode, 
      firstItem[0], 
      firstItem[1], 
      firstItem[2], 
      firstItem[8]
    ];

    let resault = await inserPromise(insertData);
    console.log(resault);
    // await inserPromise(insertData); 也可以只寫這樣就好
  } catch (err) {
    console.error(err);
  }
  connection.end();
}

queryData();
