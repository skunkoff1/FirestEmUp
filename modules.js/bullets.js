import Entity from './entity';

export default class Bullets extends Entity {

    // tableaux statiques pour différencier les bullet ennemies et joueur 
    // (facilite la lecture de collisions)
    static count = 0;
    static badBullets = [];
    static goodBullets = [];

    // on appelle le constructeur de la classe mère en ajoutant un boolean ennemy qui
    // sert a faire le tri avant d'envoyer les bullets dans un tableau.
    // pour l'instant les bullets ont une vitesse et une taille prédéfinie
    constructor (posX, posY, enemy, direction) {
        super(posX, posY, 8, 10);
        this.enemy = enemy;
        this.direction = direction;
        Bullets.count ++;
        this.id = Bullets.count;
        this.onHit = 1;
        this.hp = 1;
        if (this.enemy) {
            Bullets.badBullets.push(this);
        } else {
            Bullets.goodBullets.push(this);
        }
    }

    damage(x) {
        this.hp -= x;
        if (this.hp <= 0) {
            this.delete();
        }
    }

    wallHit() {
        this.delete();
    }

    delete() {
        let tab = (this.enemy) ? Bullets.badBullets : Bullets.goodBullets;
        for (let i = 0; i<tab.length;i++) {
            if(this.id == tab[i].id) {
                tab.splice(i,1);
                delete this;
            }
        }
    }

}