<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <title>LightSeeker</title>
    <?php include('../header.php') ?>
</head>
<body>
<?php include("../navbar.php") ?>
<div class="container">

    <div id="game">
        <div>
            <button id="normalMode" > Normal Mode</button>
            <button id="hardMode"> Hard Mode</button>
            <button id="insaneMode"> Insane Mode </button>
            ||
            <button id="spookMode"> Spook Mode </button>
            <button id="hardSpookMode"> Hard Spook Mode</button>
        </div>
        All arrows.  Follow the Light.  If there is no light, look to the shadows.
        <div id="holdsMyGame">
            <canvas id="myCanvas" width=800 height=600></canvas>
        </div>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="lightSeeker.js"></script>
</body>
</html>