var algebra = require('algebra.js');
var Expression = algebra.Expression;
var Equation = algebra.Equation;


module.exports =  {
    launch : () => {
        let b = 0;
        let r = 0;
        let n =0;

        let left = algebra.parse("b+r+n/1brn");
        let right = algebra.parse("1/177");
        var equation = new Equation(left,right);

        console.log(equation.toString());
        console.log(equation.solveFor("b").toString());
        console.log(equation.solveFor("r").toString());
        //console.log(equation.solveFor("n").toString());

        b+r+n ==  b*r*n/ 777;
        b+r+n/(b*r*n) === 1/777
    }
};