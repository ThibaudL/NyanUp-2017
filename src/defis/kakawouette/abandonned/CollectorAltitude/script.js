const math = require('mathjs');

class CollectorAltitude{
    constructor(entry){
        this.entry = entry;
        this.altitude = 0;
        this.max = 0;
        this.min = 0;
        this.output = [];
    }

    getFirst(){
        return this.entry[0];
    }

    getLast(){
        return this.entry[this.entry.length-1];
    }

    popFirst(){
        this.entry.splice(0,1);
    }

    popLast(){
        this.entry.splice(this.entry.length-1,1);
    }

    getNewValue(value){
        return this.altitude + value;
    }


    calcul(){
        console.log(this.entry);
        console.log(this.output);
        while(this.entry.length){
            if(math.abs(this.getNewValue(this.getFirst())) <= math.abs(this.getNewValue(this.getLast()))){
                this.output.push(this.getFirst())
                this.popFirst();
                console.log("poping first");
            }else{
                this.output.push(this.getLast())
                this.popLast();
                console.log("poping last");
            }
            console.log(this.entry);
            console.log(this.output);
        }
    }
}

module.exports =  {
    launch : () => {
        const collector = new CollectorAltitude([-3, 4, 1, -6, 4, -1, -2]);
        collector.calcul();
    }
};