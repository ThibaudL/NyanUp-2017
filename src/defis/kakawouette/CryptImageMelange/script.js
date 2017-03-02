const ndOps = require("ndarray-ops");
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');
const SLICES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
const IN = "./src/defis/kakawouette/cryptimagemelange/in.png";
const OUT = "./src/defis/kakawouette/cryptimagemelange/out.png";

function computeSens(sens){
    if(sens === 'H'){
        return sens = 'V';
    }else{
        return sens = 'H';
    }
}

module.exports =  {
    launch : () => {
        let sens = computeSens();

        getPixels(IN, function(err, pixels) {
            const width = pixels.shape[0];
            const height = pixels.shape[1];

            const first = pixels.lo(0,0).hi(20,height);
            // first.shape[0] = width;
            // console.log(first);
            const second = pixels.lo(20,0).hi(30,height);
            second.shape[0] = width;
            // console.log(second);
            // ndOps.assigns(pixels,0);
            // ndOps.add(
            //     pixels,
            //     second,
            //     first
            // );


            savePixels(second, "png").pipe(process.stdout);
        })

    }
};
