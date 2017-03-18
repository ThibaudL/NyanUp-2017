const ABC = 624;

const convenables = [];

function tryValue(a){
    const n = Number(a+ ''+ABC);
    if(n % ABC === 0){
        const asString = n.toString();
        let sum = 0;
        for(let i = 0 ; i < asString.length ; i++){
            sum += Number(asString[i]);
        }
        if(ABC % sum ===0){
            convenables.push(n);
        }
    }
}

module.exports =  {
    launch : () => {
        for(let i = 100000000; i < 999999999 ; i++){
            tryValue(i)
            if(i % 100000000 === 0 ){
                console.log(i)
            }
        }
        console.log(convenables.length);
    }
};