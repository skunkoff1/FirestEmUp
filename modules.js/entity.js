import { canvas } from '../script'

export default class Entity {
    constructor(posX, posY, radius, speed) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.speed = speed;
    }

    move(direction) {
        if (direction.includes("up")) {
            posY -= this.speed;
        }
        if (direction.includes("down")) {
            posY+= this.speed;
        }
        if (direction.includes("left")) {
            posX -= this.speed;
        }
        if (direction.includes("right")) {
            posX += this.speed;
        }
        isWall();
    }

    isWall() {
        if(
            (posX - radius) <= 0 ||
            (posX + radius) >= canvas.width ||
            (posY - radius) <= 0 ||
            (posY + radius) >= canvas.height
        ) {
            wallHit();
        }
    }

    wallHit() {
        
    }
}