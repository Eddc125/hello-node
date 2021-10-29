const express = require("express");

let app = express();  // application

// 路由 route / router (有點分配/判斷網址的概念)
// app.Method(Path,Handler)
// Method : GET , POST , PUT , DELETE , PATCH ...
// handler 是一個函式，會有兩個參數:request , response
app.get("/",(request,response)=>{
    response.send("我是首頁")
}) //  "/" => 首頁

app.get("/member",(request,response)=>{
    response.send("我是會員頁")
})

app.get("/course",(request,response)=>{
    response.send("我是課程頁")
}) 

app.get("/cart",(request,response)=>{
    response.send("我是購物車頁")
})

// 3001 port
app.listen(3001,()=>{
    console.log('express app 啟動了')
})