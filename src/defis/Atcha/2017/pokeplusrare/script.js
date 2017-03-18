function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function find_unique_brute(array) {
  var result = null, n = array.length;

  for (var i = 0; i < n; i++) {
    for (var j = i; j < n; j++) {
      if (array[i] != array[j]) {
        result = array[i];
      }
    }
  }

  return result;
}

function find_unique_hash(array) {
  var n = array.length;
  var hash = {}, result = null;

  for (var i = 0; i < n; i++) {
    if (array[i] in hash) {
      hash[array[i]] += 1;
    } else {
      hash[array[i]] = 1;
    }
  }

  for (var j in hash) {
    if (hash[j] == 1) {
      result = j;
    }
  }

  return result;
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
        let coordinates = "";
        let pokemons = [];
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
        	// pokemons.sort();


            console.log(find_unique_hash(pokemons));
        });
    }
};