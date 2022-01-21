import Enemy from "../enemy";
import Player from "../player";
import Bullets from "../bullets";


export default class Speeder extends Enemy {
    constructor(posX, posY) {
        super(posX, posY, 30, 5, 10, 3);
        this.value = 120;
    }

    damage(x) {
        this.hp -= x;
        this.speed += x;
        if(this.hp <= 0) {
            Player.getInstance().addScore(this.value);
            this.delete();
        }
    }

    shoot() {
        new Bullets(this.posX, this.posY, true, "down");
        setTimeout(() => {
            new Bullets(this.posX, this.posY, true, "down");
        }, 200);
    }
}