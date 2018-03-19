let number = 1000;
let result = '';
module.exports =  {
    launch : () => {
        for(let i = 1; i <= number; i++) {
            let digits = (""+i).split("");
            let old = 0;
            let sum = 0;
            digits.forEach((digit) => {
                sum += parseInt(digit);
            });

            console.log(digits, sum);

            if(i%7 == 0 && sum === 11) {
                result += i + ',';
            }
        }
        console.log(result);
    }
};