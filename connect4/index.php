<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <title>Connect4</title>
    <?php include('../header.php') ?>
</head>
<body>
<?php include("../navbar.php") ?>
<div class="container">
    <div id="game">
        You are the cat.  The red player is under your thrall, but neither they nor the the computer should win.
        Victory is for you alone, for you are the cat.
        <div id="holdsMyGame">
            <canvas id="myCanvas" width=800 height=600></canvas>
        </div>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="connect4.js"></script>
</body>
</html>