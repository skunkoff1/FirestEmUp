import { canvas } from '../script'

export default class Entity {
    constructor(posX, posY, radius, speed) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.speed = speed;
    }

    // factorisation du déplacement (chaque entité peut l'utiliser maintenant)
    move(direction) {
        if (direction.includes("up")) {
            this.posY -= this.speed;
        }
        if (direction.includes("down")) {
            this.posY+= this.speed;
        }
        if (direction.includes("left")) {
            this.posX -= this.speed;
        }
        if (direction.includes("right")) {
            this.posX += this.speed;
        }
        this.isWall();
    }

    // vérifie si l'entité est en contact avec un mur
    isWall() {
        if((this.posX - this.radius) <= 0 ||
            (this.posX + this.radius) >= canvas.width ||
            (this.posY - this.radius) <= 0 ||
            (this.posY + this.radius) >= canvas.height) {
            this.wallHit();
        }
    }

    // action a réaliser si un mur est touché
    wallHit() {
        console.log(this+" has hit a wall");
    }
}

export class Player extends Entity {

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

export class Bullets extends Entity {

    // tableaux statiques pour différencier les bullet ennemies et joueur 
    // (facilite la lecture de collisions)

    static badBullets = [];
    static goodBullets = [];

    // on appelle le constructeur de la classe mère en ajoutant un boolean ennemy qui
    // sert a faire le tri avant d'envoyer les bullets dans un tableau.
    // pour l'instant les bullets ont une vitesse et une taille prédéfinie
    constructor (posX, posY, ennemy) {
        super(posX, posY, 8, 10);
        
        if (ennemy) {
            Bullets.badBullets.push(this);
        } else {
            Bullets.goodBullets.push(this);
        }
    }
    wallHit() {
        // ?? this.splice ??
        // comment je récupère l'id du tableau de la bullet qui a hit un mur ??
        // idée de solution : ajouter une durée de vie a une bullet pour l'auto sortir du tableau

        // autre solution possible : faire le calcul de hitbox sur le main en parcourant le tableau, et a ce moment là détruire les bullets
    }

}