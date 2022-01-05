var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var shipX = 600;
var shipY = 300;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;
var speed = 7;
var bulletsX = 0;
var bulletsY = 0;
var dy = 1;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "d" || e.key == "ArrowRight") {
        rightPressed = true;
        console.log('right');
    } else if (e.key == "q" || e.key == "ArrowLeft") {
        leftPressed = true;
    } else if (e.key == "z" || e.key == "ArrowUp") {
        upPressed = true;
    } else if (e.key == "s" || e.key == "ArrowDown") {
        downPressed = true;
    } else if (e.key == "n") {
        spacePressed = true;
        bulletsX = shipX;
        bulletsY = shipY;
    }
}

function keyUpHandler(e) {
    if (e.key == "d" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "q" || e.key == "ArrowLeft") {
        leftPressed = false;
    } else if (e.key == "z" || e.key == "ArrowUp") {
        upPressed = false;
    } else if (e.key == "s" || e.key == "ArrowDown") {
        downPressed = false;
    } else if (e.key == "n") {
        spacePressed = false;
    }
}

function drawShip() {
    ctx.beginPath();
    ctx.rect(shipX, shipY, 25, 25);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function drawBullets() {
    ctx.beginPath();
    ctx.rect(bulletsX + 5, bulletsY, 2, 5);
    ctx.rect(bulletsX + 17, bulletsY, 2, 5);
    ctx.fillStyle = "#ffe436";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShip();

    if (spacePressed) {
        return drawBullets();
    }

    if (upPressed && rightPressed) {
        shipY -= speed;
        shipX += speed;
        if (shipY < 0 && shipX > canvas.width - 25) {
            shipY = 0;
            shipX = canvas.width - 25;
        } else if (shipX > canvas.width - 25) {
            shipX = canvas.width - 25;
        } else if (shipY < 0) {
            shipY = 0;
        }
    } else if (upPressed && leftPressed) {
        shipX -= speed;
        shipY -= speed;
        if (shipX < 0 && shipY < 0) {
            shipY = 0;
            shipX = 0;
        } else if (shipX < 0) {
            shipX = 0;
        } else if (shipY < 0) {
            shipY = 0;
        }
    } else if (downPressed && rightPressed) {
        shipY += speed;
        shipX += speed;
        if (shipX > canvas.width - 25 && shipY > canvas.height - 25) {
            shipX = canvas.width - 25;
            shipY = canvas.height - 25;
        } else if (shipX > canvas.width - 25) {
            shipX = canvas.width - 25;
        } else if (shipY > canvas.height - 25) {
            shipY = canvas.height - 25;
        }
    } else if (downPressed && leftPressed) {
        shipY += speed;
        shipX -= speed;
        if (shipX < 0 && shipY > canvas.height - 25) {
            shipX = 0;
            shipY = canvas.height - 25;
        } else if (shipX < 0) {
            shipX = 0;
        } else if (shipY > canvas.height - 25) {
            shipY = canvas.height - 25;
        }
    } else if (rightPressed) {
        shipX += speed;
        if (shipX > canvas.width - 25) {
            shipX = canvas.width - 25;
        }
    } else if (leftPressed) {
        shipX -= speed;
        if (shipX < 0) {
            shipX = 0;
        }
    } else if (upPressed) {
        shipY -= speed;
        if (shipY < 0) {
            shipY = 0;
        }
    } else if (downPressed) {
        shipY += speed;
        if (shipY > canvas.height - 25) {
            shipY = canvas.height - 25;
        }
    }

    // bulletsY -= dy;

}

setInterval(draw, 16);