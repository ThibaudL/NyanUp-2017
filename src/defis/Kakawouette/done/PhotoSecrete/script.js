const logger = require("../../../utils/logger");
const fs = require("fs");
const ndarrayPack = require("ndarray-pack");
const ndarrayUnpack = require("ndarray-unpack");
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');

const IN = "./src/defis/kakawouette/doing/cle1.png";
const IN2 = "./src/defis/kakawouette/doing/cle2.png";
const OUT = "./src/defis/kakawouette/doing/out.png";

function managePixel(img1, img2,x,y){
    let v1,v2;
    if(img1.get(x,y,0) === img2.get(x,y,0)){
        v1 = img1.get(x,y,1);
        v2 = img2.get(x,y,1);
    }else{
        v1 = img1.get(x,y,2);
        v2 = img2.get(x,y,2);
    }
    return v1 ^ v2;
}

function parcours(img1, img2){
    //Get array shape
    var nx = img1.shape[0],
        ny = img1.shape[1];
    //Loop over all cells
    for(var x=0; x<nx; ++x) {
        for(var y=0; y<ny; ++y) {
            const greyValue = managePixel(img1, img2,x,y);
            img1.set(x,y,0,greyValue);
            img1.set(x,y,1,greyValue);
            img1.set(x,y,2,greyValue);
        }
    }


}

module.exports =  {
    launch : () => {
        // console.log(231 ^ 184)
        getPixels(IN, function(err, pixels) {
            getPixels(IN2, function(err, pixels2) {
                parcours(pixels,pixels2);

                const outFile = fs.createWriteStream(OUT);
                savePixels(pixels, "png").pipe(outFile);

            });





        });
    }
};
