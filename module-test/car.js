// module.exports = exports = {}  程式自己加的

let brand = 'Tesla';
let color = 'white';
let price = '100'; // 萬
let size = '1800' // c.c

function getBrand(){
    return brand;
}
function showInfo(){
    console.log(`這台車是 ${color}、 ${size}CC`)
}

module.exports = {
    getBrand, // 物件 key & value 相同時可以只寫一次 getBrain : getBrain
    showInfo,
    price
}

// return module.exports;  程式自己加的