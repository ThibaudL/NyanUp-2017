let x = 930,
    y = 321,
    z = 967;
module.exports =  {
    launch : () => {
        while(10 * x > y) {
            x = (y * z) % 10000;
            y = (3 * z) % 10000;
            z = (7 * z) % 10000;
        }

        console.log(x, y, z);
    }
};