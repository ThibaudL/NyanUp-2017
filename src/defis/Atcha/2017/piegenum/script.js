function searchNumber(numberMax){
		var number = numberMax,
	    result = [];

	    for(var i = 0; i <= number; i++) {
	    	var sNumber = i.toString(),
	    	sum = 0,
	    	output = [];

	    	// console.log(sNumber.length);
	    	for (var j = 0; j < sNumber.length; j++) {
			    output.push(+sNumber.charAt(j));		    
			}

			for (var j = 0, sum = 0; j < output.length; sum += output[j++]);
			
			if(i%7 == 0 && sum == 11) {
			   	result.push(i);
			}
	    }
	

	// for (var i = 0, sum = 0; i < output.length; sum += output[i++]);

	console.log(result);
		// if(i%7 == 0 && )
}


module.exports =  {
    launch : () => {
        searchNumber(1000);
    }
};