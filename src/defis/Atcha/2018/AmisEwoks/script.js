const fs = require("fs");
let src = './src/defis/atcha/2018/AmisEwoks/ewoks.txt';
let LINE = [];
let amis = [
    {

    }
]
module.exports =  {
    launch : () => {
        const lineReader = require('readline').createInterface({
            input: fs.createReadStream(src)
        });

        lineReader.on('line', (line) => {
            LINE.push(line);
        });

        lineReader.on('close', () => {
            LINE.forEach((line) => {
                
            });
            console.log(wordresult);


            // console.log(wordResult);
            // }
        });
        console.log('This a sample');
    }
};