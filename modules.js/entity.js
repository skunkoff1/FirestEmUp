
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

        let diag = this.speed/Math.sqrt(2);
        
        switch(direction) {
            case "up":
                this.posY -= this.speed;
                break;
            case "down":
                this.posY += this.speed;
                break;
            case "left":
                this.posX -= this.speed;
                break;
            case "right":
                this.posX += this.speed;
                break;
            case "upleft":
                this.posY -= diag;
                this.posX -= diag;
                break;
            case "upright":
                this.posY -= diag;
                this.posX += diag;
                break;
            case "downleft":
                this.posY += diag;
                this.posX -= diag;
                break;
            case "downright":
                this.posY += diag;
                this.posX += diag;
                break;
            case " ":
                this.posY = this.posY;
                this.posX = this.posX;
                break;
            default :
                console.log("default reached in entity.move switch");
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
        } else if (this.posY + this.radius >= this.bottomBorder) {
            this.posY = this.bottomBorder - this.radius;
        }
    }
}


