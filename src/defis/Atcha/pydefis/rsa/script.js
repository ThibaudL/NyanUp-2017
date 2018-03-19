module.exports =  {
    launch : () => {
        exercice();
    }
};


exercice = function() {
	var NodeRSA = require('node-rsa');
	var encrypted = "xh8rFh3hSd5sS3Ps9XGDPEgvnXKmeG7BfOm62twEOtz4NMzakyaJdAIp99fGD2swdQfEJapIJx3VqSMTUNGKsw==";
	var key = new NodeRSA("-----BEGIN PUBLIC KEY-----MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANiHUOoN3IF6od+yroMEjQoXQP0cUsb55PnYbzG3qpzdrCKj3NUw640Cl9GJQT1Od+4Rfawkboh78RI6OI/EeGkCAwEACw==-----END PUBLIC KEY-----");
	var decrypted = key.decrypt(encrypted, 'utf8');
	console.log('decrypted: ', decrypted);
}