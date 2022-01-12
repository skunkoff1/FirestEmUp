import Bullets from "../bullets";

export default class Targeted extends Bullets {
    constructor(posX, posY, enemy, target) {
        super(posX, posY, enemy);
        this.target = target;
        this.getVector();
        console.log(this.vector);
        
    }

    move() {
        let d = Math.floor(Math.sqrt(Math.pow(this.speed,2)/Math.pow(this.vector+1,2)))
        if (d < this.speed/3) {
            d = this.speed/3;
        } else if (d > this.speed*2) {
            d = this.speed * 2;
        }

        this.posX += this.vector*d;
        
        this.posY += d;
    }

    getVector() {
        
        this.vector = (this.target.posX-this.posX) / (this.target.posY-this.posY);
        
    }
}

/*
WorkInProgress : improved target algorithm

angle = Math.atan2(this.target.posY - this.posY, this.target.posX - this.posX) * 180 / Math.PI;

if (Player.getInstance.posX < this.posX) {

} else {

}

vX = this.speed*Math.cos(angle);
vY = this.speed*Math.sin(angle);

this.posX += vX;
this.posY += vY;










*/