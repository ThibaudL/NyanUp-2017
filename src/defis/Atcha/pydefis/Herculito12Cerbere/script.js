let hypothenuse = 2925;
let resultArray = [];
module.exports =  {
    launch : () => {
        let squareFirst = 0;
        let squareSecond = 0;
        for(let i = 0; i < hypothenuse; i++) {
            squareSecond = Math.pow(hypothenuse, 2) - Math.pow(i,2);
            let second = Math.sqrt(squareSecond);
            if(i > 0 && Number.isInteger(second)) {
                resultArray.push(
                    {
                        'first': i,
                        'second': second
                    }
                );
            }
        }

        resultArray.sort(compare);

        console.log(resultArray[resultArray.length - 1]);
    }
};

function compare(a, b) {
    if (a.second < b.second)
        return -1;
    if (a.second > b.second)
        return 1;
    // a doit être égal à b
    return 0;
}