const time = 10;
const INITIAL_VAL = 200;

function getOccurences(minutes){
    return minutes *60 /3;
}

function compute(val){
    return (137 * val + 187) % 256

}

let nord = 0;
let est = 0;
let lastDirection = "";

function incrementeDirection(val){
    const unity = val.toString()[val.toString().length-1];
    console.log(val, nord, est, unity)
    if(unity ==='0'){
        nord++;
        lastDirection = "nord";
    }else if (unity === '1' ){
        est++;
        lastDirection = "est";
    }else{
        if(lastDirection === "nord"){
            nord++;
        }else{
            est++;
        }
    }
}

//rules
// de 1 m vers le nord si le chiffre des unités est 0
// de 1 m vers l'est si le chiffre des unités est 1
// de 1 m dans la même direction que la dernière direction prise sinon


module.exports =  {
    launch : () => {
        const occurences = getOccurences(time);
        let val = 200;
        for(let i = 0 ; i < occurences; i++){
            incrementeDirection(val);
            val = compute(val);
        }
        console.log(nord,est)
    }
};