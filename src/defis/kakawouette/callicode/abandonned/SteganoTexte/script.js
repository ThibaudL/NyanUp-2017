const fs = require("fs");
const ndarrayPack = require("ndarray-pack");
const ndarrayUnpack = require("ndarray-unpack");
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');
const logger = require("../../../../utils/logger");

const IN = "./src/defis/kakawouette/doing/steganotexte/in.png";
const OUT = "./src/defis/kakawouette/doing/steganotexte/out.png"

let codedMessage = "";

function getLSB(dec){
    let binary = (dec >>> 0).toString(2);
    // logger.info(dec,"=>",binary,"=>",binary[binary.length-1])
    return binary[binary.length-1];
}

function decode(r, g, b) {
        codedMessage = getLSB(b)  +getLSB(g) + getLSB(r) + codedMessage;
}

function splitByLetter(binaryMessage){
    logger.debug(binaryMessage.length)
    const letters = [];
    let tmpLetter = "";
    for(let i = 0; i < binaryMessage.length ; i++){
        if(i%7 === 0){
            if(tmpLetter) {
                letters.push(tmpLetter)
            }
            tmpLetter = "";
        }

        tmpLetter += binaryMessage[i];

    }
    letters.push(tmpLetter)
    return letters;
}


let FINAL = "";

module.exports = {
    launch: () => {
        getPixels(IN, function (err, pixels) {
            //Get array shape
            const nx = pixels.shape[0],
                ny = pixels.shape[1];
            //Loop over all cells
            for (let x = 0; x < nx; ++x) {
                for (let y = 0; y < ny; ++y) {
                    decode(pixels.get(x, y, 0), pixels.get(x, y, 1), pixels.get(x, y, 2))
                }
            }

            console.log(codedMessage);
            const letters = splitByLetter(codedMessage);
            console.log(letters);
            letters.forEach((letter) => {
                const invValue = parseInt(letter,2);
                console.log(letter, "=>",invValue)
                FINAL += (String.fromCharCode(invValue));
            });
            logger.info(FINAL);
        });
    }
};

