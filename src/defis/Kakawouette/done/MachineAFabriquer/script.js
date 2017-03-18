
let B1 = {
    actif : 1,
    nb : 3
};

let B2 = {
    actif : 1,
    nb : 2
};

let B3 = {
    actif : 1,
    nb : 3
};

let B4 = {
    actif : 1,
    nb : 2
};

let B5 = {
    actif : 1,
    nb : 2
};

let B6 = {
    actif : 1,
    nb : 3
};


function insertPokemon(machine){
    const oldActif = machine.actif;
    machine.actif = machine.actif=== machine.nb ? machine.actif = 1 : machine.actif+1;
    if (!machine[oldActif].isFinal) {
        return insertPokemon(machine[oldActif]);
    }else{
        return machine[oldActif].type;
    }
}


module.exports =  {
    launch : () => {
        B1[1] = B2;
        B1[2] = B3;
        B1[3] = B4;

        B2[1] = B5;
        B2[2] = B6;

        B3[1] = B2;
        B3[2] = B5;
        B3[3] = B6;

        B4[1] = B3;
        B4[2] = B6;

        B5[1] = {
            isFinal : true,
            type : "ROCHE"
        };
        B5[2] = {
            isFinal : true,
            type : "EAU"
        };

        B6[1] = B5;
        B6[2] = {
            isFinal : true,
            type : "GLACE"
        };
        B6[3] = B4;

        let result = "";
        for(let i = 0 ; i < 100 ; i++) {
            const type = insertPokemon(B1);
            result += type[0];
        }
        console.log(result);

    }
};