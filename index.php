<!-- Route pour notre base de donnée -->
<?php
    error_reporting(E_ALL);
    require('./connect.php');

    if (isset($_POST['name']) && isset($_POST['score'])) {
        $name = $_POST['name'];
        $score = $_POST['score'];

        $req = $db->prepare('INSERT INTO highscores(nom,score) VALUES(?,?)');
        $req->execute(array($name,$score));
        
    }
    
            // $req = $db->prepare('SELECT * FROM highscores');
            // $req->execute(array());


?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>FirstEmUp</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="container">
        <div id="infoGames">
            <div id="player">
                <p>Score :
                    <span id="score"></span>
                </p>
                <p id="stageIndic"></p>
                <div id="power">                 
                </div>
            </div>
            <div id="enemy">
                <p id="boss"></p>
            </div>
        </div>
        <canvas width="1400" height="772"></canvas>
    </div>

    <div id="pauseIndicator">
        Game Paused<br> Press "P" to resume
    </div>

    <div id="pressStart">
        Start
    </div>

    <div id="postScore">
        <form method="post" action="index.php">
            <input type="text" name="name" placeholder="entrez votre nom" required>
            <p id="finishScore">Votre score : </p>
            <button type="submit" id="restartButton">
                soumettre
            </button>
            <input type="text" name="score" id="scoreInput" required>
    
        </form>
    </div>
    
    <div id="hidden">
        <img id="myImage" src="/Images/ship.png">
        <img id="enemyImg" src="Images/enemyIcon.png">
        <img id="healImg" src="Images/hp.png">
        <img id="trollImg" src="Images/trollImg.png">
    </div>

    <script type="module" src="script.js"></script>
</body>
</html>