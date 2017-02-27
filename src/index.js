const numbers = require('numbers');
const figlet = require('figlet');
const clear = require('clear');
const chalk = require('chalk');
const Inquirer = require('Inquirer');
const fs = require('fs');

clear();
console.log(
    chalk.yellow(
        figlet.textSync('NyanUp - 2017', {horizontalLayout: 'full'})
    )
);

function searchForScript(path){
    Inquirer.prompt({
        name: 'defis',
        type: 'list',
        message: 'Quel défis souhaitez vous lancer : ',
        choices: fs.readdirSync(path)
    }).then((aDefis) => {
        fs.exists(`${path}/${aDefis.defis}/script.js`, function(exists){
           if(exists){
               console.log("Exist : "+`${path}/${aDefis.defis}/script.js`)
               const launcher = require(`${path}/${aDefis.defis}/script.js`.replace('./src','./'));
               launcher.launch();
           }else{
               console.log("Doesn't Exist : "+`${path}/${aDefis.defis}/script.js`)
               searchForScript(`${path}/${aDefis.defis}`)
           }
        });
    });
}


searchForScript('./src/defis');




