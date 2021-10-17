const axios = require('axios') ;

let format = 'json';
let today = '20211015';
let stockCode = '0050';

// await 版
async function stocksSearch(format,today,stockCode){
  try {
    let res = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: format,
        date: today,
        stockNo: stockCode,
      },
    });
    console.log(res.data);
  }
  catch(error){
    console.error('錯誤',error);
  }
}

stocksSearch(format,today,stockCode);
