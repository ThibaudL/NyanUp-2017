var algebra = require('algebra.js');
var Expression = algebra.Expression;
var Equation = algebra.Equation;


module.exports =  {
    launch : () => {
        let x=997,y=312,z=663;
        while( 10 * x > y) {
        x = (y * z) % 10000
        y = (3 * z) % 10000
        z = (7 * z) % 10000
        console.log(`${x},${y},${z}`)
        }
    }
};