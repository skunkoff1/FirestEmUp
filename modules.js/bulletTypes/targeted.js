import Bullets from "../bullets";

export default class Targeted extends Bullets {
    constructor(posX, posY, enemy, target) {
        super(posX, posY, enemy);
        this.target = target;
        this.getVector();    
    }

    move() {
        this.posX += this.movX;
        this.posY += this.movY;
    }

    getVector() {
        let vX = this.target.posX-this.posX;
        let vY = this.target.posY-this.posY;

        let l = Math.sqrt(vX*vX+vY*vY);

        this.movX = vX / l * this.speed;
        this.movY = vY / l * this.speed;
    }
}
