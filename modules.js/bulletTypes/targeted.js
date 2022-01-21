import Bullets from "../bullets";

export default class Targeted extends Bullets {
    constructor(posX, posY, enemy, targetX, targetY) {
        super(posX, posY, enemy);
        this.targetX = targetX;
        this.targetY = targetY;
        this.getVector();    
    }

    move() {
        this.posX += this.movX;
        this.posY += this.movY;
    }

    getVector() {
        let vX = this.targetX-this.posX;
        let vY = this.targetY-this.posY;

        let l = Math.sqrt(vX*vX+vY*vY);

        this.movX = vX / l * this.speed;
        this.movY = vY / l * this.speed;
    }
}
