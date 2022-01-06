import Entity from './modules.js/entity'
import Player from './modules.js/player'
import Enemy from './modules.js/enemy';
import Bullets from './modules.js/bullets';

/*============= VARIABLES ============================*/
let scoreDisplay = document.getElementById('score');
let img = document.getElementById("myImage");
let info = document.getElementById('infoGames');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;
var dy = 1;
let count = 0;
let rndX;
let rndY;
let score = 0;
scoreDisplay.innerHTML = 0;

/*================= afficher les entités =========*/

function drawPlayer() {
    // update du drawPlayer, il a simplement a récupérer les coordonnées actuelles
    // du singleton pour l'afficher
    let entity = Player.getInstance();
    ctx.beginPath();
    ctx.drawImage(img, entity.posX-25, entity.posY-27, 50, 54);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
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

    // same here, factorisation via l'objet
        Player.getInstance().shoot();
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

function drawBullets(tab) {
    for (let i = 0; i < tab.length; i++) {
        ctx.beginPath();
        ctx.arc(tab[i].posX, tab[i].posY, tab[i].radius, 0, Math.PI*2, true);
        ctx.fillStyle = "#ffe436";
        ctx.fill();
        ctx.closePath();
    }
}

function moveBullets(tab) {
    for (let i = 0; i < tab.length; i++) {
        tab[i].move(tab[i].direction);
    }
}

/*================== FONCTIONS ENNEMIS =============================*/

function drawEnemies() {
    for (let i = 0; i < Enemy.enemyTab.length; i++) {
        ctx.beginPath();
        ctx.rect(Enemy.enemyTab[i].posX, Enemy.enemyTab[i].posY, Enemy.enemyTab[i].radius, Enemy.enemyTab[i].radius);
        ctx.fillStyle = "#00561b";
        ctx.fill();
        ctx.closePath();
    }
}

function moveEnemies(tab) {
    for (let i = 0; i < tab.length; i++) {
        tab[i].posY += getNextMove()*5;
        tab[i].posX += getNextMove()*5;
    }
}

function getNextMove() {
    let output = 0;
    let answer = Math.floor(Math.random() * 3);
    switch (answer) {
        case 0 :
            output = -1;
            break;
        case 1 :
            output = 0;
            break;
        case 2 :
            output = 1;
            break;
        default :
            console.log("Erreur in getNextMove() switch");
    }
    return output;
}

/*====================== FONCTIONS GESTION DES HITBOXES =============================*/

// function isCollision(tab1, tab2) {
//     for (let i = 0; i < tab1.length; i++) {
//         for (let j = 0; j < tab2.length; j++) {

//             let dx = tab1[i].posX - tab2[j].posX;
//             let dy = tab1[i].posY - tab2[j].posY;
//             let dist = Math.sqrt(dx * dx + dy * dy);

//             if (dist < tab1[i].radius + tab2[j].radius) {
//                 score += 10;
//                 scoreDisplay.innerHTML = score;
//                 tab1.splice(i, 1);
//                 tab2.splice(j, 1);
//             }
//         }
//     }

// }

// rendu plus générique pour l'utiliser sur les bullets ennemies
function isCollision(entity, tab) {
    for (let i = 0; i < tab.length; i++) {
        let dx = entity.posX - tab[i].posX;
        let dy = entity.posY - tab[i].posY;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < entity.radius + tab[i].radius) {
            tab.splice(i, 1);
            entity.damage();
        }
    }
}


/*==================== FONCTIONS BOUCLE DE JEU ======================================*/

function draw() {

    // Remise à zéro du canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // création / Mise à jour position vaisseau
    let player = Player.getInstance();
    drawPlayer();
    // context.drawImage(img, shipX, shipY);
    for (let i = 0; i<Enemy.enemyTab.length;i++) {
        isCollision(Enemy.enemyTab[i], Bullets.goodBullets);
    }
    isCollision(player, Bullets.badBullets);
    moveEnemies(Enemy.enemyTab);
    drawEnemies();
    moveBullets(Bullets.goodBullets);
    drawBullets(Bullets.goodBullets);
    moveBullets(Bullets.badBullets);
    drawBullets(Bullets.badBullets);

    // Création d'ennemis toutes les 60 frames (1sec), Stockage dans un tableau
    if (count % 40 == 0) {
        rndX = Math.round(Math.random() * 1180);
        rndY = 0;
        let enemy = new Enemy(rndX, rndY, 10);
        for (let i = 0; i<Enemy.enemyTab.length;i++) {
            Enemy.enemyTab[i].shoot();
        }
    }

    // Création des tirs, Stockage dans un tableau

    if (spacePressed && count % 7 == 0) {
        player.shoot();
    }

    // Fonction mise à jour de la position du vaisseau en fonction des touches pressées

    if (upPressed && rightPressed) {
        player.move("upright");
    } else if (upPressed && leftPressed) {
        player.move("upleft");
    } else if (downPressed && rightPressed) {
        player.move("downright");
    } else if (downPressed && leftPressed) {
        player.move("downleft");
    } else if (rightPressed) {
        player.move("right");
    } else if (leftPressed) {
        player.move("left");
    } else if (upPressed) {
        player.move("up");
    } else if (downPressed) {
        player.move("down");
    }

    // Compteur de frames
    count++;

}

// Creations des frames toutes les 16 millisecondes
setInterval(draw, 16);