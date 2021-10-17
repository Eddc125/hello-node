const axios = require("axios");
const moment = require("moment"); // 先 npm install moment => require moment 就可以使用
const fs = require("fs/promises");

// await 版
async function stocksSearch() {
  // 通常會做排程工作設定自動執行的時間
  // crontab、工作排程器....
  let format = "json";
  let today = moment().format("YYYYMMDD"); // .format('格式') 就會自動抓今天的日期
  // let stockCode = "0050";
  try {
    let stockCode = await fs.readFile('stock.txt','utf-8');
    // console.log(stockCode);
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
    //console.log(res.data);
    let firstItem = res.data.data[0];
    console.log(firstItem);
  } catch (error) {
    console.error("錯誤", error);
  }
}

stocksSearch();
