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
