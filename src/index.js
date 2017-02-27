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


Inquirer.prompt({
    name: 'defis',
    type: 'list',
    message: 'Quel défis souhaitez vous lancer : ',
    choices: fs.readdirSync('./src/defis')
}).then((aDefis) => {
    const launcher = require(`./defis/${aDefis.defis}/script.js`);
    launcher.launch();
});

