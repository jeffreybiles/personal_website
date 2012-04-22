(function() {
  var Circle, Enemy, Key, Nucleus, Player, accelerationConstant, angleChangeRate, canvas, canvasId, checkAllCollisions, checkAtomsCollision, checkOneCollision, collision, ctx, decel, drawBackground, electronCollision, electronRad, enemies, enemyFactory, filterEnemies, hitSpeed, level, loadAndPlaySound, mainLoop, maxVelocity, nucleusRad, numEnemies, otherSpeed, player, playerAcceleration, radChangeRate, radMax, rand, spikeSize, startGame,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  canvas = document.getElementById("myCanvas");

  canvasId = "myCanvas";

  ctx = canvas.getContext("2d");

  decel = 0.96;

  spikeSize = 10;

  nucleusRad = 15;

  electronRad = 7;

  radChangeRate = 2;

  radMax = 100;

  angleChangeRate = 15;

  hitSpeed = 15;

  otherSpeed = 1;

  level = 1;

  accelerationConstant = 0.0001;

  playerAcceleration = 0.20;

  maxVelocity = 1;

  player = '';

  enemies = [];

  rand = function(max) {
    return Math.ceil(Math.random() * max);
  };

  numEnemies = function() {
    return Math.floor(Math.pow(level, 1.8));
  };

  drawBackground = function() {
    ctx.fillStyle = '#CCA981';
    return ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  loadAndPlaySound = function(fileName) {
    var sound;
    sound = document.createElement('audio');
    sound.setAttribute('src', "" + fileName);
    sound.load();
    return sound.play();
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

    function Circle() {}

    Circle.prototype.move = function() {
      var _ref, _ref2;
      this.dx *= decel;
      this.dy *= decel;
      if ((0 < (_ref = this.y) && _ref < canvas.height) && (0 < (_ref2 = this.x) && _ref2 < canvas.width)) {
        return this.draw();
      } else {
        this.stillAlive = false;
        return loadAndPlaySound('defeat.ogg');
      }
    };

    Circle.prototype.draw = function() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, nucleusRad, 0, Math.PI * 2, false);
      return ctx.fill();
    };

    return Circle;

  })();

  Nucleus = (function(_super) {

    __extends(Nucleus, _super);

    function Nucleus(x, y, radius, isPlayer, color, nucleusColor) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.isPlayer = isPlayer;
      this.color = color != null ? color : 'black';
      this.nucleusColor = nucleusColor != null ? nucleusColor : '#A8652D';
      this.angle = 0;
      this.dx = 0;
      this.dy = 0;
      this.stillAlive = true;
    }

    Nucleus.prototype.move = function() {
      this.angle += angleChangeRate / (30 + this.radius);
      this.x += this.dx;
      this.y += this.dy;
      this.electronX = this.x + Math.cos(this.angle) * this.radius;
      this.electronY = this.y + Math.sin(this.angle) * this.radius;
      return Nucleus.__super__.move.apply(this, arguments);
    };

    Nucleus.prototype.draw = function() {
      ctx.fillStyle = this.nucleusColor;
      ctx.beginPath();
      ctx.arc(this.electronX, this.electronY, electronRad, 0, Math.PI * 2, false);
      ctx.fill();
      return Nucleus.__super__.draw.apply(this, arguments);
    };

    return Nucleus;

  })(Circle);

  Player = (function(_super) {

    __extends(Player, _super);

    function Player(x, y, radius) {
      Player.__super__.constructor.call(this, x, y, radius, true);
    }

    Player.prototype.update = function() {
      if (Key.isDown(Key.UP) || Key.isDown(Key.W)) this.dy -= playerAcceleration;
      if (Key.isDown(Key.DOWN) || Key.isDown(Key.S)) this.dy += playerAcceleration;
      if (Key.isDown(Key.LEFT) || Key.isDown(Key.A)) this.dx -= playerAcceleration;
      if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) {
        this.dx += playerAcceleration;
      }
      if (Key.isDown(Key.SPACE)) {
        if (this.radius < radMax) return this.radius += radChangeRate;
      } else if (this.radius > nucleusRad + electronRad + 1) {
        return this.radius -= radChangeRate;
      }
    };

    return Player;

  })(Nucleus);

  Enemy = (function(_super) {

    __extends(Enemy, _super);

    function Enemy(x, y, radius) {
      this.outward = true;
      Enemy.__super__.constructor.call(this, x, y, radius, false, '#777777', '#333333');
    }

    Enemy.prototype.update = function() {
      this.dx += (player.x - this.x) * 0.00035 * (1.2 - enemies.length / numEnemies());
      this.dy += (player.y - this.y) * 0.00035 * (1.2 - enemies.length / numEnemies());
      if (Math.random() < 0.05) this.outward = !this.outward;
      if (this.outward) {
        if (this.radius < radMax) return this.radius += radChangeRate;
      } else {
        if (this.radius > nucleusRad + electronRad + 1) {
          return this.radius -= radChangeRate;
        }
      }
    };

    return Enemy;

  })(Nucleus);

  enemyFactory = function(number) {
    var i, _results;
    enemies = [];
    _results = [];
    for (i = 1; 1 <= number ? i <= number : i >= number; 1 <= number ? i++ : i--) {
      _results.push(enemies.push(new Enemy(rand(canvas.width), rand(canvas.height), 20)));
    }
    return _results;
  };

  collision = function(hitter, hittee, modifiers) {
    if (modifiers == null) modifiers = 1;
    hittee.dx = Math.cos(hitter.angle + Math.PI / 2) * hitSpeed * modifiers;
    hittee.dy = Math.sin(hitter.angle + Math.PI / 2) * hitSpeed * modifiers;
    return loadAndPlaySound('hit.ogg');
  };

  electronCollision = function(atom1, atom2) {
    collision(atom1, atom2, 0.3);
    return collision(atom2, atom1, 0.3);
  };

  checkOneCollision = function(x1, y1, x2, y2, radius) {
    var distance;
    distance = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
    if (distance < Math.pow(radius, 2)) {
      return true;
    } else {
      return false;
    }
  };

  checkAtomsCollision = function(atom1, atom2) {
    if (checkOneCollision(atom1.x, atom1.y, atom2.electronX, atom2.electronY, nucleusRad + electronRad)) {
      collision(atom2, atom1);
    }
    if (checkOneCollision(atom1.electronX, atom1.electronY, atom2.x, atom2.y, nucleusRad + electronRad)) {
      collision(atom1, atom2);
    }
    if (checkOneCollision(atom1.electronX, atom1.electronY, atom2.electronX, atom2.electronY, electronRad + electronRad)) {
      return electronCollision(atom1, atom2);
    }
  };

  checkAllCollisions = function() {
    var enemy, i, j;
    i = 0;
    while (i < enemies.length) {
      enemy = enemies[i];
      checkAtomsCollision(enemy, player);
      j = i + 1;
      while (j < enemies.length) {
        checkAtomsCollision(enemy, enemies[j]);
        j++;
      }
      i++;
    }
    return filterEnemies();
  };

  filterEnemies = function() {
    var i, _results;
    i = 0;
    _results = [];
    while (i < enemies.length) {
      if (enemies[i].stillAlive) {
        _results.push(i++);
      } else {
        _results.push(enemies.splice(i, 1));
      }
    }
    return _results;
  };

  mainLoop = function(canvas) {
    var enemy, _i, _j, _k, _len, _len2, _len3;
    drawBackground();
    player.update();
    player.move();
    player.draw();
    for (_i = 0, _len = enemies.length; _i < _len; _i++) {
      enemy = enemies[_i];
      enemy.update();
    }
    for (_j = 0, _len2 = enemies.length; _j < _len2; _j++) {
      enemy = enemies[_j];
      enemy.move();
    }
    for (_k = 0, _len3 = enemies.length; _k < _len3; _k++) {
      enemy = enemies[_k];
      enemy.draw();
    }
    checkAllCollisions();
    if (enemies.length === 0) {
      level++;
      startGame();
    }
    if (!player.stillAlive) {
      return startGame();
    } else if (canvas.id === canvasId) {
      return setTimeout(mainLoop, 1000 / 30, canvas);
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

  startGame = function() {
    var oldCanvas;
    canvasId = Math.random().toString();
    oldCanvas = $('#holdsMyGame canvas').remove();
    $('#holdsMyGame').html("<canvas id='" + canvasId + "' width=" + oldCanvas[0].width + " height=" + oldCanvas[0].height + "></canvas>");
    canvas = document.getElementById(canvasId);
    ctx = canvas.getContext("2d");
    canvas.tabIndex = 1;
    player = new Player(canvas.width / 2, canvas.height / 2, 20, true);
    console.log("created a player");
    enemyFactory(numEnemies());
    console.log(numEnemies(), enemies.length);
    return mainLoop(canvas);
  };

  level = 1;

  startGame();

}).call(this);
