import Entity from './entity';
import Bullets from './bullets';

export default class Player extends Entity {

    static inGame = false;
    static score = 0;
    // singleton, instance unique de la classe Player qui modélise le vaisseau du joueur
    static instance = null;

    // on utilise des entrées par défaut pour la création du vaisseau joueur
    constructor() {
        super(600, 450, 25, 7);
        this.hp = 3;
        this.onHit = 5;
    }

    // fonction d'accès au singleton ou vaisseau joueur
    static getInstance() {
        if (Player.instance == null) {
            Player.instance = new Player();
        } else {
            return Player.instance;
        }
    }

    damage(x) {
        this.hp -= x;
        if (this.hp <= 0) {
            Player.inGame = false;
            alert("Game Over ! Your score : "+Player.score);
        }
    }

    // fonction de tir, qui instancie une bullet a la position actuelle
    shoot() {
        new Bullets(this.posX, this.posY, false, "up");
    }
}
