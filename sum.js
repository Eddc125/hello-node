console.log("hello world");

function sum(a) {
  let result = 0;
  for (let i = 0; i <= a; i++) {
    result = result + i;
    // a =   1 跑   1 次
    // a =  10 跑  10 次
    // a = 100 跑 100 次 
  }
  console.log(result);
}

function hung(param) {
  let total = ((1 + param) * param) / 2;
  return total;
  // param =   1 跑 1 次
  // param =  10 跑 1 次
  // param = 100 跑 1 次
}

sum(6); //21
sum(10); //55
sum(15); //120

console.log(hung(10));  // 55
console.log(hung(200));  // 20100
console.log(hung(400));  // 80200

// 電腦計算加減法會比乘除法快 (前提是數字不大)

console.time("FOR迴圈 從1加到100000");
console.log(sum(100000));
console.timeEnd("FOR迴圈 從1加到100000");

console.time("梯形公式 從1加到100000");
console.log(hung(100000));
console.timeEnd("梯形公式 從1加到100000");

// 通常是在數字較大的請況下：
// 梯形公式是 O(1) 的寫法， for迴圈是 O(n)的寫法，一般來說我們會認為 O(n)比較慢 [時間複雜度較高]。