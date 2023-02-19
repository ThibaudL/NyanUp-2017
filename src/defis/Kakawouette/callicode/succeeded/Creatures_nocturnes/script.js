
module.exports = {
    launch: () => {
        let chauvesSouris = 0;
        let skellingtons = 0;
        let zombies = 0;
        let fantomes = 0;
        let killsChauvesSouris = 2;
        let killsSkellingtons = 1;
        let killsZombies = 1;
        let killsFantomes = 1;

        for (let i = 1; i <= (50 * 60); i++) {
            if (i % 2 === 0) {
                chauvesSouris += 10;
                console.log(`Ca fait 2 secondes ${i}secondes ${i/60}minutes => on ajoute 10 chauves souries ${chauvesSouris},${skellingtons},${zombies},${fantomes}`)
            }
            if (i % 5 === 0) {
                skellingtons += 5;
                console.log(`Ca fait 5 secondes ${i}secondes ${i/60}minutes => on ajoute 5 skellingtons ${chauvesSouris},${skellingtons},${zombies},${fantomes}`)
            }
            if (i % 6 === 0) {
                zombies += 4;
                console.log(`Ca fait 6 secondes ${i}secondes ${i/60}minutes => on ajoute 4 zombies ${chauvesSouris},${skellingtons},${zombies},${fantomes}`)
            }
            if (i % 10 === 0) {
                fantomes += 3;
                console.log(`Ca fait 10 secondes ${i}secondes ${i/60}minutes => on ajoute 3 fantomes ${chauvesSouris},${skellingtons},${zombies},${fantomes}`)
            }
            if (i % 6 === 0) {
                chauvesSouris -= killsChauvesSouris;
            }
            if (i % 20 === 0) {
                skellingtons -= killsSkellingtons;
            }
            if (i % 30 === 0) {
                zombies -= killsZombies;
            }
            if (i % 40 === 0) {
                fantomes -= killsFantomes;
            }
            if (i % (4 * 60) === 0) {
                killsChauvesSouris += 2;
                killsSkellingtons += 1;
                killsZombies += 1;
                killsFantomes += 1;
                console.log(`it's been 4 minutes ${i/60} => ${killsChauvesSouris},${killsSkellingtons},${killsZombies},${killsFantomes}`)
            }

            console.log(`${chauvesSouris}, ${skellingtons}, ${zombies}, ${fantomes}`)
        }
    }
}
;