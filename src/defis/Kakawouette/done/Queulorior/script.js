const logger = require("../../../utils/logger");
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');
const pool = require("ndarray-scratch")
const fs = require("fs");

const IN = "./src/defis/kakawouette/doing/in.txt";
const OUT = "./src/defis/kakawouette/doing/out.png";



function manage(pixels,x,y,direction){
    switch(direction){
        case 'N':
            pixels.set(x,y-1,0,255);
            pixels.set(x,y-2,0,255);
            pixels.set(x,y-3,0,255);
            pixels.set(x,y-4,0,255);
            return {x,y : y-4};
            break;
        case 'S':
            pixels.set(x,y+1,0,255);
            pixels.set(x,y+2,0,255);
            pixels.set(x,y+3,0,255);
            pixels.set(x,y+4,0,255);
            return {x,y : y+4};
            break;
        case 'E':
            pixels.set(x+1,y,0,255);
            pixels.set(x+2,y,0,255);
            pixels.set(x+3,y,0,255);
            pixels.set(x+4,y,0,255);
            return {x : x+4,y};
            break;
        case 'O':
            pixels.set(x-1,y,0,255);
            pixels.set(x-2,y,0,255);
            pixels.set(x-3,y,0,255);
            pixels.set(x-4,y,0,255);
            return {x : x-4,y};
            break;
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
            let pixels= pool.malloc([3000,20,3]);
            LINES.forEach((line, index) => {
                let x = 10,y = 10;
                for(let i = 0 ; i < line.length; i++){
                    console.log(line[i])
                    const manageResult = manage(pixels,x,y,line[i]);
                    if(manageResult) {
                        x = manageResult.x;
                        y = manageResult.y;
                    }
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