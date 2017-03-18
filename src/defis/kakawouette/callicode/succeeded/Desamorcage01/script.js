function splitHalf(number){
    const numberAsString = number.toString();
    const retour = {
        head : '',
        tail : ''
    };
    const halfLength = numberAsString.length/2;
    for(let i = 0 ; i < numberAsString.length ; i++){
        if(i < halfLength){
            retour.head += numberAsString[i];
        }else {
            retour.tail += numberAsString[i];
        }
    }
    retour.head = parseInt(retour.head);
    retour.tail = parseInt(retour.tail);
    return retour;
}
function getLast3(number){
    const numberAsString = number.toString();
    let retour = '';
    for(let i = numberAsString.length-1 ; i > numberAsString.length-4 ; i--){
            retour = (numberAsString[i] || 0 )+retour;
    }
    return retour;
}


function compute(U, iterations){
    console.log(U,iterations)
    iterations--;

    U = getLast3(U*13);
    if(iterations>0){
        return compute(U,iterations);
    }else{
        return U;
    }
}

const START = 449149;



module.exports =  {
    launch : () => {
        const initialSplit = splitHalf(START);
        console.info(compute(initialSplit.head, initialSplit.tail));

    }
};
