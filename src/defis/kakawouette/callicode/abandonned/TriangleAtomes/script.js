module.exports =  {
    launch : () => {
        const lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('src/defis/kakawouette/triangleatomes/in.txt')
        });

        lineReader.on('line', (line) => {
            console.log(line.trim())
        });
    }
};