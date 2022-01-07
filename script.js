import Player from './modules.js/player'
import Enemy from './modules.js/enemy';
import Bullets from './modules.js/bullets';

/*============= VARIABLES ============================*/
let scoreDisplay = document.getElementById('score');
let img = document.getElementById("myImage");
let enemyImg = document.getElementById("enemyIcon");
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
var game = null;
scoreDisplay.innerHTML = 0;

/*================= afficher les entités =========*/

enemyImg.style.display = "none";
img.style.display = "none";

function drawPlayer() {
    // update du drawPlayer, il a simplement a récupérer les coordonnées actuelles
    // du singleton pour l'afficher
    let entity = Player.getInstance();
    ctx.beginPath();
    ctx.drawImage(img, entity.posX-25, entity.posY-27, 50, 54);
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
        Player.getInstance().speed = 4;
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
        Player.getInstance().speed = 7;
    }
}


/*================== FONCTION BULLETS =======================================*/

function drawBullets() {
    for (let i = 0; i < Bullets.goodBullets.length; i++) {
        ctx.beginPath();
        ctx.arc(Bullets.goodBullets[i].posX, Bullets.goodBullets[i].posY, Bullets.goodBullets[i].radius, 0, Math.PI*2, true);
        ctx.fillStyle = "#ffe436";
        ctx.fill();
        ctx.closePath();
    }
    for (let j = 0; j < Bullets.badBullets.length; j++) {
        ctx.beginPath();
        ctx.arc(Bullets.badBullets[j].posX, Bullets.badBullets[j].posY, Bullets.badBullets[j].radius, 0, Math.PI*2, true);
        ctx.fillStyle = "#90ee90";
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
        ctx.drawImage(enemyImg, Enemy.enemyTab[i].posX-25, Enemy.enemyTab[i].posY-27, 50, 54);
        ctx.closePath();
    }
}

function moveEnemies() {
    for (let i = 0; i < Enemy.enemyTab.length; i++) {
        Enemy.enemyTab[i].getNextMove();
    }
}

/*====================== FONCTIONS GESTION DES HITBOXES =============================*/

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

function loop() {
    if (Player.inGame == false) {
        clearInterval(game);
    } 
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
    moveEnemies();
    drawEnemies();
    moveBullets(Bullets.goodBullets);
    moveBullets(Bullets.badBullets);
    drawBullets();

    // actions les 60 frames (1sec), Stockage dans un tableau
    if (count % 60 == 0) {
        
        for (let i = 0; i<Enemy.enemyTab.length;i++) {
            Enemy.enemyTab[i].shoot();
        }
    }

    if (count % 1000 == 0) {
        rndX = Math.round(Math.random() * 1180);
        rndY = 0;
        new Enemy(rndX, rndY, 8);
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
function gameLaunch() {
    game = setInterval(loop, 16);
    Player.inGame = true;
}

gameLaunch();