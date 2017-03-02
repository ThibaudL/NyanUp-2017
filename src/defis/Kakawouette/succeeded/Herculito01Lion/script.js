const IN = "ARTEMIS ASCLEPIOS ATHENA ATLAS CHARON CHIRON CRONOS DEMETER EOS ERIS"+
" EROS GAIA HADES HECATE HEPHAISTOS HERA HERMES HESTIA HYGIE LETO MAIA"+
" METIS MNEMOSYNE NYX OCEANOS OURANOS PAN PERSEPHONE POSEIDON RHADAMANTHE"+
" SELENE THEMIS THETIS TRITON ZEUS";

function wordValue(word){
    let total = 0;
    for(let i = 0 ; i < word.length ; i++){
        total += word.charCodeAt(i)-64;
    }
    return total;
}

function adWord(output,word, index){
    if(!!output[index]){
        output[index] += ' '+word;
    }else{
        output[index] = word;
    }
}

module.exports =  {
    launch : () => {
        const words = IN.split(/\s/g);
        let output = [];
        words.forEach((word) => {
            const value = wordValue(word);
            adWord(output,word,wordValue(word));
        })
        const intermediaire = output.filter((word) => !!word);
        console.log(intermediaire.reduce((a,b) => a + ' ' + b));
    }
};