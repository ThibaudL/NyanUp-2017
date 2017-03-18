const fetch = require('node-fetch');
const logger = require("../../../../utils/logger");

const FIRST_URL = "https://callicode.fr/pydefis/UrlElectro/code/A1aA0EefCC";

function searchUrl(url){
    fetch(url)
    .then((response) => response.text())
    .then((text) => {
        logger.info(text);
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