const src = "./src/defis/atcha/2019/Ciceron/in.txt";
const fs = require("fs");
let LINE = [];
let people = [];
const name = 'Elyesa Bazna';

module.exports =  {
    launch : () => {
        const lineReader = require('readline').createInterface({
            input: fs.createReadStream(src)
        });

        lineReader.on('line', (line) => {
            LINE.push(line);
        });

        lineReader.on('close', () => {

            findPeople(name);
        });
    }
};

function findPeople (name) {
    let reg =/[-]/g;
    [...LINE].forEach((group, index) => {
        let groupsplitted = group.split('-');
        if(groupsplitted[0].trim().includes(name)) {
            let newPeopleName = group.replace(name, "").replace(reg, "").trim();

            people.push({
                first: name,
                second: newPeopleName
            });

            findPeople(newPeopleName);
        }
    });
};