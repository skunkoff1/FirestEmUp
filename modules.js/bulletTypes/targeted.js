import Bullets from "../bullets";

export default class Targeted extends Bullets {
    constructor(posX, posY, enemy, target) {
        super(posX, posY, enemy);
        this.target = target;
        this.getVector();
        console.log(this.vector);
        
    }

    move() {
        if (this.vector < 0) {
            this.posX -= Math.floor(Math.sqrt(Math.pow(this.speed,2)/Math.abs(this.vector)+1));
            console.log("left : "+this.posX);
        } else {
            this.posX += Math.floor(Math.sqrt(Math.pow(this.speed,2)/this.vector+1));
        }
        this.posY += this.vector*Math.floor(Math.sqrt(Math.pow(this.speed,2)/this.vector+1));
    }

    getVector() {
        if (this.target.posX<this.posX) {
            this.vector = (this.posX - this.target.posX) / (this.posY - this.target.posX);
        } else {
            this.vector = (this.target.posY-this.posY) / (this.target.posX-this.posX);
        }
    }
}
