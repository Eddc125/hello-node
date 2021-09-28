console.log("hello world");

function sum(a) {
  let result = 0;
  for (let i = 0; i <= a; i++) {
    result = result + i;
  }
  console.log(result);
}

sum(6); //21
sum(10); //55
sum(15); //120
