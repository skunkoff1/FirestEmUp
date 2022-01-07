import Enemy from "../enemy";
import Bullets from "../bullets";
import Player from "../player";

export default class Boss1 extends Enemy {
    constructor(posX, posY) {
        super(posX, posY, 150, 3, 250);
    }

    shoot() {
        let bullet1 = new Bullets(this.posX, this.posY + 100, true, "down");
        let bullet2 = new Bullets(this.posX - 50, this.posY + 100, true, "down");
        let bullet3 = new Bullets(this.posX + 50, this.posY + 100, true, "down");
        setTimeout(() => {
            let bullet4 = new Bullets(this.posX-100, this.posY, true, "left");
            let bullet10 = new Bullets(this.posX+100, this.posY, true, "right");
            let bullet5 = new Bullets(this.posX-50, this.posY+100, true, "downleft");
            let bullet6 = new Bullets(this.posX+50, this.posY+100, true, "downright");
            Bullets.badBullets.push(bullet4, bullet5, bullet6, bullet10);
        }, 100);
        setTimeout(() => {
            let bullet7 = new Bullets(this.posX, this.posY + 100, true, "down");
            let bullet8 = new Bullets(this.posX - 50, this.posY + 100, true, "down");
            let bullet9 = new Bullets(this.posX + 50, this.posY + 100, true, "down");
            Bullets.badBullets.push(bullet7, bullet8, bullet9);
        }, 200);
        Bullets.badBullets.push(bullet1, bullet2, bullet3);
    }

    addScore() {
        Player.score += 1000;
    }

    push() {
        Enemy.enemyTab[1].push(this);
    }
}