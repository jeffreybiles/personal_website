(function() {
  var mainLoop, startGame;
  mainLoop = function(things, canvas) {
    var alive, gameOver, health, level, thing, thing2, thingy, _i, _j, _k, _len, _len2, _len3;
    alive = true;
    drawBackground();
    for (_i = 0, _len = things.length; _i < _len; _i++) {
      thing = things[_i];
      thing.draw();
    }
    for (_j = 0, _len2 = things.length; _j < _len2; _j++) {
      thingy = things[_j];
      thingy.move();
    }
    for (_k = 0, _len3 = things.length; _k < _len3; _k++) {
      thing2 = things[_k];
      thing2.update();
    }
    if (canvasId === canvas.id) {
      if (alive && gameOver === false) {
        setTimeout(mainLoop, 1000 / 60, things, canvas);
      } else if (gameOver === false) {
        startGame(gameMode);
      } else {
        level = 1;
        health = 5;
        gameOver = false;
        startGame(gameMode);
      }
    }
  };
  window.addEventListener('keyup', (function(event) {
    Key.onKeyup(event);
    event.preventDefault();
    return false;
  }), false);
  window.addEventListener('keydown', (function(event) {
    Key.onKeydown(event);
    event.preventDefault();
    return false;
  }), false);
  startGame = function(mode) {
    var asteroids, canvas, canvasId, ctx, gameMode, goalPost, oldCanvas, spaceship;
    if (mode == null) {
      mode = 'normal';
    }
    canvasId = Math.random().toString();
    oldCanvas = $('#holdsMyGame canvas').remove();
    $('#holdsMyGame').html("<canvas id='" + canvasId + "' width=" + oldCanvas[0].width + " height=" + oldCanvas[0].height + "></canvas>");
    canvas = document.getElementById(canvasId);
    ctx = canvas.getContext("2d");
    canvas.tabIndex = 1;
    gameMode = mode;
    asteroids = [];
    if (gameMode === 'spook' || gameMode === 'hardSpook') {
      goalPost = new Goal(canvas.width * Math.random(), canvas.height * Math.random(), 80);
    } else {
      goalPost = new Goal(canvas.width * 0.9, canvas.height * 0.9, 50);
    }
    asteroids.push(goalPost);
    asteroidFactory(level * 3);
    spaceship = new Triangle(20, 20, 0);
    mainLoop(Array.prototype.concat.apply([], [spaceship, asteroids]), canvas);
  };
  jQuery(function($) {
    $('#hardMode').click(function() {
      var asteroidDecel, level, shipAcc;
      level = 1;
      startGame('hard');
      shipAcc = 0.2;
      asteroidDecel = 0.85;
    });
    $('#normalMode').click(function() {
      var asteroidDecel, level, shipAcc;
      level = 1;
      shipAcc = 0.2;
      startGame('normal');
      asteroidDecel = 0.9;
    });
    $('#insaneMode').click(function() {
      var asteroidDecel, level, shipAcc;
      level = 1;
      startGame('insane');
      shipAcc = 0.27;
      asteroidDecel = 0.94;
    });
    $('#spookMode').click(function() {
      var asteroidDecel, level, shipAcc;
      level = 1;
      startGame('spook');
      shipAcc = 0.2;
      asteroidDecel = 0.9;
    });
    return $('#hardSpookMode').click(function() {
      var asteroidDecel, shipAcc;
      startGame('hardSpook');
      shipAcc = 0.2;
      return asteroidDecel = 0.8;
    });
  });
  startGame();
  window.api = {
    startGame: startGame
  };
}).call(this);
