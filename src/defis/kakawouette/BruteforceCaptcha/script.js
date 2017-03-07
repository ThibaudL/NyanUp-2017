const fetch = require('node-fetch');
const assert = require('assert');

function myTest(){
    return true;
}

describe('BruteforceCaptcha', function() {
    describe('myTest()', function() {
        it('should return true', function() {
            assert.equal(true,myTest());
        });
    });
});


module.exports =  {
    launch : () => {
        // fetch('https://thomasknappba.wordpress.com/2014/01/15/post-crit-final-designs')
        // .then(function(res) {
        //     var dest = fs.createWriteStream('./octocat.png');
        //     res.body.pipe(dest);
        // });
        console.log('this is the sample')

    }
};