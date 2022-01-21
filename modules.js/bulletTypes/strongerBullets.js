import Bullets from "../bullets";


export default class StrongerBullets extends Bullets {
    constructor(posX, posY, enemy, direction) {
        super(posX, posY, enemy, direction);
        this.speed = 45;
        this.onHit = 10;
    }
}