const fs = require('fs');
const fetch = require('node-fetch');
const assert = require('assert');

const ndarrayPack = require("ndarray-pack");
const ndarrayUnpack = require("ndarray-unpack");
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');

const ICONS = "./src/defis/kakawouette/bruteforcecaptcha/ICONS_SYMBOL_sm.png";
const LETTERS = "./src/defis/kakawouette/bruteforcecaptcha/letters.jpg";


const size = 25;
// const move = 28;
const move = 34;
// const firstX = 27;
// const firstY = 44;
const firstX = 43;
const firstY = 89;
const offsetLetters = 355;
const lines = [
    [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,0,0,0,0,0,0,1,1,1,1,1,1,1],
    [1,1,0,0,0,0,0,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
];

function myTest(){
    getPixels(ICONS, function(err, pixels) {
        lines.forEach((line, l) => {
            line.forEach((column, c) => {
                if (column) {
                    let x = firstX + (c) * move;
                    let y = firstY + (l) * move;
                    console.log(x, y, x + size, y + size);
                    const icon = ndarrayPack(
                        ndarrayUnpack(
                            pixels.lo(
                                x, y
                            ).hi(
                                size,
                                size
                            )
                        )
                    );

                    // const outFile = fs.createWriteStream(`./src/defis/kakawouette/bruteforcecaptcha/debug/icons/${l}-${c}.png`);
                    // savePixels(icon, "png").pipe(outFile);
                }
            })
        });
        lines.forEach((line, l) => {
            line.forEach((column, c) => {
                if (column) {
                    let x = firstX + (c) * move;
                    let y = firstY + offsetLetters + (l) * move;
                    console.log(x, y, x + size, y + size);
                    const icon = ndarrayPack(
                        ndarrayUnpack(
                            pixels.lo(
                                x, y
                            ).hi(
                                size,
                                size
                            )
                        )
                    );

                    // const outFile = fs.createWriteStream(`./src/defis/kakawouette/bruteforcecaptcha/debug/letters/${l}-${c}.png`);
                    // savePixels(icon, "png").pipe(outFile);
                }
            })
        });

    });


    return true;
}

// describe('BruteforceCaptcha', function() {
//     describe('myTest()', function() {
//         it('should return true', function() {
//             assert.equal(true,myTest());
//         });
//     });
// });


module.exports =  {
    launch : () => {
        // myTest();
        fetch('http://callicode.fr/pydefis/BruteforceCaptcha/input', {mode: 'cors'}).then(function(response) {
            return response.text();
        })
        .then(function(text) {
            console.log('Request successful', text);
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });
    }
};