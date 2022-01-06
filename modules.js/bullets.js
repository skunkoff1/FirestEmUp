import Entity from './entity';

export default class Bullets extends Entity {

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

    }

}