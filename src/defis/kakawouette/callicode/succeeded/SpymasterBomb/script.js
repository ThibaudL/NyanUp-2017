
function getTotalModulo3And5(value){
    let total = 0;
    for(let i=0 ; i < value ; i++){
        if(i%3 === 0 || i%5 ===0){
            total += i;
        }
    }
    return total;
}

module.exports =  {
    launch : () => {
        console.log('this is the result',getTotalModulo3And5(1325))
    }
};