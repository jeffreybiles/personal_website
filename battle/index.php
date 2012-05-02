<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <title>Battle</title>
    <?php include('../header.php') ?>
    <link href="battle.css.scss" rel="stylesheet">

</head>
<body>
<?php include("../navbar.php") ?>
<div class="container">
    <div id="game">
        <div id="battleScreen">
            <div id="enemy">
                <div class="portrait"><img src=''></div>
                <div class="hp">100</div>
            </div>
            <div id="hero">
                <div class="portrait"><img src=""></div>
                <div class="hp">50</div>
            </div>

        </div>
        <div id="message"></div>
        <div id="options">
            <div id="attacks">
                Attacks
                <div class="attack">Filler</div>
                <div class="attack">More Filler</div>
            </div>
        </div>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="battle.js"></script>
</body>
</html>
