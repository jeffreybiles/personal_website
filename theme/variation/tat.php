<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <title>Tat</title>
    <?php include('../../header.php') ?>
</head>
<body>

<?php include("../../navbar.php") ?>
<div class="container">
    <div id="game">

    <div id="friendlyFireButtons">
        <button id="friendly" >Friendly</button>
        How do you like your fire?
        <button id="fire">'Friendly'</button>
    </div>
    <div id="modeButtons">
        <button id="normal" >Normal</button>
        <button id="terror">Terror</button>
        <button id="war">War</button>
    </div>
    Click for justice, arrows for truth
    <div id="holdsMyGame">
        <canvas id="myCanvas" width=800 height=600></canvas>
    </div>

    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="/tat/tat.js"></script>
</body>
</html>