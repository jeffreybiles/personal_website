(function() {
  var alive, asteroidAcc, asteroidDecel, asteroids, canvas, canvasId, ctx, gameMode, gameOver, goalPost, health, level, shipAcc, shipDecel, spin;
  shipAcc = 0.2;
  asteroidAcc = 0.4;
  shipDecel = 0.96;
  asteroidDecel = 0.9;
  spin = 0.1;
  level = 1;
  health = 5;
  alive = true;
  canvas = document.getElementById("myCanvas");
  canvasId = "myCanvas";
  ctx = canvas.getContext("2d");
  asteroids = [];
  gameOver = false;
  gameMode = 'normal';
  goalPost = "";
}).call(this);
