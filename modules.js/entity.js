
export default class Entity {
    static canvas = document.querySelector('canvas');
    constructor(posX, posY, radius, speed) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.speed = speed;
        this.bottomBorder = Entity.canvas.height;
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
            (this.posX + this.radius) >= Entity.canvas.width ||
            (this.posY - this.radius) <= 0 ||
            (this.posY + this.radius) >= this.bottomBorder) {
            this.wallHit();
        }
    }

    // action a réaliser si un mur est touché
    wallHit() {
        if (this.posX - this.radius <= 0) {
            this.posX = this.radius;
        } else if (this.posX + this.radius >= Entity.canvas.width) {
            this.posX = Entity.canvas.width - this.radius;
        }
        if (this.posY - this.radius <= 0) {
            this.posY = this.radius;
        } else if (this.posY + this.radius >= Entity.canvas.height) {
            this.posY = Entity.canvas.height - this.radius;
        }
    }
}


