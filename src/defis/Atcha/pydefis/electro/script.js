const fetch = require('node-fetch');
const HttpsProxyAgent  = require('https-proxy-agent');
// const logger = require("../../../../utils/logger");

const FIRST_URL = "https://callicode.fr/pydefis/UrlElectro/code/A1aA0EefCC";

function searchUrl(url){
    fetch(url, { agent: agent})
        .then((response) => response.text())
        .then((text) => {
            console.log(text);
            text.split(' ').forEach((potentialUrl) => {
                if(potentialUrl.startsWith('http')){
                    searchUrl(potentialUrl);
                }
            })
        });
}

module.exports =  {
    launch : () => {
        searchUrl(FIRST_URL);
    }
};
