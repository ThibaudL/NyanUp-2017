// const code = [19,9,1,12,1,16,12,1,3,5,4,5,19,20,18,9,1,14,7,12,5,19,22,15,21,19,21,20,9,12,9,19,5,26,4,5,19,3,1,18,18,5,19,21,14,5,14,15,21,22,5,12,12,5,19,15,18,20,5,4,5,6,12,5,24,1,7,15,14,5,19];
// const messageCode = "no_tdiett__essdnrus_stkae_kalaeé_am.rwt,utaeole_";

const code = [1, 2, 1, 19, 12, 1, 20, 5, 1, 13, 18, 15, 3, 11, 5, 20];
const messageCode = "Poiktum_esach_u";


module.exports =  {
    launch : () => {
    	let messageToDisplay = "";
    	let moveFrom = 0;
    	let messageToDecode = messageCode;
    	// for (var j = 0; j < messageCode.length; i++) {
    	// 	messageToDisplay = "_";
    	// }

        for (var i = 0; i < code.length; i++) {
        	if(moveFrom + code[i] > messageToDecode.length){
        		moveFrom = (moveFrom + code[i]) - messageToDecode.length;
        	} else if(moveFrom + code[i] == messageToDecode.length) {
        		moveFrom = code[i];
        	} else {
        		moveFrom += code[i];
        	}

        	// console.log(messageToDecode);
        	var j = moveFrom-1;
        	while(j <= messageToDecode.length && messageToDecode[j] == '.') {
        		j++;
        	}

        	console.log(messageToDecode);
        	messageToDisplay += messageToDecode[j];
			messageToDecode = messageToDecode.substr(0, j) + '.' + messageToDecode.substr(j + 1);
		}

        console.log(messageToDisplay);
    }
};