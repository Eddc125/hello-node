const express = require("express");
require("dotenv").config();
const mysql = require("mysql");
const Promise = require("bluebird");
const cors = require("cors");

// 先建立資料庫連線
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

connection = Promise.promisifyAll(connection);

let app = express(); // application
let corsOptions = {
  origin: "*", // 全部的網域都可以可以require
};
app.use(cors(corsOptions)); // 不同 port / domain 時可以允許

// app.use 告訴 express 這裡有一個中間件(middleware)
// middleware 只是一個函式，會有三個參數
app.use((request, response, next) => {
  console.log("歡迎進入我的網頁");
  next(); // 可以讓程式往下一行程式碼前進
  // 如果沒有 next() 就會停在這裡
});

app.use((request, response, next) => {
  let current = new Date();
  console.log(`有人來訪問 at ${current.toISOString()}`);
  next();
});

// 使用這個中間件，才可以讀到body的資料
app.use(express.urlencoded({extended:true}))
// 使用這個中間件，才可以解析到json的資料
app.use(express.json())

// 路由 route / router (有點分配/判斷網址的概念) -> 也算是一種中間件
// app.Method(Path,Handler)
// Method : GET , POST , PUT , DELETE , PATCH ...
// handler 是一個函式，會有兩個參數:request , response
app.get("/", (request, response) => {
  response.send("我是首頁"); // browser 顯示出的頁面
}); //  "/" => 首頁

/* //上課練習 中間件
app.get("/member", (request, response) => {
  response.send("我是會員頁");
});

// 課程頁 1 & 2 都會 console.log出來
// app.get("/course", (request, response,next) => {
//   console.log("我是課程頁1");
//   next();
// });
app.get("/course", (request, response) => {
  console.log("我是課程頁2");
  response.send("我是課程頁");
});

app.get("/cart", (request, response) => {
  response.send("我是購物車頁");
}); */

// 將 Todos 的 POST 引入
let todosRouter = require('./routers/todos');
app.use('/api/todos',todosRouter);
// 將 Register 的 POST 引入
let authRouter = require('./routers/auth');
app.use('/api/auth',authRouter);

// 取得 member 資料
// let memberRouter = require('./routers/member');
// app.use('/api/members',memberRouter)
app.get("/api/members/:memberId", async (require, response) => {
  let data = await connection.queryAsync("SELECT * FROM members WHERE id = ?;", [
    require.params.memberId,
  ]);
  // response.json(data);
  if(data.length > 0){
    response.json(data[0])
  }else{
    response.status(404).send("沒有此ID")
  }
});


//負責 查無分頁 的紀錄
app.use((request, response, next) => {
  console.log(`${request.url} 查無此分頁`);
  next();
});

// 會走到這個中間件是因為
// 路由器比對前面的path都比不到
// --> 404 !!!
app.use((request, response, next) => {
  console.log("無此網站");
  response.send("<h1>404 ERROR</h1>");
});

// 3001 port
app.listen(3001, () => {
  connection.connect();
  console.log("express app 啟動了");
});