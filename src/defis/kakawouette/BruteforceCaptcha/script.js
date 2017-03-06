var fetch = require('node-fetch');

module.exports =  {
    launch : () => {
        fetch('https://thomasknappba.wordpress.com/2014/01/15/post-crit-final-designs')
        .then(function(res) {
            var dest = fs.createWriteStream('./octocat.png');
            res.body.pipe(dest);
        });
        console.log('this is the sample')
    }
};