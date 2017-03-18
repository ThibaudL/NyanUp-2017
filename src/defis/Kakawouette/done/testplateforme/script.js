const fetch = require('node-fetch');
const FormData = require('form-data');

const FIRST_URL = "https://codingup.univ-poitiers.fr/gopoke/ExempleURL/get/kakawouette/f967a";
const POST = "https://codingup.univ-poitiers.fr/gopoke/ExempleURL/post/kakawouette/f967a";
function searchUrl(url){
    fetch(url)
        .then((response) => response.text())
        .then((text) => {
            console.log(text)
            const message = text.split('\n');
            console.log(message);

            const body = JSON.stringify({
                sig: message[0],
                rep: Number(message[1]) + Number(message[2])
            });
            console.log(body)


            const form = new FormData();
            form.append('sig', message[0]);
            form.append('rep',Number(message[1]) + Number(message[2]));

            fetch(POST, {
                method: 'POST',
                body: form
            })
            .
            then((response) => response.text())
                .then((text) => {
                    console.log(text)
                });
        });
}


module.exports =  {
    launch : () => {
        searchUrl(FIRST_URL);
    }
};