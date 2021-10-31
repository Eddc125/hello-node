const express = require("express");
const router = express.Router();
const connection = require('../utils/db')

// 從資料庫 iii-todos 的 todos 要資料
router.get("/", async (request, response) => {
  let data = await connection.queryAsync("SELECT * FROM todos");
  response.json(data);
});

//  /api/todos/24
// 根據 id 取得單筆資料
router.get("/:todoId", async (require, response) => {
  let data = await connection.queryAsync("SELECT * FROM todos WHERE id = ?;", [
    require.params.todoId,
  ]);
  // response.json(data);
  if(data.length > 0){
    response.json(data[0])
  }else{
    response.status(404).send("沒有此ID")
  }
});

module.exports = router;