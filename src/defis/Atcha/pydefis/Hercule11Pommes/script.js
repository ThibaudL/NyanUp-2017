let nb = 126;
let arrayNb = [];
let x = 0;
let y = 0;
let km = 0;
let direction = 'haut';
let result = 0;
module.exports =  {
    launch : () => {
        while (nb != 1) {
            arrayNb.push(nb);
            nb = calculNb(nb);
        }

        arrayNb.forEach((nb) => {
            if(nb%2 == 0) {
                km += 1;
                switch (direction) {
                    case 'haut' :
                        y += km;
                        break;
                    case 'bas' :
                        y -= km;
                        break;
                    case 'droite' :
                        x += km;
                        break;
                    case 'gauche' :
                        x -= km;
                        break;
                }
            } else {
                if(nb%3 == 0) {
                    switch (direction) {
                        case 'haut' :
                            direction = 'droite';
                            break;
                        case 'bas' :
                            direction = 'gauche';
                            break;
                        case 'droite' :
                            direction = 'bas';
                            break;
                        case 'gauche' :
                            direction = 'haut';
                            break;
                    }
                } else {
                    switch (direction) {
                        case 'haut' :
                            direction = 'gauche';
                            break;
                        case 'bas' :
                            direction = 'droite';
                            break;
                        case 'droite' :
                            direction = 'haut';
                            break;
                        case 'gauche' :
                            direction = 'bas';
                            break;
                    }
                }
            }
        });

        result = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        console.log(Math.ceil(result * 1000));
    }
};

function calculNb(nb) {
    if(nb%2 == 0) {
        nb = nb / 2;
    } else {
        nb = nb * 3 + 1;
    }

    return nb;
}