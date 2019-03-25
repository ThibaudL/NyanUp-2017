const fs = require("fs");
let src = './src/defis/atcha/2019/NomAnagramme2/name.txt';
let LINE = [];
let anagrams = {};
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
                let reg =/[ ,-]/g;
                const sortedWord = alphabetize(word.sansAccent().replace(reg, ""));
                if (anagrams[sortedWord]) {
                    return anagrams[sortedWord].push(word);
                }
                anagrams[sortedWord] = [word];
            });

            let anagramLength = 0;
            let higherAnagram = [];
            for(const sorted in anagrams){
                if(anagrams[sorted].length > anagramLength) {
                    higherAnagram = anagrams[sorted];
                    anagramLength = anagrams[sorted].length;
                }

                console.log(higherAnagram, anagramLength);
            }
        });
        // console.log(finalword);
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