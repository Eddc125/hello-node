```js
function readData(idx) {
    for (let i = 0; i < 100; i++) {
      idx++;
      console.log(idx);
    }
    if (idx < 500) {
      readData(idx);
    }
  }
  
  readData(0);
  console.log("after");
```

# 程式 1：

## 1.請問以下執行結果為何？ 
印出 1-500 after
## 2.after 會在什麼數字後印出？ 
500 
## 3.為什麼？
- 過程
- 進行for迴圈印出 1-100 ， idx =100  -> if 條件成立
- 回到for迴圈印出 101-200 ， idx =200  -> if 條件成立
- 回到for迴圈印出 201-300 ， idx =300 if 條件成立
- 回到for迴圈印出 301-400 ， idx =400 if 條件成立
- 回到for迴圈印出 401-500 ， idx =500 if 條件不成立 跳出readData()
- 最後印出 after

```js
function readData(idx) {
  for (let i = 0; i < 100; i++) {
    idx++;
    console.log(idx);
  }
  if (idx < 500) {
    setTimeout(function () {
      readData(idx);
    }, 0);
  }
}

readData(0);
console.log("after");
```
# 程式 2：
## 1.請問以下執行結果為何？
印出 1-100 、 after 、 101-500
## 2.after 會在什麼數字後印出？ 
100
## 3.為什麼？
- 過程
- 進行for迴圈印出 1-100 ， idx =100  -> if 條件成立
- 執行setTimeout() 跳出 readData() 先印出 after
- 再回到for迴圈印出 101-500 ， idx =500  -> if 條件不成立
- 結束