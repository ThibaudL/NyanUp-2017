module.exports =  {
    launch : () => {
        let nbTete = 8542;
        let coupEpee = 1;
        while(nbTete > 1) {
            coupEpee++;
            nbTete = coupeTete(nbTete);
        }

        console.log(coupEpee);
    }
};

function coupeTete(nbTete) {
    let newNbTete = nbTete / 2;
    if((newNbTete)%2 != 0 && newNbTete != 1) {
        newNbTete = newNbTete * 3 + 1;
    }
    return newNbTete;
}