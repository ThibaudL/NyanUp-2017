const fs = require("fs");
const ndarrayPack = require("ndarray-pack");
const ndarrayUnpack = require("ndarray-unpack");
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');

const IN = "./src/defis/kakawouette/succeeded/Hercule05Ecuries/in.png";
const OUT = "./src/defis/kakawouette/succeeded/Hercule05Ecuries/out.png";

let SUM = 0;

function floodFill(pixels, x, y, targetColor, replacementColor) {
    const TODO = [];
    // console.log(x, y)
    if (x < 0 || x > pixels.shape[0] || y < 0 || y > pixels.shape[1]) {
        return TODO;
    }
    // 1. If target-color is equal to replacement-color, return.
    if (targetColor === replacementColor) {
        return TODO;
    }
    // 2. If the color of node is not equal to target-color, return.
    if (pixels.get(x, y, 0) !== targetColor) {
        return TODO;
    }
    // 3. Set the color of node to replacement-color.
    pixels.set(x, y, 0, replacementColor);
    pixels.set(x, y, 1, replacementColor);
    pixels.set(x, y, 2, replacementColor);
    // 4. Perform Flood-fill (one step to the south of node, target-color, replacement-color).
    TODO.push({x, y: y + 1});
    // Perform Flood-fill (one step to the north of node, target-color, replacement-color).
    TODO.push({x, y: y - 1});
    // Perform Flood-fill (one step to the west of node, target-color, replacement-color).
    TODO.push({x: x + 1, y: y});
    // Perform Flood-fill (one step to the east of node, target-color, replacement-color).
    TODO.push({x: x - 1, y: y});
    // 5. Return.
    return TODO;
}


module.exports = {
    launch: () => {
        getPixels(IN, function (err, pixels) {
            //Get array shape
            var nx = pixels.shape[0],
                ny = pixels.shape[1];
            //Loop over all cells
            for (var x = 0; x < nx; ++x) {
                let lastColor = 0;
                for (var y = 0; y < ny; ++y) {
                    if(pixels.get(x,y,0) !==0) {
                        SUM++;
                        let todo = floodFill(pixels, x, y, 255, 0);
                        while (todo.length) {
                            let tmpTodos = [];
                            todo.forEach((td) => {
                                tmpTodos = [...tmpTodos, ...floodFill(pixels, td.x, td.y, 255, 0)];
                            });
                            todo = [...tmpTodos];
                        }
                    }
                }
            }
            console.log(SUM);
            const outFile = fs.createWriteStream(OUT);
            savePixels(pixels, "png").pipe(outFile);
        });

    }
};

