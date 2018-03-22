const serieNumber = '449149';
module.exports =  {
    launch : () => {
        let U = parseInt(serieNumber.slice(0, serieNumber.length / 2));
        let N = parseInt(serieNumber.slice(serieNumber.length / 2, serieNumber.length));
        console.log(U);
        for(let i = 0; i < N; i++) {
            U = bomb(U);
        }
        console.log(U);
    }
};

function bomb(number) {
    number = (number * 13).toString();
    return number.slice(-3);
}