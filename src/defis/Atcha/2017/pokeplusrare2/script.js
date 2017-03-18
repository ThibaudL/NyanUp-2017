function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

module.exports =  {
    launch : () => {
        const lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('src/defis/atcha/doing/file.txt')
        });


        let lineCount = 1
        let total = 0;
        let unique = "";
        let pokeColumn = [];
        let pokeResult = [];
        let coordinates = "";
        let pokemons = [];
        let count = 0;
        lineReader.on('line', (line) => {
        	// console.log(line);
            pokeColumn = line.split(",");
            pokemons.push(pokeColumn[0]);
            // console.log(pokeColumn[0]);
            
            // for(column = 1 ; column <= line.length ; column++){

            // 	// pokeColumn = line[column-1].split(", ");
            // 	// console.log(pokeColumn[0]);
            // 	console.log(line[column-1]);
                
            // }
            // lineCount++;
            // console.log(pokemons);
        });

        // console.log(pokeColumn);

        // unique = pokemons.filter(onlyUnique);

        // console.log(unique);

        lineReader.on('close', () => {
        	// unique = pokemons.filter(onlyUnique);
        	pokemons.sort();
        	// console.log(pokemons);

        	for(var i = 0 ; i < pokemons.length ; i++){

        		if(unique != pokemons[i] )
        		{
        			pokeResult.push(unique, count);
        			count = 0;
        		}
        		else
        		{
        			count++;
        		}
        		unique = pokemons[i];
        	}


            console.log(pokeResult);
        });
    }
};