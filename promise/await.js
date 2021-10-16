// 正常版 -> 1,5,2,6,4,3
// console.log(1);
// function dowork(){
//     console.log(2);

//     new Promise ((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log(3);
//             resolve('完成');
//         },3000);
//     });

//     console.log(4);
// }

// console.log(5);
// dowork();
// console.log(6);

// async & await 版  -> 1,5,2,6,3,4
console.log(1);

async function dowork(){
    console.log(2);

    await new Promise ((resolve,reject)=>{
        setTimeout(()=>{
            console.log(3);
            resolve('完成');
        },3000);
    });

    console.log(4);
}

console.log(5);
dowork();
console.log(6);
