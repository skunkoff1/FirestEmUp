import Entity from './entity';
import Bullets from './bullets';
import Player from './player';
import patterns from './assets/patterns';


let scoreDisplay = document.getElementById('score');

class Enemy extends Entity {
    static count = 0;
    static enemyTab = [
        [], // minions subArray
        [], // snipers subArray
        [] // boss subArray
    ];
    constructor(posX, posY,radius, speed, hp, onHit) {
        super(posX, posY);
        this.radius = radius;
        this.speed = speed;
        this.hp = hp;
        this.onHit = onHit;
        this.id = Enemy.count;
        Enemy.count ++;
        this.bottomBorder = Entity.canvas.height - Player.getInstance().radius*2.1;
        this.currentMove = null;
        this.getNextMove();
        this.push();
    }

    shoot() {
        new Bullets(this.posX, this.posY, true, "down");
    }

    getNextMove() {
        if (this.currentMove == null || this.currentMove.length <= this.state) {
            this.state = 0;
            this.currentMove = patterns[Math.floor(Math.random()*patterns.length)];
        }
        this.move(this.currentMove[this.state]);
        this.state ++;
    }

    damage() {
        this.hp -= 1;
        if (this.hp == 0) {
            this.addScore();
            scoreDisplay.innerHTML = Player.score;
            this.delete();  
        }
    }

    addScore() {
        Player.score += 10;
    }

    push() {
        // ajouter un enemy a son tableau spécifique
    }

    delete() {
        for (let i = 0; i<Enemy.enemyTab.length;i++) {
            for (let j = 0; j<Enemy.enemyTab[i].length;j++) {
                if(this.id == Enemy.enemyTab[i][j].id) {
                    Enemy.enemyTab[i].splice(j,1);
                    delete this;
                    return;
                }
            }
        }
    }
}

export default Enemy;