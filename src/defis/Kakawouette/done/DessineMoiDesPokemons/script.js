const logger = require("../../../utils/logger");
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');
const pool = require("ndarray-scratch")
const fs = require("fs");

const IN = "./src/defis/kakawouette/doing/in.txt";
const OUT = "./src/defis/kakawouette/doing/out.png";



function manage(pixels, y,x,values){
    pixels.set(x,y,0,255);
    console.log(x, y)
    if(values.length > 0) {
        let xt = Number(x);
        let yt = Number(y);
        switch (Number(values[0])) {
            case 0:
                xt++;
                break;
            case 1:
                xt++;
                yt--;
                break;
            case 2:
                yt--;
                break;
            case 3:
                yt--;
                xt--;
                break;
            case 4:
                xt--;
                break;
            case 5:
                yt++;
                xt--;
                break;
            case 6:
                yt++;
                break;
            case 7:
                xt++;
                yt++;
                break;

        }
        values = values.splice(1, values.length);
        manage(pixels, yt,xt, values);
    }
}

const LINES = [];
module.exports =  {
    launch : () => {
        const lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(IN)
        });

        lineReader.on('line', (line) => {
            LINES.push(line);
        });

        lineReader.on('close', (line) => {
            const width = LINES[0].split(' ')[0];
            const height = LINES[0].split(' ')[1]; = pool.malloc([width,height,3]);


            let pixels
            LINES.forEach((line, index) => {
                if (index > 0){
                    let initial = line.substring(1,line.indexOf(')')).split(',');
                    let values = line.substring(line.indexOf(')')+1, line.length).split(' ').filter((value) => {
                        if(value){
                            return true;
                        }
                        return false;
                    });
                    manage(pixels, initial[0], initial[1], values);
                }
            });


            const outFile = fs.createWriteStream(OUT);
            savePixels(pixels, "png").pipe(outFile);

        });
    }
};

//infos :
/*
* Pour k éléments parmi n, le nombre d'arrangements est
* n!/(n−k)!
* */