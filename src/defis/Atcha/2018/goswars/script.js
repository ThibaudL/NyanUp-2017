let words = "sassai eaux-de-vie cessaient acerbité eaux sceau tiendra hasard acéphale auxiliairement vesce eurafricaine hâtai saignant entachassent alentie césar vieillerie messéant taillable ives testacé dracéna ardentes ensablant blessas entachasses ioniens antarctique sessiles ineffaçables quercitrine besace lessivasses acerbes descellaient entachas lessive gestation lessivâtes antécédentes énamourâmes antécédent entachât inefficace testacelles sarabandes entachant rieur itérâmes antécédences messages sesquioxydes testacés"
let wordArray = [];
let wordArrayComplete = [];
module.exports =  {
    launch : () => {
        wordArray = words.split(" ");
        let wordArrayToTest = wordArray;
        wordArrayComplete.push(wordArray[0]);
        let lengthArray = wordArray.length;
        let wordResult = wordArray[0];
        for(let i = 0; i <= lengthArray - 1; i++) {
            let oldWorldResult = wordResult;
            wordResult = wordArrayToTest.find((element) => {
                return element.startsWith(wordResult.substr(wordResult.length - 3, 3));
            });
            if(wordResult === undefined) {
                wordResult = wordArray.find((element) => {
                    return element.endsWith(oldWorldResult.substr(0, 3));
                });
            }
            console.log(wordArrayComplete);
            wordArrayToTest.splice(wordArrayToTest.indexOf(wordResult), 1);
            wordArrayComplete.push(wordResult);
        }

        console.log(wordArrayComplete);
    }
};