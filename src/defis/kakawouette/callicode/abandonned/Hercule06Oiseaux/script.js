const fs = require("fs");
const ndarrayPack = require("ndarray-pack");
const ndarrayUnpack = require("ndarray-unpack");
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');

const IN = "./src/defis/kakawouette/Hercule06Oiseaux/in.png";
const RED = "./src/defis/kakawouette/Hercule06Oiseaux/red.png";
const OUT = "./src/defis/kakawouette/Hercule06Oiseaux/out.png";

let SUM = 0;

function fillCenters(pixels){
    //Get array shape
    var nx = pixels.shape[0],
        ny = pixels.shape[1];
    //Loop over all cells
    for(var x=0; x<nx; ++x) {
        let lastColor = 0;
        for(var y=0; y<ny; ++y) {
            const color = pixels.get(x,y,0);
            if(color !== 255){
                if(color !== 0){
                    lastColor = color;
                }
                pixels.set(x,y,0,lastColor);
                pixels.set(x,y,1,lastColor);
                pixels.set(x,y,2,lastColor);
            }else{
                pixels.set(x,y,0,0);
                pixels.set(x,y,1,0);
                pixels.set(x,y,2,0);
            }
        }
    }
}




function floodFill(pixels,x,y,targetColor,replacementColor){
    const TODO = [];
    console.log(x,y)
    if(x<0 || x>999|| y<0 || y>499){
        return TODO;
    }
    // 1. If target-color is equal to replacement-color, return.
    if(targetColor === replacementColor){
        return TODO;
    }
    // 2. If the color of node is not equal to target-color, return.
    if(pixels.get(x,y,0) !== targetColor){
        return TODO;
    }
    // 3. Set the color of node to replacement-color.
    pixels.set(x,y,0,replacementColor);
    // 4. Perform Flood-fill (one step to the south of node, target-color, replacement-color).
    TODO.push({x,y : y+1});
    // Perform Flood-fill (one step to the north of node, target-color, replacement-color).
    TODO.push({x,y : y-1});
    // Perform Flood-fill (one step to the west of node, target-color, replacement-color).
    TODO.push({x : x+1,y : y});
    // Perform Flood-fill (one step to the east of node, target-color, replacement-color).
    TODO.push({x : x-1,y : y});
    // 5. Return.
    return TODO;
}


function count(pixels){
    //Get array shape
    var nx = pixels.shape[0],
        ny = pixels.shape[1];
    //Loop over all cells
    for(var x=0; x<nx; ++x) {
        for(var y=0; y<ny; ++y) {
            SUM+=pixels.get(x,y,0);
        }
    }
}




module.exports =  {
    launch : () => {
        //     USED TO CHANGED OUTER BLACK TO RED
        // getPixels(IN, function(err, pixels) {
        //     let todo = floodFill(pixels,10,25,0,255);
        //     while(todo.length){
        //         let tmpTodos = [];
        //         todo.forEach((td) => {
        //             tmpTodos = [...tmpTodos,...floodFill(pixels,td.x,td.y,0,255)];
        //         });
        //         todo = [...tmpTodos];
        //     }
        //     const outFile = fs.createWriteStream(RED);
        //     savePixels(pixels, "png").pipe(outFile);
        // });

        //On remplie le milieu et on enleve le rouge
        // getPixels(RED, function(err, pixels) {
        //     fillCenters(pixels);
        //     const outFile = fs.createWriteStream(OUT);
        //     savePixels(pixels, "png").pipe(outFile);
        //
        // });

        //ON COMPTE
        getPixels(OUT, function(err, pixels) {
            count(pixels);
            console.log(SUM);
        });


    }
};