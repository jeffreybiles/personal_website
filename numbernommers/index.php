<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <title>Number Nommers</title>
    <?php include('../header.php') ?>
</head>
<body>

<?php include("../navbar.php") ?>
<div class="container">
    <div id="game">
        <div>
            <button id="easy" >Easy</button>
            <button id="normal">Normal</button>
            <button id="hard">Hard</button>
        </div>
        Arrows to move, spacebar to nom.
        <div id="holdsMyGame">
            <canvas id="myCanvas" width=800 height=600></canvas>
        </div>

    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="numbernommers.js"></script>
</body>
</html>