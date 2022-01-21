import Enemy from "../enemy";
import Bullets from "../bullets";


export default class Corvete extends Enemy {
    constructor(posX, posY) {
        super(posX, posY, 70, 4, 100, 10);
        this.value = 450;
    }

    shoot() {
        new Bullets(this.posX, this.posY + 35, true, "down");
        new Bullets(this.posX - 15, this.posY + 35, true, "downleft");
        new Bullets(this.posX + 15, this.posY + 35, true, "downright");
    }
}