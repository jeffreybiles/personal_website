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
        <div class="span1"><p></p></div>

        <div class="span2">

            <h3>The morality of bus-ponging, as explicated by 20th century philosopher L. Ron Hubbard</h3>

            <blockquote>
            Buses, not being theta-beings in the way that is commonly understood to the enlightened,
            are of little moral consequence.  However, we must take note of what effect the act of bus-ponging has upon
            the theta-being who undergoes such an exercise.
            <br><p></p><br>
            Although little is as effective in clearing undesirable body-thetans from yourself as my Thetan Hand Technique,
            bus-ponging can be a suitable substitute for when you are in possession of a bus and lots of ping-pong but not
            a hyperactive imagination.
            <br><p></p><br>
            However, using this technique alone is not enough if one hopes to reach Cleared Theta Clear
            </blockquote>

            <p>Please note that the views of L. Ron Hubbard do not necessarily represent the views of the author, IGN, or L. Ron Hubbard.</p>

        </div>

        <div class="span6">

            <h4>How to properly pong a bus?</h4>

            <h2>First, let's get all the children out of the bus.</h2>
            <p>Children complicate things.  First, they mess up the calculations since their irregular body shape and
            difficult-to-measure density make calculating their volume difficult.  We would have to plunge each of them in
            a bath and find how much liquid they displaced.  There would probably be splashing.  We would all get wet.
            <i>I hear it's cold in San Francisco.</i>

            <h3>Now, about this bus</h3>
            <p>Take measurements.  Preferably on the inside of the bus, especially for the height.  Measure the seats.  Count the seats.
            Close the windows.  Check again for children.  Seriously, if you miss one they're liable to either die or punch out a window.
            Those windows you closed specifically so the ping pong balls wouldn't escape.

            <h3>Got it?</h3>
            <p>Good.  Now close the bus door and drill a hole in the top.  Alternatively you could push the bus on its side and leave the door open.
            You could even leave half the windows open at that point, just be sure not to break any on the other side or crush the
            bus while tipping it over.

            <h3>Choose your tools</h3>
            <p>Will your ping pong balls be 38mm, 40mm, or an irregular size?  Will you crush them, melt them, or put them in whole?
            Will you make your ping pong balls undergo a chemical reaction that mutates the plastic into a denser type of molecule?
            Since IGN is an large company, we must also ask whether it can afford to perform this chemical reaction at scale,
            for millions and millions of unique buses per day.

            <h3>Let's assume boring</h3>
            <p>I know you're disappointed.  You'll get over it when you see the math.  <i>Math makes everything better</i>.
            <br>
            <p>Remember all those measurements you took all the way at the top of the page?  Let's use those.
            <p>Modeling the bus as a giant rectangular prism.
            <dl class="dl-horizontal">
                <dt>busBoxVolume = </dt>
                <dd>busWidth*busHeight*busLength</dd>
            </dl>
            <p>Good.  Now let's account for all those seats.  Seats are L-shaped and tricky, so they must be handled with care.
            Maybe we should have tossed them out with the children.
            <i>Too late.</i>  We've locked the door.  It's consequences time.

            <dl class="dl-horizontal">
                <dt>seatTopVolume = </dt>
                <dd>(seatHeight - bottomSittyPartHeight) * seatBackWidth * seatLength</dd>
                <dt>seatBottomVolume= </dt>
                <dd>bottomSittyPartHeight * (bottomSittyPartWidth + seatBackWidth) * seatLength</dd>
                <dt>seatVolume = </dt>
                <dd>seatTopVolume + seatBottomVolume</dd>
                <dt>busVolume = </dt>
                <dd>busBoxVolume - (seatVolume * numSeats)</dd>
            </dl>

            <h3>A time for balls</h3>
            <p>We're going to model the balls as spheres.  We do this mostly because the balls are, roughly, spheres.
                We cannot speak of the other reasons.  <i>I might have said too much already.</i></p>

            <dl class="dl-horizontal">
                <dt>sphereVolume = </dt>
                <dd>(4/3)*PI*(radius^3)</dd>
                <dt>sphereVolume ~= </dt>
                <dd>4.19*(radius^3)</dd>
            </dl>

            <p>Of course, it's not that easy.  Balls actually claim more space than they physically occupy,
            since spheres do not perfectly join together.  At the same time, they don't take up as much space as a
            cube of the same radius.  To approximate, let's take the average of a cube and a sphere with said radius.

            <dl class="dl-horizontal">
            <dt>cubeVolume =</dt>
            <dd>8*(radius^3)</dd>
            <dt>ballVolume = </dt>
            <dd>1/2*(sphereVolume + cubeVolume)</dd>
            <dt>ballVolume ~= </dt>
            <dd>6*(radius^3)</dd>
            </dl>

            <h3>Fill'er up!</h3>

            <dl class="dl-horizontal">
                <dt>numBalls =</dt><dd>busVolume/ballVolume</dd>
            </dl>

            <h3>Good job.  I knew you could do it!</h3>
            <p>Your reading comprehension was stellar.  Your speed was off the charts.  All those numbers and letters didn't
                throw you off one bit.  You didn't even kill any children.
                I'm proud of you.  <i>You might be the type of person I'd like to work for.</i>

            <p>Maybe you should visit <a href="http://jeffreybiles.com">the rest of my site</a>.</p>

        </div>

        <div class="span2">
            <?php include('squirrel.php') ?>
        </div>
        <div class="span1"><p></p></div>

    </div>
</div>
</body>