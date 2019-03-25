const fs = require("fs");
let src = './src/defis/atcha/2019/chambrepairs/EVEN.txt';
let LINE = [];
let words = [];
let alphabet = 'AMELIRNOPSUWT';
module.exports = {
    launch: () => {
        const lineReader = require('readline').createInterface({
            input: fs.createReadStream(src)
        });

        lineReader.on('line', (line) => {
            LINE.push(line);
        });

        lineReader.on('close', () => {
            LINE = LINE.toString();
            let word = '';
            [...LINE].forEach((char) => {
                if ((!isNaN(char) && char % 2 === 0) || alphabet.includes(char)) {
                    word += char;
                } else {
                    words.push(word);
                    word = '';
                }
            });

            // console.log(words);

            let higherWord = words.reduce(function (a, b) { return a.length > b.length ? a : b; });
            console.log(higherWord);
        });
    }
};