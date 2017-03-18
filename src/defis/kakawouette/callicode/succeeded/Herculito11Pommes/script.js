function nbPomme(etage){
    return Math.pow(etage,2);
}

function sumForEtages(nbEtages){
    let total = 0 ;
    for(let etage=1;etage<=nbEtages;etage++){
        let nbPommesEtage = nbPomme(etage);
        if(nbPommesEtage % 3 ===0){
            total += nbPommesEtage;
        }
    }
    return total;
}

module.exports =  {
    launch : () => {
        console.log('this is the result : ',sumForEtages(50));
    }
};