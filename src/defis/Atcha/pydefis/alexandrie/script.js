var chaine = "RTHIJCUPXIIGTHBTRDCCJFJTCDJHETCHDCHKDJHGTKTATGSPCHATEGTHTCISDRJBTCI-XACTHPVXIEPHIDJIHXBEATBTCISTGTKTATGRDBBTCIATANRPDCPARTHITUJIKPXCRJEPGWTGRJATCXRDBBTCIRTAJX-RXSTAXKGPEGDBTIWTT-RTHIJCUPXIQXTCEAJHBTRDCCJFJXHTGPGTKTATSPCH-ATGDBPCSJQXVQPCV-ATUPBTJMDJKGPVTST-HXCVW-PBXIGDJKTRTIGTHDGTIDJKGTAT-IJSTRDJKGXGPHFJXTHIATIGTXOXTBTTCCTBXSWTGRJAT";
var decallage = 1;
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var result = "";
var n = 0;

module.exports =  {
    launch : () => {
        exercice();
    }
};

exercice = function() {
	while(result.indexOf("HERCULE") === -1)
	{
		result = "";
		for (var i = 0; i < chaine.length; i++) {
			for (var j = 0; j < alphabet.length; j++) {
					if(chaine[i] == alphabet[j])
					{
						n = j+decallage;
						if(j+decallage >= alphabet.length)
						{
							n = ((j+decallage) - (alphabet.length));
						}
						
						result += (alphabet[n]);
					}
			};
			
		};
		decallage++;
	};
	console.log(alphabet.length);

	console.log(decallage);
	console.log(result);
	
	if(result.indexOf("HERCULE") > -1)
	{
	}
}
