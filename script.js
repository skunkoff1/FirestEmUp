import Player from './modules.js/player'
import Enemy from './modules.js/enemy';
import Bullets from './modules.js/bullets';
import { displayPlayerHp } from './modules.js/assets/infoBar';
import Stage from './modules.js/stage';
import Stage1 from './modules.js/stages/stage1';
import Stage2 from './modules.js/stages/stage2';
import Heal from './modules.js/items/item';
import Item from './modules.js/items/item';

/*============= VARIABLES ============================*/

let scoreDisplay = document.getElementById('score');
let startBtn = document.getElementById("pressStart");
let img = document.getElementById("myImage");
let info = document.getElementById('infoGames');
let pause = document.getElementById("pauseIndicator");
let isPaused = false;
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var shootUpPressed = false;
var boostPressed = false;
let count = 0;
var game = null;
scoreDisplay.innerHTML = 0;

/*================= event listeners =================*/

startBtn.addEventListener("click", gameLaunch, false);

/*===================== FONCTIONS DE JEU ===================*/

function gameLaunch() {
    canvas.style.backgroundImage = 'url("Images/spaceBackground.gif")';
    startBtn.style.display = "none";
    game = setInterval(loop, 16);
    Player.inGame = true;
}

function gamePause() {
    if(isPaused) {
        game = setInterval(loop, 16);
        pause.style.display = "none";
        isPaused = false;
    } else {
        clearInterval(game);
        pause.style.display = "block";
        isPaused = true;
    }
}

function gameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearInterval(game);
    canvas.style.backgroundImage = 'url("./Images/altBackground.jpg")';
    document.getElementById("postScore").style.display = "block";
    document.getElementById("scoreInput").value = Player.score;
    document.getElementById("finishScore").innerHTML = "Score : "+ Player.score;
}

/*================= afficher les entités =========*/


function drawPlayer() {
    // update du drawPlayer, il a simplement a récupérer les coordonnées actuelles
    // du singleton pour l'afficher
    let entity = Player.getInstance();
    ctx.beginPath();
    ctx.drawImage(img, entity.posX - 25, entity.posY - 27, 50, 54);
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
    } else if (e.key == "k") {
        shootUpPressed = true;
    } else if (e.key == "l") {
        boostPressed = true;
    } else if (e.key == "p") {
        e.preventDefault();
        gamePause();
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
    } else if (e.key == "k") {
        shootUpPressed = false;
    } else if (e.key == "l") {
        boostPressed = false;
    }
}


/*================== FONCTION BULLETS =======================================*/

function drawBullets() {
    for (let i = 0; i < Bullets.goodBullets.length; i++) {
        ctx.beginPath();
        ctx.arc(Bullets.goodBullets[i].posX, Bullets.goodBullets[i].posY, Bullets.goodBullets[i].radius, 0, Math.PI * 2, true);
        ctx.fillStyle = "#ffe436";
        ctx.fill();
        ctx.closePath();
    }
    for (let j = 0; j < Bullets.badBullets.length; j++) {
        ctx.beginPath();
        ctx.arc(Bullets.badBullets[j].posX, Bullets.badBullets[j].posY, Bullets.badBullets[j].radius, 0, Math.PI * 2, true);
        ctx.fillStyle = "#90ee90";
        ctx.fill();
        ctx.closePath();
    }
}

function moveObjects(tab) {
    for (let i = 0; i < tab.length; i++) {
        tab[i].move(tab[i].direction);
    }
}

/*================== FONCTIONS ENNEMIS =============================*/

function drawEntities(tab) {

    for (let i = 0; i < tab.length; i++) {
        let current = tab[i];
        ctx.beginPath();
        ctx.drawImage(current.image, current.posX - current.radius, current.posY - current.radius, current.radius*2, current.radius*2);
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
            entity.damage(tab[i].onHit);
            if (tab[i] instanceof Bullets) {
                tab.splice(i,1);
            }
            if (tab[i] instanceof Item) {
                tab[i].trigger();
                tab.splice(i, 1);
            }
        }
    }
}

// Initialisation des données de jeu

//new Stage1();
new Stage2();

/*==================== FONCTIONS BOUCLE DE JEU ======================================*/

function loop() {
    // Remise à zéro du canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Player.inGame == false) {
        gameOver();
    }
    
     // vérification de l'appel de la prochaine wave
    if (Enemy.isEmpty()) {
        Stage.stageTab[0].getNextWave();
    }

    // création / Mise à jour position vaisseau
    let player = Player.getInstance();
    drawPlayer();
    displayPlayerHp(Player.getInstance().hp);
    // context.drawImage(img, shipX, shipY);
    for (let i = 0; i < Enemy.enemyTab.length; i++) {
        isCollision(Enemy.enemyTab[i], Bullets.goodBullets);
    }
    isCollision(player, Enemy.enemyTab);
    moveEnemies();
    drawEntities(Enemy.enemyTab);
    drawEntities(Item.itemsTab);
    moveObjects(Bullets.goodBullets);
    moveObjects(Bullets.badBullets);
    moveObjects(Item.itemsTab);
    drawBullets();
    isCollision(player, Bullets.badBullets);
    isCollision(player, Item.itemsTab);

    // actions les 60 frames (1sec), Stockage dans un tableau
    if (count % 60 == 0) {

        for (let i = 0; i < Enemy.enemyTab.length; i++) {
            
            Enemy.enemyTab[i].shootTimeout = setTimeout(() => {
                Enemy.enemyTab[i].shoot();
            }, Math.floor(Math.random()*800));
            
        }
    }

    // Shoot keys handlers

    if (shootUpPressed) {
        player.shoot();
    }

    if (boostPressed) {
        player.boost();
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
