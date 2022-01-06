import Entity from './entity';
import Bullets from './bullets';

let canvas = document.querySelector('canvas');

export default class Player extends Entity {

    // singleton, instance unique de la classe Player qui modélise le vaisseau du joueur
    static instance = null;

    // on utilise des entrées par défaut pour la création du vaisseau joueur
    constructor() {
        super(600, 300, 25, 7);
    }

    // fonction d'accès au singleton ou vaisseau joueur
    static getInstance() {
        if (Player.instance == null) {
            Player.instance = new Player();
        } else {
            return Player.instance;
        }
    }

    // polymorphisme de la methode wallHit pour le player, bloque sa position au bord de la map
    wallHit() {
        if (this.posX - this.radius <= 0) {
            this.posX = this.radius;
        } else if (this.posX + this.radius >= canvas.width) {
            this.posX = canvas.width - this.radius;
        }
        if (this.posY - this.radius <= 0) {
            this.posY = this.radius;
        } else if (this.posY + this.radius >= canvas.height) {
            this.posY = canvas.height - this.radius;
        }
    }

    // fonction de tir, qui instancie une bullet a la position actuelle
    shoot() {
        new Bullets(this.posX, this.posY, false);
    }
}
