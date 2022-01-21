import { boss2Patterns } from "../assets/patterns";
import Targeted from "../bulletTypes/targeted";
import Enemy from "../enemy";
import Entity from "../entity";
import Player from "../player";


export default class Boss2 extends Enemy {
    constructor(posX) {
        super(posX, 101, 100, 9, 180, 10);
        this.value = 2000;
        this.phase = 1;
        this.threshold = this.hp / 2;
        this.pattern = boss2Patterns;
        this.getNextMove();
    }

    shoot() {
        
        for(let i = 0; i<= 5; i++) {
            setTimeout(() => {
                if (this.posX > Entity.canvas.width /2) 
                {
                    new Targeted(this.posX, this.posY, true, Entity.canvas.width*(i/5), Entity.canvas.height);
                } 
                else 
                {
                    new Targeted(this.posX, this.posY, true, Entity.canvas.width - Entity.canvas.width*(i/5), Entity.canvas.height);
                }  
            },i*60);
        }

        setTimeout(() => {
            new Targeted(this.posX, this.posY, true, Player.getInstance().posX, Player.getInstance().posY);
        }, 400);
    }

    damage(x) {
        this.hp -= x;
        if (this.hp <= this.threshold) {
            this.phaseUp();
        }
        if (this.hp == 0) {
            Player.getInstance().addScore(this.value);
            Player.getInstance().attackSpeed *= 1.5;
            this.delete();  
        }
    }

    phaseUp() {

    }
}