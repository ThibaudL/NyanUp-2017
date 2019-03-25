const fs = require("fs");
let src = './src/defis/atcha/2019/NomAnagramme1/name.txt';
let LINE = [];
let words = [];
let name = 'PIERREMARECHAL';
let finalword = '';
module.exports =  {
    launch : () => {
        const lineReader = require('readline').createInterface({
            input: fs.createReadStream(src)
        });

        lineReader.on('line', (line) => {
            LINE.push(line);
        });

        lineReader.on('close', () => {
            [...LINE].forEach((word) => {
                // console.log(word.toString().toUpperCase().replace(/ /g,""));
                let reg =/[ ,-]/g;
                let wordFormated = alphabetize(word.sansAccent()).replace(reg, "");
                let nameFormated = alphabetize(name);
                // console.log(wordFormated.length, word.replace(" ", "").replace(reg, "").length, wordFormated.length);

                if(wordFormated === nameFormated) {
                    console.log(word);
                    finalword = word;
                }
            });
        });
        console.log(finalword);
    }
};

function alphabetize(word) {
    return word.toLowerCase()
        .split('')
        .sort()
        .join('')
        .trim();
}

String.prototype.sansAccent = function(){
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

    var str = this;
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }

    return str;
};