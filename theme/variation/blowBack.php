<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <title>Blowback</title>
    <?php include('../../header.php') ?>
</head>
<body>
<?php include("../../navbar.php") ?>
<div class="container">
<div id="game">
    <div id="modeButtons">
        <button id="pacifist" >Pacifist</button>
        <button id="normal">Normal</button>
        <button id="followingOrders">Just following orders</button>
        <button id="devilMadeMe">Devil made me do it</button>
    </div>
    Click for anger, arrows for fear.
<!--    ->  Click for justice, arrows for truth -> Click for God, arrows for family  -> Click for charbitosh, arrows for camphenine-->
    <div id="holdsMyGame">
        <canvas id="myCanvas" width=800 height=600></canvas>
    </div>
</div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="/blowback/blowback.js"></script>
</body>
</html>