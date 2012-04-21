(function() {
  var Circle, Key, accelerationConstant, canvas, canvasId, chargeFactory, charges, ctx, drawBackground, level, mainLoop, otherSpeed, player, playerAcceleration, rand, startGame;

  canvas = document.getElementById("myCanvas");

  canvasId = "myCanvas";

  ctx = canvas.getContext("2d");

  otherSpeed = 1;

  level = 1;

  accelerationConstant = 0.00005;

  playerAcceleration = 0.05;

  player = '';

  charges = [];

  rand = function(max) {
    return Math.ceil(Math.random() * max);
  };

  drawBackground = function() {
    var color;
    color = player.charge > 0 ? '#CCA981' : '#95ACB4';
    ctx.fillStyle = color;
    return ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  Key = {
    _pressed: {},
    LEFT: 37 || 65,
    A: 65,
    UP: 38,
    W: 87,
    RIGHT: 39,
    D: 68,
    DOWN: 40,
    S: 83,
    SPACE: 32,
    isDown: function(keyCode) {
      return this._pressed[keyCode];
    },
    onKeydown: function(event) {
      return this._pressed[event.keyCode] = true;
    },
    onKeyup: function(event) {
      return delete this._pressed[event.keyCode];
    }
  };

  Circle = (function() {

    function Circle(x, y, charge, isPlayer) {
      this.x = x;
      this.y = y;
      this.charge = charge;
      this.isPlayer = isPlayer != null ? isPlayer : false;
      this.radius = Math.abs(this.charge) * 5;
      if (this.isPlayer) {
        this.color = this.charge > 0 ? '#A8652D' : '#1B6565';
        this.dx = this.dy = 0;
      } else {
        this.color = this.charge > 0 ? '#9A692C' : '#325F66';
        this.dx = Math.random() * otherSpeed;
        this.dy = Math.random() * otherSpeed;
      }
    }

    Circle.prototype.move = function() {
      this.x += this.dx;
      this.y += this.dy;
      if (this.y < 0) {
        this.y = 0;
        this.dy *= -1;
      }
      if (this.y > canvas.height) {
        this.y = canvas.height;
        this.dy *= -1;
      }
      if (this.x < 0) {
        this.x = 0;
        this.dx *= -1;
      }
      if (this.x > canvas.width) {
        this.x = canvas.width;
        return this.dx *= -1;
      }
    };

    Circle.prototype.update = function() {
      var charge, distanceSquared, distanceX, distanceY, influenceX, influenceY, _i, _len;
      if (Key.isDown(Key.UP) || Key.isDown(Key.W)) this.dy -= playerAcceleration;
      if (Key.isDown(Key.DOWN) || Key.isDown(Key.S)) this.dy += playerAcceleration;
      if (Key.isDown(Key.LEFT) || Key.isDown(Key.A)) this.dx -= playerAcceleration;
      if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) {
        this.dx += playerAcceleration;
      }
      if (Key.isDown(Key.SPACE)) {
        this.charge *= -1;
        this.color = this.charge > 0 ? '#A8652D' : '#1B6565';
      }
      influenceX = 0;
      influenceY = 0;
      for (_i = 0, _len = charges.length; _i < _len; _i++) {
        charge = charges[_i];
        distanceX = this.x - charge.x;
        distanceY = this.y - charge.y;
        distanceSquared = Math.max(distanceX ^ 2 + distanceY ^ 2, 5);
        influenceX += charge.charge * distanceX / distanceSquared;
        influenceY += charge.charge * distanceY / distanceSquared;
      }
      this.dx += influenceX * this.charge * accelerationConstant;
      this.dy += influenceY * this.charge * accelerationConstant;
      if (this.x >= canvas.width) {
        console.log(this.x, this.y, this.dx, this.dy, canvas.width, level);
        level += 1;
        return startGame();
      }
    };

    Circle.prototype.draw = function() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      return ctx.fill();
    };

    return Circle;

  })();

  chargeFactory = function(number) {
    var i, _results;
    charges = [];
    _results = [];
    for (i = 1; 1 <= number ? i <= number : i >= number; 1 <= number ? i++ : i--) {
      _results.push(charges.push(new Circle(rand(canvas.width - 50) + 50, rand(canvas.height), rand(10) - 5)));
    }
    return _results;
  };

  mainLoop = function(canvas) {
    var charge, _i, _j, _len, _len2;
    drawBackground();
    player.update();
    player.move();
    for (_i = 0, _len = charges.length; _i < _len; _i++) {
      charge = charges[_i];
      charge.move();
    }
    player.draw();
    for (_j = 0, _len2 = charges.length; _j < _len2; _j++) {
      charge = charges[_j];
      charge.draw();
    }
    if (canvas.id === canvasId) return setTimeout(mainLoop, 1000 / 60, canvas);
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

  startGame = function() {
    var oldCanvas;
    canvasId = Math.random().toString();
    oldCanvas = $('#holdsMyGame canvas').remove();
    $('#holdsMyGame').html("<canvas id='" + canvasId + "' width=" + oldCanvas[0].width + " height=" + oldCanvas[0].height + "></canvas>");
    canvas = document.getElementById(canvasId);
    ctx = canvas.getContext("2d");
    canvas.tabIndex = 1;
    player = new Circle(20, canvas.height / 2, 2, true);
    chargeFactory(level * 4);
    return mainLoop(canvas);
  };

  level = 1;

  startGame();

}).call(this);
