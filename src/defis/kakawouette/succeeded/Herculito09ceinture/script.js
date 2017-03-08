const fs = require("fs");
const ndarrayPack = require("ndarray-pack");
const ndarrayUnpack = require("ndarray-unpack");
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');

const IN = "./src/defis/kakawouette/succeeded/Herculito09ceinture/in_real.png";
const OUT = "./src/defis/kakawouette/succeeded/Herculito09ceinture/out.png";
const OUT_LEFT = "./src/defis/kakawouette/succeeded/Herculito09ceinture/left.png";
const OUT_RIGHT = "./src/defis/kakawouette/succeeded/Herculito09ceinture/right.png";

function managePixel(dest,source,x,y){
    if(dest.get(x,y,0) !== source.get(x,y,0)
        || dest.get(x,y,1) !== source.get(x,y,1)
        || dest.get(x,y,2) !== source.get(x,y,2)
    ){
        dest.set(x,y,0,0);
        dest.set(x,y,1,0);
        dest.set(x,y,2,0);
    }
}

function copyImage(dest,source){
    //Get array shape
    var nx = source.shape[0],
        ny = source.shape[1];
    //Loop over all cells
    for(var x=0; x<nx; ++x) {
        for(var y=0; y<ny; ++y) {
            managePixel(dest,source,x,y);
        }
    }


}



module.exports =  {
    launch : () => {
        getPixels(IN, function(err, pixels) {
            const width = pixels.shape[0];
            const height = pixels.shape[1];

            const left = ndarrayPack(
                ndarrayUnpack(
                    pixels.lo(
                        0,0
                    ).hi(
                        width/2,
                        height
                    )
                )
            );


            const outFileL = fs.createWriteStream(OUT_LEFT);
            savePixels(left, "png").pipe(outFileL);

            const right = ndarrayPack(
                ndarrayUnpack(
                    pixels.lo(
                        width/2,0
                    ).hi(
                        width/2,
                        height
                    )
                )
            );


            const outFileR = fs.createWriteStream(OUT_RIGHT);
            savePixels(right, "png").pipe(outFileR);

            copyImage(left,right);

            const outFile = fs.createWriteStream(OUT);
            savePixels(left, "png").pipe(outFile);


        });
    }
};