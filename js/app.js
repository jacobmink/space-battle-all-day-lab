const alienArr = [];

class Ship {
    constructor(hull,firepower,accuracy) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
}

class AlienShip extends Ship {
    constructor(hull,firepower,accuracy){
        super(hull,firepower,accuracy);
    }
    attack(){
        if (this.accuracy > Math.random()) {
           ussAssembly.hull -= this.firepower;
           console.log('Those slimy shits scored a hit!');
        }
        else {
            console.log('They missed!');
        }
    }
}

class OurShip extends Ship {
    constructor(hull,firepower,accuracy){
        super(hull,firepower,accuracy);
    }
    attack(){
        if (this.accuracy > Math.random()) {
            alienArr[0].hull -= this.firepower;
            console.log('Good shot, Red 2!');
         }
         else {
             console.log('You missed!');
         }
    }
}

for (let i = 0; i < 6; i++){
    let randHull = Math.floor(Math.random()*3 + 3);
    let randFire = Math.floor(Math.random()*2 + 2);
    let randAcc = (Math.random()*.2 + .6).toFixed(2);
    console.log(randAcc,randFire,randHull);
    alienArr.push(new AlienShip(randHull,randFire,parseFloat(randAcc)));
}

const ussAssembly = new OurShip(20,2,.7);

const arena = {
    round: 1,
    gameInAction: true,
    aliensLeft: alienArr.length,
    ourHull: ussAssembly.hull,
    // alienHull: alienArr[0].hull,
    runGame(){
        this.battle();
        // console.log(this.gameInAction);
        this.gameOver();
    },//end of function
    fightOrFlight(){
        let userInput = prompt('Fight or Flight??');
        if (userInput == 'fight'){
            this.battle();
            // ussAssembly.attack();
        }else if (userInput == 'flight') {
            this.gameInAction = false;
            console.log('Game Over. You fucking coward.');
            
        }
    },
    gameOver(){
        if (this.gameInAction == false){
            console.log('%c Game over!', 'font-size: 30px; color: red');
        }
        
    },
    battle(){
        while (ussAssembly.hull > 0 && this.gameInAction == true && this.aliensLeft > 0) {
                        console.log(`%c \nRound: ${this.round}`, 'font-size: 40px');
                        ussAssembly.attack();
                        if (alienArr[0].hull > 0) {
                            console.log(`This alien's hull: ${alienArr[0].hull}`);
                            alienArr[0].attack();   
                            console.log(`Aliens left: ${this.aliensLeft}`);
                            if (ussAssembly.hull <= 0){
                                ussAssembly.hull = 'gone :(';
                                console.log('You lost, you idiot.');
                                this.gameInAction = false;
                            }
                            console.log(`Your hull: ${ussAssembly.hull}`);
                            this.round += 1;
                        } else {
                            this.round += 1;
                            console.log('You killed him!');
                            alienArr.splice(0,1);
                            this.aliensLeft -= 1;
                            console.log(`Aliens left: ${this.aliensLeft}`);
                            if (this.aliensLeft == 0){
                                console.log('You killed all those fuckers!');
                                this.gameInAction = false;
                            } else {
                                this.fightOrFlight();
                            }
                        } //end of else statement
                    }//end of while loop
    }

}


arena.runGame();