let canvas = document.querySelector('canvas');
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
}


