const fs = require("fs");

const IN = "./src/defis/kakawouette/doing/in.txt";


const orderedWarned = [];
const POKEMONS = [];

const results = [];
let time = 0;
function warn(neighborns){
    let hasWarned = false;
    let toWarn = [];
    if(neighborns) {
        neighborns.forEach((neighborn) => {
            if (!POKEMONS[Number(neighborn)].warned) {
                if (hasWarned === false) {
                    time++;
                }
                hasWarned = true;
                POKEMONS[Number(neighborn)].warned = true;
                orderedWarned.push(neighborn);
                POKEMONS[Number(neighborn)].neighborns.forEach((n) => {
                    if (!toWarn.includes(n)) {
                        toWarn.push(n)
                    }
                })
            }
        });
        return(toWarn.filter((n) => {
            return !POKEMONS[Number(n)].warned;
        }));
    }
}

function warnStart(number) {
    POKEMONS.forEach(pokemon => {
        if(pokemon.number) {
            pokemon.warned = false;
        }
    });
    time = 0;
    orderedWarned.push(number);
    POKEMONS[number].warned = true;

    let toWarn = warn(POKEMONS[number].neighborns);
    while(toWarn.length > 0){
        toWarn = warn(toWarn);
    }
    results.push({time,number});
    return time;
}


module.exports =  {
    launch : () => {
        const lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(IN)
        });

        lineReader.on('line', (line) => {
            const pokemon = {
                number : line.split(':')[0]
            };
            const neighborns = line.substring(line.indexOf(':')+1,line.length);
            pokemon.neighborns = neighborns.split(',');
            POKEMONS[line.split(':')[0]] = pokemon;
        });

        lineReader.on('close', (line) => {
            POKEMONS.forEach(pokemon =>{
                if(pokemon.number){
                    warnStart(Number(pokemon.number));
                }
            });

            const max = (Math.max(...results.map((r) => r.time)));
            const maxedNumbers = results.filter(r => r.time === max).map(r => r.number);
            console.log(max,',',maxedNumbers);
        });
    }
};
