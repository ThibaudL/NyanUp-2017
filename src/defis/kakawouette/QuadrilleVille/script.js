const STREET_TYPES = {
    N: {
        directions: ['E', 'S', 'W']
    },
    NE: {
        directions: ['S', 'W']
    },
    NW: {
        directions: ['S', 'E'
        ]
    },
    E: {
        directions: ['N', 'S', 'W']
    },
    SE: {
        directions: ['N', 'W']
    },
    W: {
        directions: ['N', 'E', 'S']
    },
    S: {
        directions: ['N', 'E', 'W']
    },
    SW: {
        directions: ['E', 'N']
    },
    C: {
        directions: ['N', 'E', 'S', 'W']
    }
};

const WIDTH = 99;
const NB_REPET = 1000;
const START = 50;

class City {
    constructor() {
        this.intersections = []
        this.currentAvenue = START;
        this.currentRue = START;
        this.numberVisited = 0;
        this.minRue = WIDTH;
        this.maxRue = 0;
        this.minAvenue = WIDTH;
        this.maxAvenue = 0;
    }

    addIntersection(avenue, rue, value, type) {
        this.intersections[avenue] = this.intersections[avenue] || [];
        this.intersections[avenue][rue] = new Intersection(value, type);
    }

    getIntersection(avenue, rue) {
        return this.intersections[avenue][rue];
    }

    run(countDown){
        if(this.currentAvenue > this.maxAvenue){
            this.maxAvenue = this.currentAvenue;
        }
        if(this.currentAvenue < this.minAvenue){
            this.minAvenue = this.currentAvenue;
        }
        if(this.currentRue > this.maxRue){
            this.maxRue = this.currentRue;
        }
        if(this.currentRue < this.minRue){
            this.minRue = this.currentRue;
        }
        const intersection = this.getIntersection(this.currentAvenue, this.currentRue);
        if(!intersection.visited){
            this.numberVisited++;
        }
        switch(intersection.current){
            case 'N' :
                this.currentAvenue--;
                break;
            case 'E' :
                this.currentRue++;
                break;
            case 'S' :
                this.currentAvenue++;
                break;
            case 'W' :
                this.currentRue--;
                break;
        }
        intersection.turnIntersection();
        intersection.visited = true;

        countDown--;
        if(countDown>=0) {
            this.run(countDown);
        }
    }
}

class Intersection {
    constructor(current, type) {
        this.current = current;
        this.type = type;
    }

    turnIntersection() {
        let currentIdx = this.type.directions.indexOf(this.current);
        this.current = currentIdx >= this.type.directions.length-1 ? this.type.directions[0] : this.type.directions[currentIdx+1];
        return this;
    }


}

module.exports = {
    launch: () => {
        const lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('src/defis/kakawouette/QuadrilleVille/data.txt')
        });

        const city = new City();

        let avenue = 1;
        lineReader.on('line', (line) => {
            if (avenue === 1) {
                for (let rue = 0; rue <= WIDTH-1; rue++) {
                    if (rue === 0) {
                        city.addIntersection(avenue, rue+1, line[rue], STREET_TYPES.NW);
                    } else if (rue === WIDTH-1) {
                        city.addIntersection(avenue, rue+1, line[rue], STREET_TYPES.NE);
                    } else {
                        city.addIntersection(avenue, rue+1, line[rue], STREET_TYPES.N);
                    }
                }
            } else if (avenue === WIDTH) {
                for (let rue = 0; rue <= WIDTH-1; rue++) {
                    if (rue === 0) {
                        city.addIntersection(avenue, rue+1, line[rue], STREET_TYPES.SW);
                    } else if (rue === WIDTH-1) {
                        city.addIntersection(avenue, rue+1, line[rue], STREET_TYPES.SE);
                    } else {
                        city.addIntersection(avenue, rue+1, line[rue], STREET_TYPES.S);
                    }
                }
            } else {
                for (let rue = 0; rue <= WIDTH-1; rue++) {
                    if (rue === 0) {
                        city.addIntersection(avenue, rue+1, line[rue], STREET_TYPES.W);
                    } else if (rue === WIDTH-1) {
                        city.addIntersection(avenue, rue+1, line[rue], STREET_TYPES.E);
                    } else {
                        city.addIntersection(avenue, rue+1, line[rue], STREET_TYPES.C);
                    }
                }
            }
            avenue++;
        });

        lineReader.on('close', () => {
            city.run(NB_REPET);
            console.log(`${city.numberVisited}, ${city.minRue}, ${city.maxRue}, ${city.minAvenue}, ${city.maxAvenue}`);
        })
    }
};