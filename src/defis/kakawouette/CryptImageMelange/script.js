const fs = require("fs");
const ndOps = require("ndarray-ops");
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');
const pool = require("ndarray-scratch")
// const SLICES = [47, 43, 41, 37, 31, 29, 23, 19, 17, 13, 11, 7, 5, 3, 2];
const SLICES = [2,3,5,7];
// const IN = "./src/defis/kakawouette/cryptimagemelange/in.png";
// const OUT = "./src/defis/kakawouette/cryptimagemelange/out.png";
const IN = "./src/defis/kakawouette/cryptimagemelange/in_sample.png";
const OUT = "./src/defis/kakawouette/cryptimagemelange/out_sample.png";
const DEBUG_OUT = "./src/defis/kakawouette/cryptimagemelange/debug";

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

module.exports =  {
    launch : () => {
        let sens = computeSens();

        getPixels(IN, function(err, pixels) {
            const width = pixels.shape[0];
            const height = pixels.shape[1];

            let tmp = [];
            let lastSlice = 0;
            SLICES.forEach((slice) => {
                const pixelObj = {
                    slice,
                    lastSlice: lastSlice,
                    pixels : pool.malloc([slice,height,4])
                };
                Object.assign(pixelObj.pixels, pixels.lo(lastSlice, 0).hi(slice, height));
                tmp.push(pixelObj);
                lastSlice += slice;
                // var outFile = fs.createWriteStream(DEBUG_OUT+'/'+slice+'.png');
                // savePixels(tmp[tmp.length-1].pixels, "png").pipe(outFile);
            });

            tmp.forEach((sliceObj) => {
                var outFile = fs.createWriteStream(DEBUG_OUT+'/'+sliceObj.slice+'.png');
                savePixels(sliceObj.pixels, "png").pipe(outFile);

                copyImage(pixels,sliceObj.pixels,width-(sliceObj.slice+sliceObj.lastSlice),0);
            });


            var outFile = fs.createWriteStream(OUT);
            savePixels(pixels, "png").pipe(outFile);
        })

    }
};
