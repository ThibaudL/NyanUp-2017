const logger = require("../../../utils/logger");

// const ADVERSAIRE = [130, 100, 110, 60];
// let VOUS = [20, 120, 80, 50];
const ADVERSAIRE = [170, 200, 180, 30, 70, 50, 100, 40, 60, 80, 30, 110, 100, 170, 200, 60, 160];
const VOUS = [120, 150, 160, 180, 170, 190, 150, 200, 150, 180, 60, 180, 60, 170, 130, 60, 140];

const maxedScores = {
    adversaire : 999999999999,
    vous : 0
};


var permArr = [],
    usedChars = [];

let bestOnes = [];


function permute(input) {
    var i, ch;
    for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length == 0) {
            // permArr.push(usedChars.slice());
            let scores = {
                adversaire : 0,
                vous : 0
            }

            const list = usedChars.slice();
            ADVERSAIRE.forEach((pv,index) => {
                const scoreManche = pv + list[index];
                if(pv > list[index]){
                    scores.adversaire += scoreManche;
                }else if(pv < list[index]){
                    scores.vous += scoreManche;
                }
            })
            if(scores.vous > maxedScores.vous || (scores.vous == maxedScores.vous && scores.adversaire<maxedScores.adversaire)){
                maxedScores.vous = scores.vous;
                maxedScores.adversaire = scores.adversaire;
                bestOnes = list;
                console.log(bestOnes,maxedScores)
            }
        }
        permute(input);
        input.splice(i, 0, ch);
        usedChars.pop();
    }
    return permArr
};


module.exports =  {
    launch : () => {
        // console.log(scores);
        permute(VOUS);
        logger.info(maxedScores);
        logger.info(bestOnes);

    }
};




