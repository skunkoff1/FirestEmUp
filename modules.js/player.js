import Entity from './entity';
import Bullets from './bullets';

export default class Player extends Entity {

    static inGame = true;
    static score = 0;
    // singleton, instance unique de la classe Player qui modélise le vaisseau du joueur
    static instance = null;

    // on utilise des entrées par défaut pour la création du vaisseau joueur
    constructor() {
        super(600, 600, 25, 7);
    }

    // fonction d'accès au singleton ou vaisseau joueur
    static getInstance() {
        if (Player.instance == null) {
            Player.instance = new Player();
        } else {
            return Player.instance;
        }
    }

    damage() {
        this.hp -= 1;
        if (this.hp == 0) {
            Player.inGame = false;
            alert("Game Over ! Your score : " + Player.score);
        }
    }

    // fonction de tir, qui instancie une bullet a la position actuelle
    shoot() {
        let bullet = new Bullets(this.posX, this.posY, false, "up");
        Bullets.goodBullets.push(bullet);
    }
}