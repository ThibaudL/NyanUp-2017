var getPixels = require("get-pixels");
var savePixels = require("save-pixels");
const fs = require("fs");
let pixelsArray = [];

const OUT = "./src/defis/atcha/2019/LePortraitColore/out.png";

module.exports =  {
    launch : () => {
        getPixels("./src/defis/atcha/2019/LePortraitColore/portrait.png", function(err, pixels) {
            if(err) {
                console.log("Bad image path");
                return
            }
            console.log(pixels.data[0]);
            pixels.data.forEach((pixelValue) => {
                pixelsArray.push(parseInt(pixelValue.toString(2).split('').reverse().join(''), 2));
            });

            pixels.data = pixelsArray;

            const outFile = fs.createWriteStream(OUT);
            savePixels(pixels, "png").pipe(outFile);
        })
    }
};