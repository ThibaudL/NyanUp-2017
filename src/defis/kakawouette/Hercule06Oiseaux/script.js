const fs = require("fs");
const ndarrayPack = require("ndarray-pack");
const ndarrayUnpack = require("ndarray-unpack");
const getPixels = require('get-pixels');

const IN = "./src/defis/kakawouette/Herculito06Oiseaux/in.png";
let SUM = 0;

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
        getPixels(IN, function(err, pixels) {
            count(pixels);
            console.log(SUM);
        });
    }
};