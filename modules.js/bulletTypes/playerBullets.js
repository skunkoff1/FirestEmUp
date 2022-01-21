import Bullets from "../bullets";


export default class PlayerBullets extends Bullets {
    constructor(posX, posY, enemy, direction) {
        super(posX, posY, enemy, direction);
        this.speed = 15;
    }
}