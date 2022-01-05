/*============= VARIABLES ============================*/
let scoreDisplay = document.getElementById('score');
let img = document.getElementById("myImage");
let info = document.getElementById('infoGames');
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
var bulletsTab = [];
var enemyTab = [];
var dy = 1;
let count = 0;
let rndX;
let rndY;
let score = 0;
scoreDisplay.innerHTML = 0;

/*================= CLASSE ENTITE (Vaisseau, bullets, ennemis) =========*/
class Entity {
    constructor(posX, posY, radius) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        ctx.beginPath();
        ctx.rect(posX, posY, radius, radius);
        // context.drawImage(img, posX, posY);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
    }
}

/*============ FONCTION EVENEMENT CLAVIER ( Mouvoir le vaisseau, Tirer ) ==================*/

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "d" || e.key == "ArrowRight") {
        rightPressed = true;
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


/*================== FONCTION BULLETS =======================================*/

function drawBullets() {
    for (let i = 0; i < bulletsTab.length; i++) {
        ctx.beginPath();
        ctx.rect(bulletsTab[i].posX + 5, bulletsTab[i].posY, bulletsTab[i].radius, bulletsTab[i].radius);
        ctx.rect(bulletsTab[i].posX + 12, bulletsTab[i].posY, bulletsTab[i].radius, bulletsTab[i].radius);
        ctx.fillStyle = "#ffe436";
        ctx.fill();
        ctx.closePath();
    }
}

function moveBullets(tab) {
    for (let i = 0; i < tab.length; i++) {
        tab[i].posY -= 10;
        if (tab[i].posY <= 0) {
            tab.splice(i, 1);
        }
    }
}

/*================== FONCTIONS ENNEMIS =============================*/

function drawEnemies() {
    for (let i = 0; i < enemyTab.length; i++) {
        ctx.beginPath();
        ctx.rect(enemyTab[i].posX, enemyTab[i].posY, enemyTab[i].radius, enemyTab[i].radius);
        ctx.fillStyle = "#00561b";
        ctx.fill();
        ctx.closePath();
    }
}

function moveEnemies(tab) {
    for (let i = 0; i < tab.length; i++) {
        tab[i].posY += 1;
        if (tab[i].posY >= canvas.height) {
            tab.splice(i, 1);
        }
    }
}

/*====================== FONCTIONS GESTION DES HITBOXES =============================*/

function isCollision(tab1, tab2) {
    for (let i = 0; i < tab1.length; i++) {
        for (let j = 0; j < tab2.length; j++) {

            let dx = tab1[i].posX - tab2[j].posX;
            let dy = tab1[i].posY - tab2[j].posY;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < tab1[i].radius + tab2[j].radius) {
                score += 10;
                scoreDisplay.innerHTML = score;
                tab1.splice(i, 1);
                tab2.splice(j, 1);
            }
        }
    }

}


/*==================== FONCTIONS BOUCLE DE JEU ======================================*/

function draw() {

    // Remise à zéro du canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // création / Mise à jour position vaisseau
    let ship = new Entity(shipX, shipY, 25);
    // context.drawImage(img, shipX, shipY);

    isCollision(bulletsTab, enemyTab)
    moveEnemies(enemyTab);
    drawEnemies();
    moveBullets(bulletsTab);
    drawBullets();

    // Création d'ennemis toutes les 60 frames (1sec), Stockage dans un tableau
    if (count % 40 == 0) {
        rndX = Math.round(Math.random() * 1180);
        rndY = 0;
        let enemy = new Entity(rndX, rndY, 30);
        enemyTab.push(enemy);
    }

    // Création des tirs, Stockage dans un tableau

    if (spacePressed && count % 7 == 0) {
        let bullets = new Entity(shipX, shipY, 5);
        bulletsTab.push(bullets);
    }

    // Fonction mise à jour de la position du vaisseau en fonction des touches pressées

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

    // Compteur de frames
    count++;

}

// Creations des frames toutes les 16 millisecondes
setInterval(draw, 16);