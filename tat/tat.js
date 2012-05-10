(function() {
  var Asteroid, Bullet, Circle, Key, Player, acc, alive, asteroidFactory, asteroidSpeed, asteroids, asteroidsLeft, bullets, canvas, canvasId, chanceShoot, collided, ctx, currentMousePos, decel, detectCollisions, drawBackground, findDistance, firstTime, friendly, gameMode, gameOver, getMousePos, health, lastTime, level, mainLoop, myBulletSpeed, newProjectiles, player, projectiles, rand, revengeBullet, shootBullet, startGame, tat, tatChance, text, theirBulletSpeed, vendors, withinRadius, x,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  acc = 0.6;

  decel = 0.9;

  asteroidSpeed = 1.5;

  health = 5;

  alive = true;

  canvas = document.getElementById("myCanvas");

  canvasId = "myCanvas";

  ctx = canvas.getContext("2d");

  gameOver = false;

  gameMode = 'terror';

  player = "";

  asteroids = [];

  bullets = [];

  projectiles = [];

  newProjectiles = [];

  currentMousePos = {
    x: -1,
    y: -1
  };

  friendly = false;

  level = 1;

  myBulletSpeed = 4;

  theirBulletSpeed = 3.5;

  chanceShoot = 0.01;

  tatChance = 1;

  firstTime = true;

  lastTime = 0;

  vendors = ['ms', 'moz', 'webkit', 'o'];

  x = 0;

  while (x < vendors.length && !window.requestAnimationFrame) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    ++x;
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime, id, timeToCall;
      currTime = new Date().getTime();
      timeToCall = Math.max(0, 16 - (currTime - lastTime));
      id = window.setTimeout((function() {
        return callback(currTime + timeToCall);
      }), timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      return clearTimeout(id);
    };
  }

  withinRadius = function(object1, object2) {
    var dist1, dist2;
    if (object1.radius) {
      dist1 = object1.radius;
    } else if (object1.width) {
      dist1 = object1.width / 2;
    } else {
      return false;
    }
    if (object2.radius) {
      dist2 = object2.radius;
    } else if (object2.width) {
      dist2 = object2.width / 2;
    } else {
      return false;
    }
    if (findDistance(object1, object2) < dist1 + dist2) {
      return true;
    } else {
      return false;
    }
  };

  findDistance = function(object1, object2) {
    var dx, dy;
    if (object1.x === object2.x && object1.y === object2.y) {
      return 2000;
    } else {
      dx = object1.x - object2.x;
      dy = object1.y - object2.y;
      return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }
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

  rand = function(max, min) {
    if (min == null) min = 0;
    return Math.floor(Math.random() * (max - min) + min);
  };

  text = function(text, x, y, color, size, style) {
    if (color == null) color = '#000';
    if (size == null) size = 18;
    if (style == null) style = 'sans-serif';
    ctx.fillStyle = color;
    ctx.font = "bold " + size + "px " + style;
    ctx.textBaseline = 'bottom';
    ctx.fillText(text, x, y);
  };

  asteroidsLeft = function() {
    var num, projectile, _i, _len;
    num = 0;
    for (_i = 0, _len = projectiles.length; _i < _len; _i++) {
      projectile = projectiles[_i];
      if (projectile.asteroid) num += 1;
    }
    return num;
  };

  drawBackground = function() {
    var color, numAsteroids;
    if (health <= 0) startGame(gameMode);
    color = 128;
    ctx.fillStyle = "rgb(" + color + "," + color + "," + color + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    numAsteroids = asteroidsLeft();
    text(gameMode, 10, 30);
    if (friendly) {
      text("friendly", 10, 50);
    } else {
      text("'friendly'", 10, 50);
    }
    if (numAsteroids === 0) {
      level += 1;
      startGame(gameMode);
    } else {
      text(numAsteroids, 10, 590);
    }
  };

  getMousePos = function(event) {
    shootBullet();
    return tat();
  };

  shootBullet = function() {
    var thisBullet, y;
    x = currentMousePos.x;
    y = currentMousePos.y;
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    thisBullet = new Bullet(x, y, player);
    thisBullet.mine = true;
    return projectiles.push(thisBullet);
  };

  revengeBullet = function(asteroid) {
    var thisBullet;
    thisBullet = new Bullet(player.x, player.y, asteroid, theirBulletSpeed);
    thisBullet.mine = false;
    return projectiles.push(thisBullet);
  };

  tat = function() {
    var asteroid, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = projectiles.length; _i < _len; _i++) {
      asteroid = projectiles[_i];
      _results.push(asteroid.asteroid && Math.random() < tatChance ? revengeBullet(asteroid) : void 0);
    }
    return _results;
  };

  collided = function(thisObj, otherObj) {
    if (withinRadius(thisObj, otherObj) && otherObj.danger) {
      if (thisObj.isPlayer && health > 0) {
        health -= 60;
        if (health < 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  detectCollisions = function(index, allObjects) {
    var collisions, i, thisObject;
    i = index;
    collisions = null;
    thisObject = allObjects[i];
    i++;
    while (collisions === null && i < allObjects.length) {
      if (collided(thisObject, allObjects[i])) {
        return i;
      } else {
        i++;
      }
    }
    return null;
  };

  Circle = (function() {

    function Circle(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.dx = 0;
      this.dy = 0;
      this.bounce = true;
      this.danger = true;
      this.alive = true;
      return;
    }

    Circle.prototype.move = function() {
      var margin;
      this.x += this.dx;
      this.y += this.dy;
      margin = 5;
      if (this.loop) {
        if (this.x < 0) this.x += canvas.width;
        if (this.x > canvas.width) this.x -= canvas.width;
        if (this.y < 0) this.y += canvas.height;
        if (this.y > canvas.height) this.y -= canvas.height;
      } else if (this.stay || this.bounce) {
        if (this.bounce) {
          if (this.x < margin || this.x > canvas.width - margin) this.dx *= -1;
          if (this.y < margin || this.y > canvas.height - margin) this.dy *= -1;
        }
        if (this.x < margin) this.x = margin;
        if (this.x > canvas.width - margin) this.x = canvas.width - margin;
        if (this.y < margin) this.y = margin;
        if (this.y > canvas.height - margin) this.y = canvas.height - margin;
      }
    };

    Circle.prototype.draw = function(fillStyle, shadow) {
      var radius, y;
      if (fillStyle == null) fillStyle = 'white';
      if (shadow == null) shadow = false;
      x = this.x;
      y = this.y;
      radius = this.radius;
      ctx.fillStyle = fillStyle;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      if (shadow) {
        ctx.arc(x - shadowX * 2, y - shadowY * 2, radius, 0, Math.PI * 2, false);
      }
      if (!this.invisible) ctx.fill();
    };

    Circle.prototype.update = function() {
      this.x += this.dx;
      this.y += this.dy;
    };

    return Circle;

  })();

  Asteroid = (function(_super) {

    __extends(Asteroid, _super);

    function Asteroid(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius != null ? radius : 13;
      this.dx = Math.random() * asteroidSpeed;
      this.dy = Math.random() * asteroidSpeed;
      this.bounce = true;
      this.danger = true;
      this.asteroid = true;
    }

    Asteroid.prototype.draw = function() {
      if (Math.random() < chanceShoot) revengeBullet(this);
      Asteroid.__super__.draw.call(this, "#614E3D");
    };

    return Asteroid;

  })(Circle);

  asteroidFactory = function(num) {
    var i, newAsteroid, _ref;
    for (i = 1, _ref = Math.floor(num); 1 <= _ref ? i <= _ref : i >= _ref; 1 <= _ref ? i++ : i--) {
      newAsteroid = new Asteroid(10, rand(canvas.height));
      projectiles.push(newAsteroid);
    }
  };

  Bullet = (function(_super) {

    __extends(Bullet, _super);

    function Bullet(xclick, yclick, origin, bulletSpeed, radius) {
      var angle, multiplier, xdistance, ydistance;
      if (origin == null) origin = player;
      if (bulletSpeed == null) bulletSpeed = myBulletSpeed;
      if (radius == null) radius = 3;
      xdistance = xclick - origin.x;
      ydistance = yclick - origin.y;
      angle = Math.atan(ydistance / xdistance);
      if (xdistance > 0) {
        multiplier = 1;
      } else {
        multiplier = -1;
      }
      this.dx = bulletSpeed * Math.cos(angle) * multiplier;
      this.dy = bulletSpeed * Math.sin(angle) * multiplier;
      this.x = Math.floor(origin.x + (origin.radius + radius + 2) * Math.cos(angle) * multiplier);
      this.y = Math.floor(origin.y + (origin.radius + radius + 2) * Math.sin(angle) * multiplier);
      this.bounce = false;
      this.radius = radius;
      this.danger = true;
    }

    Bullet.prototype.draw = function() {
      return Bullet.__super__.draw.call(this, '#2B241D');
    };

    return Bullet;

  })(Circle);

  Player = (function(_super) {

    __extends(Player, _super);

    function Player(x, y, radius, health) {
      this.x = x != null ? x : canvas.width / 2;
      this.y = y != null ? y : canvas.height / 2;
      this.radius = radius != null ? radius : 10;
      this.health = health != null ? health : 100;
      this.bounce = true;
      this.danger = true;
      this.dx = 0;
      this.dy = 0;
      this.isPlayer = true;
    }

    Player.prototype.update = function() {
      if (Key.isDown(Key.UP) || Key.isDown(Key.W)) this.dy -= acc;
      if (Key.isDown(Key.DOWN) || Key.isDown(Key.S)) this.dy += acc;
      if (Key.isDown(Key.LEFT) || Key.isDown(Key.A)) this.dx -= acc;
      if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) this.dx += acc;
      this.dy *= decel;
      this.dx *= decel;
    };

    Player.prototype.draw = function() {
      return Player.__super__.draw.call(this, '#B5A18F');
    };

    return Player;

  })(Circle);

  mainLoop = function(canvas) {
    var collidedWith, i, thing, thing2, thingy, _i, _j, _k, _len, _len2, _len3;
    if (alive) {
      window.requestAnimationFrame(mainLoop, canvas);
    } else {
      startGame(gameMode);
    }
    alive = true;
    drawBackground();
    for (_i = 0, _len = projectiles.length; _i < _len; _i++) {
      thing = projectiles[_i];
      thing.draw();
    }
    for (_j = 0, _len2 = projectiles.length; _j < _len2; _j++) {
      thingy = projectiles[_j];
      thingy.move();
    }
    for (_k = 0, _len3 = projectiles.length; _k < _len3; _k++) {
      thing2 = projectiles[_k];
      thing2.update();
    }
    i = 0;
    while (i < projectiles.length) {
      collidedWith = detectCollisions(i, projectiles);
      if (collidedWith && !(projectiles[collidedWith].asteroid && projectiles[i].asteroid)) {
        if (friendly || (projectiles[i].asteroid && projectiles[collidedWith].mine) || (projectiles[collidedWith].asteroid && projectiles[i].mine)) {
          projectiles.splice(collidedWith, 1);
          projectiles.splice(i, 1);
        } else {
          i++;
        }
      } else {
        i++;
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
    var oldCanvas;
    if (mode == null) mode = gameMode;
    canvasId = Math.random().toString();
    oldCanvas = $('#holdsMyGame canvas').remove();
    $('#holdsMyGame').html("<canvas id='" + canvasId + "' width=" + oldCanvas[0].width + " height=" + oldCanvas[0].height + "></canvas>");
    canvas = document.getElementById(canvasId);
    ctx = canvas.getContext("2d");
    canvas.tabIndex = 1;
    gameMode = mode;
    projectiles.length = 0;
    player = new Player();
    projectiles.push(player);
    asteroidFactory(level + Math.pow(level, 1.5));
    health = 100 + 10 * level;
    if (firstTime) {
      firstTime = false;
      mainLoop(canvas);
    }
  };

  jQuery(function($) {
    $('#normal').click(function() {
      level = 1;
      myBulletSpeed = 3.5;
      theirBulletSpeed = 1.5;
      tatChance = 0.3;
      chanceShoot = 0;
      startGame('normal');
    });
    $('#terror').click(function() {
      level = 1;
      myBulletSpeed = 4;
      theirBulletSpeed = 3.5;
      chanceShoot = 0.01;
      tatChance = 1;
      startGame('terror');
    });
    $('#war').click(function() {
      level = 1;
      myBulletSpeed = 4;
      theirBulletSpeed = 0.8;
      chanceShoot = 0.06;
      tatChance = 0.4;
      startGame('war');
    });
    $('#friendly').click(function() {
      level = 1;
      friendly = true;
      return startGame();
    });
    $('#fire').click(function() {
      level = 1;
      friendly = false;
      return startGame();
    });
    return $(document).mousemove(function(event) {
      return currentMousePos = {
        x: event.pageX,
        y: event.pageY
      };
    });
  });

  $(document).mousedown(getMousePos);

  startGame(gameMode);

  window.api = {
    startGame: startGame
  };

}).call(this);
