<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <title>Vengeance</title>
    <?php include('../../header.php') ?>
</head>
<body>

<?php include("../../navbar.php") ?>
<div class="container">
    <div id="game">
        <div>
            <button id="dedicated">Dedicated</button>
            Enemies
            <button id="citizen-soldier">Citizen-soldier</button>
        </div>
        <div id="modeButtons">
            <button id="normal" >Normal</button>
            <button id="feud">Feud</button>
            <button id="occupation">Occupation</button>
        </div>
        Click for God, arrows for country
        <div id="holdsMyGame">
            <canvas id="myCanvas" width=800 height=600></canvas>
        </div>

    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="/vengeance/vengeance.js"></script>
</body>
</html>