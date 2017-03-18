const MESSAGE = "./src/defis/kakawouette/succeeded/sequence_cesar/in.txt";
const logger = require("../../../../utils/logger");

function maxUsedLetter(message) {
    let letters = {};
    let maxedLetter;
    let maxedValued = 0;


    for (let i = 0; i < message.length; i++) {
        letters[message[i]] = letters[message[i]] || 0;
        letters[message[i]]++;
        if (letters[message[i]] > maxedValued) {
            maxedValued = letters[message[i]];
            maxedLetter = message[i];
        }

    }
    // logger.debug(letters);
    return maxedLetter;
}

function getDelta(letter) {
    return letter.charCodeAt(0) - "E".charCodeAt(0);
}

function moveALl(message, delta) {
    let newMessage = "";
    for (let i = 0; i < message.length; i++) {
        let newValue = message.charCodeAt(i)+delta;
        if(newValue>90){
            newValue = 65+newValue-90;
        }else if(newValue < 65){
            newValue = 90+newValue-65+1;
        }
        newMessage += String.fromCharCode(newValue);
    }
    return newMessage;
}

module.exports = {
    launch: () => {
        const lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(MESSAGE)
        });

        lineReader.on('line', (line) => {
            const decodedMessage = moveALl(line,-1*getDelta(maxUsedLetter(line)));
            if(decodedMessage.includes("SECRET") && decodedMessage.includes("TROUVER")){
                logger.debug("This is the answer : ",decodedMessage);
            }
        });
    }
}
;