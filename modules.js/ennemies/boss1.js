import Enemy from "../enemy";
import Bullets from "../bullets";
import Player from "../player";
import Minion from "./minion";
import Targeted from "../bulletTypes/targeted";

let scoreDisplay = document.getElementById('score');

export default class Boss1 extends Enemy {
    constructor(posX, posY) {
        super(posX, posY, 150, 3, 250, 10);
        this.value = 1000;
        this.phase = 1;
        this.threshold = this.hp / 2;
    }

    shoot() {
        if (this.phase == 1) {
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
        } else {
            new Targeted(this.posX - 50, this.posY + 100, true, Player.getInstance());
            new Targeted(this.posX + 50, this.posY + 100, true, Player.getInstance());
            setTimeout(() => {
                new Targeted(this.posX - 50, this.posY + 100, true, Player.getInstance());
                new Targeted(this.posX + 50, this.posY + 100, true, Player.getInstance());
            }, 200);
        }   
    }

    damage() {
        this.hp -= 1;
        if (this.hp <= this.threshold) {
            this.phaseUp();
        }
        if (this.hp == 0) {
            this.addScore();
            scoreDisplay.innerHTML = Player.score;
            this.delete();  
        }
    }

    push() {
        Enemy.enemyTab[1].push(this);
    }

    phaseUp() {
        this.phase += 1;
        if (this.phase == 2) {
            this.spawnGuard();
        }
    }

    spawnGuard() {
        new Minion(200, 60);
        new Minion(400, 60);
        new Minion(600, 60);
        new Minion(800, 60);
        new Minion(1000, 60);
    }
}