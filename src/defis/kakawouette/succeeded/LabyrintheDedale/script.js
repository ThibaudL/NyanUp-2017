const fetch = require('node-fetch');
const logger = require("../../../../utils/logger");

const URL = "https://callicode.fr/pydefis/LabyrintheDedale/maze";
const FIRST_TO = "637b4e0c-a38a-47c1-b133-01ed0235c187";

const VISITED = [];

function loadLab(from,to,longueur){
    fetch(`${URL}?maze=1&from=${from}&to=${to}`)
        .then(response => response.json())
        .then((json) => {
            if(json.valide === 1){
                json.newpos.forEach((newPos) => {
                    if(!VISITED.includes(newPos)) {
                        VISITED.push(newPos);
                        loadLab(to, newPos,longueur+1);
                    }
                });
                if(json.sortie === 1) {
                    logger.debug(longueur-1, json);
                }
            }
        })
}

module.exports =  {
    launch : () => {
        loadLab(FIRST_TO,FIRST_TO,1);
    }
};