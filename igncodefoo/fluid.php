<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <title>Fluid!</title>
    <?php include('../header.php') ?>
</head>
<body>
<?php include("../navbar.php") ?>
<div class="container-fluid">
    <div class="row-fluid">
        <div class="span1"><p></div>
        <div class="span2">
            <h3>The Bootstrap</h3>
            <p>I use Twitter Bootstrap.  I usually use haml and scss.
                That's because I like keeping my bang/buck ratio high.
                I could customize it, but let's be real:
                people come to my site to either see my games or evaluate my frontpage/resume.
            <p>Being all page-art-designy is not currently part of my gig.
                I prefer to focus on making things that are either fun or useful.
                People who are better at css than me can focus on the pretty.
                I'm satisfied with not-ugly and intuitive.
        </div>

        <div class="span6">
            <h1 class='center'>Layouts like water</h1>
            <br>
            <blockquote>Empty your mind, be formless. Shapeless, like water. If you put water into a cup, it becomes the cup.
                You put water into a bottle and it becomes the bottle. You put it in a teapot it becomes the teapot.
                Now, water can flow or it can crash. Be water my friend. --Zen Master Bruce Lee</blockquote>
            <p>Another zen master puts it more succinctly:
            <blockquote>Be like water, or your layout will not display well on mobile devices or windowed browsers.</blockquote>
            <p>Of course, these zen masters may not be aware of the differences between fluid design and responsive design.
                A true fluid layout merely uses percentiles of screen width for every element, while a responsive layout will
                employ numerous tricks to make the viewing experience enjoyable.
            <p>One example is how they deal with sidebars. A fluid layout will squish them as small as needed.
                If this page layout was a true fluid design, viewing it on a portrait-mode iphone of width 320px would result in
                sidebar columns of 320px*(2/12) = 53px.  Now imagine you had a picture on one of those sidebars of width 80px.  Trouble!
                Responsive layouts, on the other hand, will collapse sidebars into the main column when space is limited.
                Now, both my sidebar columns and my main column enjoy 320px width on the small screen.
            <p>As a side note, it appears the geniuses at Twitter either don't know the difference between fluid and responsive layout
                OR they have recognized that once you put in the work, a responsive layout has all the pros of a fluid layout with
                fewer of the cons.  My metaphorical money's on the latter.
        </div>

        <div class="span2">
            <?php include('squirrel.php') ?>
        </div>
        <div class="span1"><p></p></div>
    </div>
</div>



</body>