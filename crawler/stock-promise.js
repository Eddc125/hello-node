const axios = require('axios') ;

let format = 'json';
let today = '20210911';
let stockCode = '0050';

// Promise 版
axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: format,
      date: today,
      stockNo: stockCode,
    },
})
  .then((res) => {
    // handle success
    console.log(res.data);
  })
  .catch((error) => {
    // handle error
    console.error('錯誤',error);
  });