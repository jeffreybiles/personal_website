<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <title>Number Nommers 2</title>
    <?php include('../header.php') ?>
</head>
<body>

<?php include("../navbar.php") ?>
<div class="container">
    <div id="game">

        <div>
            <button id="add" >Add</button>
            <button id="subtract">Subtract</button>
        </div>
        Arrows to move, spacebar to nom.
        <div id="holdsMyGame">
            <canvas id="myCanvas" width=800 height=600></canvas>
        </div>

    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="numberNommers2.js"></script>
</body>
</html>