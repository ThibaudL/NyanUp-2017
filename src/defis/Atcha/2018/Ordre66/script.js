let impair = [1, 3, 5, 7, 9];
let first, second, third, fourth;
let resultArray = '';
module.exports =  {
    launch : () => {
        for(let i = 0; i <= impair.length - 1; i++) {
            first = impair[i];
            for(let i = 0; i <= impair.length - 1; i++) {
                if(first < i) {
                    second = i;
                }
                for(let i = 0; i <= impair.length - 1; i++) {
                    if(second < i) {
                        third = i;
                    }
                    for(let i = 0; i <= impair.length - 1; i++) {
                        if(third < i) {
                            fourth = i;
                        }
                        if((first + second + third + fourth) % 2 === 0) {
                            resultArray = first.toString() + second.toString() + third.toString() + fourth.toString();
                        }
                    }
                }
            }
        }
        console.log(resultArray);
        console.log('This a sample');
    }
};

function produitImpair(chiffre) {

}