const fs = require("fs");
let src = './src/defis/atcha/thor/liste_mots_francais.txt';
let LINE = [];
module.exports =  {
    launch : () => {
        // let regex = new RegExp('');
        // console.log(regex);
        let wordresult = 0;
        const lineReader = require('readline').createInterface({
            input: fs.createReadStream(src)
        });

        lineReader.on('line', (line) => {
            LINE.push(line);
        });

        lineReader.on('close', () => {
            LINE.forEach((line) => {
                if(nbre_caracteres('t', line) == 1)
                    if(nbre_caracteres('h', line) == 1)
                        if(nbre_caracteres('o', line) == 1)
                            if(nbre_caracteres('r', line) == 1)
                                wordresult++;
            });
            console.log(wordresult);


            // console.log(wordResult);
            // }
        });

        console.log(wordresult);
    }
};

function nbre_caracteres(lettre, mot)
{
    mot2 = mot.split(lettre);
    nbre_de_fois_trouve = mot2.length-1;
    return nbre_de_fois_trouve;
}