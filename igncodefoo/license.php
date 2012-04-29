<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <title>A license to calculate</title>
    <?php include('../header.php') ?>
</head>
<body>
<?php include("../navbar.php") ?>
<div class="container-fluid">
    <div class="row-fluid">
        <div class="span1"><p></p></div>
        <div class="span2">
            <h3>I want code, not words!</h3>
            <p>I like your style.  Let's get you some code!  You can find the code online
            <a href="http://repl.it/COV">here</a>
            or you can get the
            <a href="https://github.com/jeffreybiles/personal_website/blob/master/igncodefoo/plater.rb">ruby file</a>
            in my github.
        </div>

        <div class="span6">
            <h2>My name is Plate.  License Plate.</h2>

            <p>I have a problem.
            <p>You see, I want to make a series of license plates that will cover an arbitrary population, but
            there's a mad scientist who is making me print <i>every single plate</i> that is possible with whichever
            pattern I use.  I'm a sensitive soul, and can't stand to see license plates sitting around unused, which is
            why we need to make an awesome algorithm that will minimize the number of extra plates created.

            <h3>The solution</h3>
            <p>Lucky for you, I've already figured this out.  All you have to do is sit and listen.  Or, check out
            <a href="https://github.com/jeffreybiles/personal_website/blob/master/igncodefoo/plater.rb">the code</a>
            .  Whatever fills your soul with joy.
            <p>So this is really a mathematical problem off of some branch of combinatorics.  Each time with add a letter, we
            multiply the number of possibilities by  26, and each time we add a number we multiply the number of possibilities by 10.
            There's probably a fancy math way of doing this with a closed-form solution, but we'll do it using a modified brute-force method.
            <p>Basically, we're going to make two nested loops.  For each time we go through the outer loop, we'll go through the
            inner loop as many times as we need.  We'll make the outer loop letters.  We start off with 0 letters,
            then go through the inner loop (numbers), multiplying by 10 until we get something that's higher than our
            population.  We take how many plates are leftover, and if it's the smallest amount so far we store those values.
            <p>Next, we do the same ting with 1 letter.  Then 2 letters.  Until we have a pattern that's only letters that
            is still bigger than the number of plates needed.  We compare it to the minimum, and then... we stop!  Whatever
            we found as the minimum is our answer!


        </div>

        <div class="span2">
            <?php include('squirrel.php') ?>
        </div>
        <div class="span1"><p></p></div>

    </div>
</div>
</body>