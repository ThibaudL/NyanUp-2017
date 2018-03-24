const fs = require("fs");
let src = './src/defis/atcha/2018/PestageAsciiArt/ascii.txt';
let LINE = [];
let image1 = "",
    image2 = "",
    image3 = "",
    image4 = "";
module.exports =  {
    launch : () => {
        const lineReader = require('readline').createInterface({
            input: fs.createReadStream(src)
        });

        lineReader.on('line', (line) => {
            LINE.push(line);
        });

        let lineNumer = 0;
        lineReader.on('close', () => {
            LINE.forEach((line) => {
                for (var i = 0; i < line.length; i++) {
                    if(lineNumer%2 === 0) {
                        if(i%2 === 0) {
                            image1 += line.charAt(i) + ' ' ;
                        } else {
                            image2 += line.charAt(i) + ' ';
                        }
                    } else {
                        if(i%2 === 0) {
                            image3 += line.charAt(i) + ' ';
                        } else {
                            image4 += line.charAt(i) + ' ';
                        }
                    }
                }
                if(lineNumer%2 === 0) {
                    image1 += '\n';
                    image2 += '\n';
                } else {
                    image3 += '\n';
                    image4 += '\n';
                }
                lineNumer++;
            });


            console.log(image3);
            // console.log(wordResult);
            // }
        });
    }
};