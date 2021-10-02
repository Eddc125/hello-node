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