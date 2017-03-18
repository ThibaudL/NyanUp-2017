const fs = require("fs");
// const ndOps = require("ndarray-ops");
const ndarrayPack = require("ndarray-pack");
const ndarrayUnpack = require("ndarray-unpack");

const getPixels = require('get-pixels');
const savePixels = require('save-pixels');
// const pool = require("ndarray-scratch")
const SLICES = [47, 43, 41, 37, 31, 29, 23, 19, 17, 13, 11, 7, 5, 3, 2];
// const SLICES = [2,3,5,7];
// const SLICES = [7,5,3,2];
const IN = "./src/defis/kakawouette/succeeded/cryptimagemelange/in.png";
const OUT = "./src/defis/kakawouette/succeeded/cryptimagemelange/out.png";
// const IN = "./src/defis/kakawouette/succeeded/cryptimagemelange/in_sample.png";
// const OUT = "./src/defis/kakawouette/succeeded/cryptimagemelange/out_sample.png";
const DEBUG_OUT = "./src/defis/kakawouette/succeeded/cryptimagemelange/debug";

function computeSens(sens){
    if(sens === 'H'){
        return sens = 'V';
    }else{
        return sens = 'H';
    }
}

function copyImage(dest,source,offsetX,offsetY){
    //Get array shape
    var nx = source.shape[0],
        ny = source.shape[1];
    //Loop over all cells
    for(var x=0; x<nx; ++x) {
        for(var y=0; y<ny; ++y) {
            dest.set(offsetX + x, offsetY + y, 0, source.get(x, y, 0));
            dest.set(offsetX + x, offsetY + y, 1, source.get(x, y, 1));
            dest.set(offsetX + x, offsetY + y, 2, source.get(x, y, 2));
            dest.set(offsetX + x, offsetY + y, 3, 255);
        }
    }
}

function shuffleImage(pixels,horizontal) {
    const width = pixels.shape[0];
    const height = pixels.shape[1];
    let tmp = [];
    let lastSlice = 0;
    SLICES.forEach((slice) => {
        const pixelObj = {
            slice,
            lastSlice: lastSlice,
            pixels:
                ndarrayPack(
                    ndarrayUnpack(
                        pixels.lo(
                            horizontal ? lastSlice : 0,
                            !horizontal ?  lastSlice : 0
                        ).hi(
                            horizontal ? slice : width,
                            !horizontal ? slice : height
                        )
                    )
                )
        };
        tmp.push(pixelObj);
        lastSlice += slice;
    });

    tmp.forEach((sliceObj) => {
        const offsetX = horizontal ? width - (sliceObj.slice + sliceObj.lastSlice) : 0;
        const offsetY = !horizontal ? height - (sliceObj.slice + sliceObj.lastSlice) : 0;
        copyImage(pixels, sliceObj.pixels, offsetX, offsetY);
    });
}
module.exports =  {
    launch : () => {
        let sens = computeSens();

        getPixels(IN, function(err, pixels) {

            shuffleImage(pixels,false);
            shuffleImage(pixels,false);
            shuffleImage(pixels,false);
            shuffleImage(pixels,false);
            shuffleImage(pixels,false);
            shuffleImage(pixels,false);
            shuffleImage(pixels,false);
            shuffleImage(pixels,false);
            shuffleImage(pixels,false);
            shuffleImage(pixels,false);
            shuffleImage(pixels,false);
            shuffleImage(pixels,false);
            shuffleImage(pixels,false);
            shuffleImage(pixels,false);
            shuffleImage(pixels,false);
            shuffleImage(pixels,false);
            shuffleImage(pixels,false);
            //Really close
            shuffleImage(pixels,true);
            shuffleImage(pixels,true);
            shuffleImage(pixels,true);
            shuffleImage(pixels,true);
            shuffleImage(pixels,true);
            shuffleImage(pixels,true);
            shuffleImage(pixels,true);
            shuffleImage(pixels,true);
            shuffleImage(pixels,true);
            shuffleImage(pixels,true);
            shuffleImage(pixels,true);
            shuffleImage(pixels,true);
            shuffleImage(pixels,true);
            shuffleImage(pixels,true);
            shuffleImage(pixels,true);
            shuffleImage(pixels,true);
            shuffleImage(pixels,true);

            const outFile = fs.createWriteStream(OUT);
            savePixels(pixels, "png").pipe(outFile);

        })

    }
};
