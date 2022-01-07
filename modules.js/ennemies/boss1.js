import Enemy from "../enemy";
import Bullets from "../bullets";
import Player from "../player";

export default class Boss1 extends Enemy {
    constructor(posX, posY) {
        super(posX, posY, 150,4,250);
    }

    shoot() {
        let bullet1 = new Bullets(this.posX, this.posY+100, true, "down");
        let bullet2 = new Bullets(this.posX-50, this.posY+100, true, "down");
        let bullet3 = new Bullets(this.posX+50, this.posY+100, true, "down");
        Bullets.badBullets.push(bullet1, bullet2, bullet3);
    }

    addScore() {
        Player.score += 990;
    }

    push() {
        Enemy.enemyTab[1].push(this);
    }
}