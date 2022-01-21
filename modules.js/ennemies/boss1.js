import Enemy from "../enemy";
import Bullets from "../bullets";
import Player from "../player";
import Minion from "./minion";
import Targeted from "../bulletTypes/targeted";
import SideCannon from "../items/sideCanon";
import { boss1Patterns } from "../assets/patterns";
import Minigun from "../items/minigun";

export default class Boss1 extends Enemy {
    constructor(posX, posY) {
        super(posX, posY, 150, 3, 25, 10);
        this.value = 1000;
        this.phase = 1;
        this.threshold = this.hp / 2;
        this.pattern = boss1Patterns;
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
            new Targeted(this.posX - 50, this.posY + 100, true, Player.getInstance().posX, Player.getInstance().posY);
            new Targeted(this.posX + 50, this.posY + 100, true, Player.getInstance().posX, Player.getInstance().posY);
            setTimeout(() => {
                new Targeted(this.posX - 50, this.posY + 100, true, Player.getInstance().posX, Player.getInstance().posY);
                new Targeted(this.posX + 50, this.posY + 100, true, Player.getInstance().posX, Player.getInstance().posY);
            }, 200);
        }   
    }

    damage(x) {
        this.hp -= x;
        if (this.hp <= this.threshold) {
            this.phaseUp();
        }
        if (this.hp == 0) {
            Player.getInstance().addScore(this.value);
            Player.getInstance().attackSpeed *= 1.5;
            new SideCannon(450, 70);
            new Minigun(750,70);
            this.delete();  
        }
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