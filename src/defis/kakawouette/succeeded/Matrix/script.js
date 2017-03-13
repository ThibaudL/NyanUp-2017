module.exports =  {
    launch : () => {
        const lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('src/defis/kakawouette/doing/matrix/in.txt')
        });


        let lineCount = 1
        let total = 0;
        lineReader.on('line', (line) => {
            for(column = 1 ; column <= line.length ; column++){
                if(line[column-1] !== ' ') {
                    total += column * lineCount * line.charCodeAt(column - 1);
                    console.log(lineCount ,column, line.charCodeAt(column - 1))
                }
            }
            lineCount++;
        });

        lineReader.on('close', () => {
            console.log(total);
        });
    }
};