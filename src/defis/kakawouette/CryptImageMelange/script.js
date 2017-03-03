const fs = require("fs");
const ndOps = require("ndarray-ops");
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');
const SLICES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
const IN = "./src/defis/kakawouette/cryptimagemelange/in.png";
const OUT = "./src/defis/kakawouette/cryptimagemelange/out.png";
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
    for(var x=1; x<nx-1; ++x) {
        for(var y=1; y<ny-1; ++y) {
            dest.set(offsetX+x,offsetY+y,0,source.get(x,y,0));
            dest.set(offsetX+x,offsetY+y,1,source.get(x,y,1));
            dest.set(offsetX+x,offsetY+y,2,source.get(x,y,2));
            dest.set(offsetX+x,offsetY+y,3,source.get(x,y,3));
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
                tmp.push({
                    slice,
                    lastSlice,
                    pixels : pixels.lo(lastSlice, 0).hi(slice, height)
                });
                lastSlice += slice;
                var outFile = fs.createWriteStream(DEBUG_OUT+'/'+slice+'.png');
                savePixels(pixels, "png").pipe(outFile);
            });

            tmp.forEach((sliceObj) => {
                console.log(sliceObj.slice +' - '+sliceObj.lastSlice);
                copyImage(pixels,sliceObj.pixels,width-(sliceObj.slice+sliceObj.lastSlice),0);
            });


            var outFile = fs.createWriteStream(OUT);
            savePixels(pixels, "png").pipe(outFile);
        })

    }
};
