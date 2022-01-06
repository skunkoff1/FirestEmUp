import Entity from './entity';
import Bullets from './bullets';

class Enemy extends Entity {

    static enemyTab = [];
    constructor(posX, posY, hp) {
        super(posX, posY, 25, 10);
        this.hp = hp;
        Enemy.enemyTab.push(this);
    }

    shoot() {
        new Bullets(this.posX, this.posY, true, "down");
    }

    damage() {
        this.hp -= 1;
        if (this.hp = 0) {
            deleteEnemy(this);
        }
    }

    deleteEnemy(racaille) {
        for (let i = 0; i<Enemy.enemyTab.length;i++) {
            if(racaille === Enemy.enemyTab[i]) {
                Enemy.enemyTab.splice(i,1);
            }
        }
    }
}

export default Enemy;