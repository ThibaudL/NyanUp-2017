const nbTubes  = 65;
let tubesListe = [];
let result = "";
const nbMelanges = 50;
module.exports =  {
    launch : () => {
        for(let i = 0; i < nbTubes; i++) {
            tubesListe.push(
                {
                    "index" : i + 1
                }
            );
        }

        let first = [],
            second = [],
            third = [],
            fourth = [];

        for(let i = 1; i < nbMelanges + 1; i++) {
            first = tubesListe.slice(0, 14);
            second = tubesListe.slice(14, 28);
            third = tubesListe.slice(28, 42);
            fourth = tubesListe.slice(-23);
            tubesListe = fourth;
            tubesListe = tubesListe.concat(first, third, second);
        }

        tubesListe.forEach((tube, index) => {
           if(tube.index%2 == 0) {
               result += (index + 1) + ",";
           }
            console.log(tube.index, index);
        });

        console.log(result);
    }
};