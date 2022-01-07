import Entity from './entity';
import Bullets from './bullets';
import Player from './player';
import patterns from './assets/patterns';

let scoreDisplay = document.getElementById('score');

class Enemy extends Entity {
    static count = 0;
    static enemyTab = [];
    constructor(posX, posY, hp) {
        super(posX, posY, 25, 10);
        this.hp = hp;
        this.id = Enemy.count;
        Enemy.count ++;
        Enemy.enemyTab.push(this);
        this.currentMove = null;
        this.getNextMove();
    }

    shoot() {
        let bullet = new Bullets(this.posX, this.posY, true, "down");
        Bullets.badBullets.push(bullet);
    }

    getNextMove() {
        if (this.currentMove == null || this.currentMove.length <= this.state) {
            this.state = 0;
            this.currentMove = patterns[Math.floor(Math.random(patterns.length))];
        }
        this.move(currentMove([this.state]));
        this.state ++;
    }

    damage() {
        this.hp -= 1;
        if (this.hp == 0) {
            Player.score += 1;
            scoreDisplay.innerHTML = Player.score;
            this.delete();
            console.log(Enemy.enemyTab);    
        }
    }

    delete() {
        for (let i = 0; i<Enemy.enemyTab.length;i++) {
            if(this.id == Enemy.enemyTab[i].id) {
                Enemy.enemyTab.splice(i,1);
            }
        }
    }
}

export default Enemy;