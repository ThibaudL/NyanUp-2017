let E,
    V,
    ET,
    VT,
    i = 0,
    halfResult = 0;
module.exports =  {
    launch : () => {
        ET = 0;
        VT = 0;
        while(ET < 70) {
            E = 3 - 0.005 * VT;
            V = 8 * E;
            ET += E;
            VT += V;
            if(ET === 35) {
                halfResult = i;
            }
            i++;
            console.log(ET, VT);
        }

        console.log(halfResult,i);
    }
};