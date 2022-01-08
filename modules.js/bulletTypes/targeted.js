import Bullets from "../bullets";

export default class Targeted extends Bullets {
    constructor(posX, posY, enemy, target) {
        super(posX, posY, enemy);
        this.target = target;
        this.getVector();
        console.log(this.vector);
        
    }

    move() {
        
        this.posX += this.vector*Math.floor(Math.sqrt(Math.pow(this.speed,2)/Math.pow(this.vector+1,2)));
        
        this.posY += Math.floor(Math.sqrt(Math.pow(this.speed,2)/Math.pow(this.vector+1,2)));
    }

    getVector() {
        
        this.vector = (this.target.posX-this.posX) / (this.target.posY-this.posY);
        
    }
}
