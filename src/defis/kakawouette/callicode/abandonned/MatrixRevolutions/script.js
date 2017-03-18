const fs = require("fs");
const ndarrayPack = require("ndarray-pack");
const ndarrayUnpack = require("ndarray-unpack");
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');
const logger = require("../../../../utils/logger");

// const IN = "./src/defis/kakawouette/doing/matrixrevolutions/in.png";
const IN = "./src/defis/kakawouette/abandonned/matrixrevolutions/in_sample.png";
const OUT = "./src/defis/kakawouette/abandonned/matrixrevolutions/out.png"

let codedMessage = "";

function getLSB(dec){
    let binary = (dec >>> 0).toString(2);
    logger.info(dec,"=>",binary,"=>",binary[binary.length-1])
    return binary[binary.length-1];
}

function decode(r, g, b, alpha) {
    switch (alpha) {
        case 255 :
            // si α=255 pas de codage présent
            break;
        case 254 :
            codedMessage += getLSB(b) ;
            // si α=254 codage d'1 bit d'information sur le LSB de la composante B
            break;
        case 253 :
            codedMessage += getLSB(g) ;
            // si α=253 codage d'1 bit d'information sur le LSB de la composante G
            break;
        case 252 :
            codedMessage += getLSB(r) ;
            // si α=252 codage d'1 bit d'information sur le LSB de la composante R
            break;
        case 251 :
            codedMessage += getLSB(b) + getLSB(g) ;
            // si α=251 codage de 2 bits d'information (le premier sur le LSB de la composante B, puis le second sur celui de la composante G)
            break;
        case 250 :
            codedMessage += getLSB(b) + getLSB(r) ;
            // si α=250 codage de 2 bits d'information (LSB de la composante B, puis celui de la composante R)
            break;
        case 249 :
            codedMessage += getLSB(g) + getLSB(b) ;
            // si α=249 codage de 2 bits d'information (LSB de la composante G, puis celui de la composante B)
            break;
        case 248 :
            codedMessage += getLSB(g) + getLSB(r) ;
            // si α=248 codage de 2 bits d'information (LSB de la composante G, puis celui de la composante R)
            break;
        case 247 :
            codedMessage += getLSB(r) + getLSB(b) ;
            // si α=247 codage de 2 bits d'information (LSB de la composante R, puis celui de la composante B)
            break;
        case 246 :
            codedMessage += getLSB(r) + getLSB(g) ;
            // si α=246 codage de 2 bits d'information (LSB de la composante R, puis celui de la composante G)
            break;
        case 245 :
            codedMessage += getLSB(b) + getLSB(g) + getLSB(r) ;
            // si α=245 codage de 3 bits d'information (LSB de la composante B, puis celui de la composante G, puis celui de la composante R)
            break;
        case 244 :
            codedMessage += getLSB(b) + getLSB(r) + getLSB(g) ;
            // si α=244 codage de 3 bits d'information (LSB de la composante B, puis celui de la composante R, puis celui de la composante G)
            break;
        case 243 :
            codedMessage += getLSB(g) + getLSB(b) + getLSB(r) ;
            // si α=243 codage de 3 bits d'information (LSB de la composante G, puis celui de la composante B, puis celui de la composante R)
            break;
        case 242 :
            codedMessage += getLSB(g) + getLSB(r) + getLSB(b) ;
            // si α=242 codage de 3 bits d'information (LSB de la composante G, puis celui de la composante R, puis celui de la composante B)
            break;
        case 241 :
            codedMessage += getLSB(r) + getLSB(b) + getLSB(g) ;
            // si α=241 codage de 3 bits d'information (LSB de la composante R, puis celui de la composante B, puis celui de la composante G)
            break;
        case 240 :
            codedMessage += getLSB(r) + getLSB(g) + getLSB(b);
            // si α=240 codage de 3 bits d'information (LSB de la composante R, puis celui de la composante G, puis celui de la composante B)
            break;
    }
    if(alpha>239 && alpha < 255)
        logger.info(codedMessage);
}

function splitByLetter(binaryMessage){
    logger.debug(binaryMessage.length)
    const letters = [];
    let tmpLetter = "";
    for(let i = 0; i < binaryMessage.length ; i++){
        if(i%8 === 0){
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
                    decode(pixels.get(x, y, 0), pixels.get(x, y, 1), pixels.get(x, y, 2), pixels.get(x, y, 3))
                }
            }

            console.log(codedMessage);
            const letters = splitByLetter(codedMessage);
            console.log(letters);
            letters.forEach((letter) => {
                console.log(letter, "=>",parseInt(letter,2))
                FINAL += (String.fromCharCode(parseInt(letter,2)));
            })
            logger.info(FINAL);
            console.log(getLSB(70))

        });
    }
};

