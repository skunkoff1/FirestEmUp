import Entity from './entity';
import Bullets from './bullets';
import Player from './player';

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
        console.log("count = "+Enemy.count);
    }

    shoot() {
        let bullet = new Bullets(this.posX, this.posY, true, "down");
        Bullets.badBullets.push(bullet);
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