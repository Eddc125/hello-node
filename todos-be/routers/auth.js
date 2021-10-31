const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const bcrypt = require("bcrypt");

// B: import express-validator
const { body, validationResult } = require("express-validator");

// C: 定義 register規則
const registerRules = [
  body("email").isEmail().withMessage("Email欄位請填寫正確"),
  body("password").isLength({ min: 6 }).withMessage("密碼長度只少為 6"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value == req.body.password;
    })
    .withMessage("密碼不一致"),
];

// D: 在post中路徑及箭頭函式中間插入規則('Path', rules , 箭頭函式)
router.post("/register", registerRules, async (req, res) => {
  console.log("res.body", req.body);
  //   res.body {
  //   email: 'dfdf@gmail.com',
  //   password: '123',
  //   confirmPassword: '123',
  //   name: '123',
  //   photo: ''
  // }

  // 1. 驗證資料
  // A: npm i express-validator  先安裝
  const validateResult = validationResult(req);
  if (!validateResult.isEmpty()) {
    let error = validateResult.array();
    return res.status(400).json({ code: 99, message: error });
  }
  // 表示 validateResult 是空的 => 通過驗證

  // 2. 是否已註冊
  let member = await connection.queryAsync(
    "SELECT * FROM members WHERE email=?",
    req.body.email
  );
  console.log(member);

  if (member.length > 0) {
    // 表示這個 email 已經被註冊
    // code 是團隊自己定義
    return res.json({ code: "1101", message: "該帳號已被註冊" });
  }
  // 3. 密碼加密
  // A: npm i bcrypt 安裝套件
  // bcrypt.hash(密碼,10) 10 = 2的10次方
  let hashPassword = await bcrypt.hash(req.body.password, 10);
  // console.log("hashPassword", hashPassword);
  // 同樣密碼 加密 會產生不同 亂碼

  // 4. 建立一筆資料
  let result = await connection.queryAsync(
    "INSERT INTO members (email,password,name) VALUES (?)",
    [[req.body.email, hashPassword, req.body.name]]
  );

  res.json({ require: "OKOK" });
});

router.post("/login",(req,res)=>{
  // 1. 比對資料
  let member = await connection.queryAsync("SELECT * FROM members WHERE email=?",[req.body.email])
});

if(member.length === 0){
  // 表示帳號未被建立
  res.json({code:999,message:'未建立帳號'})
}

member = member[0];

// 比對密碼
let result = await bcrypt.compare(req.body.password,member.password);  

module.exports = router;
