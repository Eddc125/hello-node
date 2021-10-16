const fs = require("fs");
// callback 版
// fs.readFile('input.txt',"utf8",(err,data)=>{
//     if(err){
//         console.error('錯誤訊息',err)
//     }else{
//         console.log('正確讀到',data)
//     }
// })
// promise 版
let p = new Promise((resolve,reject)=>{
    fs.readFile('input.txt',"utf8",(err,data)=>{
        if(err){
            reject(err);
        }else{
            resolve(data);
        }
    })
});

console.log(p); // Promise { <pending> }

p.then((data)=>{
    console.log("讀檔正確",data);
}).catch((err) =>{
    console.log("讀檔失敗",err);
});
