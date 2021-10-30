const express = require("express");

let app = express(); // application
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

// 路由 route / router (有點分配/判斷網址的概念) -> 也算是一種中間件
// app.Method(Path,Handler)
// Method : GET , POST , PUT , DELETE , PATCH ...
// handler 是一個函式，會有兩個參數:request , response
app.get("/", (request, response) => {
  response.send("我是首頁"); // browser 顯示出的頁面
}); //  "/" => 首頁

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
  console.log("express app 啟動了");
});
