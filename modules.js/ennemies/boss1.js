import Enemy from "../enemy";
import Bullets from "../bullets";
import Player from "../player";

export default class Boss1 extends Enemy {
    constructor(posX, posY) {
        super(posX, posY, 150, 3, 250, 10);
    }

    shoot() {
        new Bullets(this.posX, this.posY + 100, true, "down");
        new Bullets(this.posX - 50, this.posY + 100, true, "down");
        new Bullets(this.posX + 50, this.posY + 100, true, "down");
        setTimeout(() => {
            new Bullets(this.posX-100, this.posY, true, "left");
            new Bullets(this.posX+100, this.posY, true, "right");
            new Bullets(this.posX-50, this.posY+100, true, "downleft");
            new Bullets(this.posX+50, this.posY+100, true, "downright");
        }, 100);
        setTimeout(() => {
            new Bullets(this.posX, this.posY + 100, true, "down");
            new Bullets(this.posX - 50, this.posY + 100, true, "down");
            new Bullets(this.posX + 50, this.posY + 100, true, "down");
        }, 200);
    }

    addScore() {
        Player.score += 1000;
    }

    push() {
        Enemy.enemyTab[1].push(this);
    }
}