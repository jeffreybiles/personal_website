(function() {
  var Enemy, Key, Player, Square, answer, boardHeight, boardWidth, canvas, canvasId, checkEnemies, cooldown, cooldownTimer, ctx, difficulty, drawBackground, drawEnemies, drawGrid, enemies, enemyFactory, frequency, gameMode, gameOver, health, level, mainLoop, makeNumberGrid, moveAllEnemies, newAnswer, newEquation, numbers, player, rand, revertColor, score, startGame, startingHealth, style, text,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  boardWidth = 7;

  boardHeight = 7;

  score = 3;

  startingHealth = 3;

  health = startingHealth;

  canvas = document.getElementById("myCanvas");

  canvasId = "myCanvas";

  ctx = canvas.getContext("2d");

  gameMode = 'normal';

  player = "";

  enemies = [];

  level = 1;

  difficulty = 5;

  frequency = 1000;

  cooldown = false;

  gameOver = false;

  numbers = [[], []];

  answer = 5;

  style = 'subtract';

  text = function(text, x, y, color, size, style) {
    if (color == null) color = '#000';
    if (size == null) size = 18;
    if (style == null) style = 'sans-serif';
    ctx.fillStyle = color;
    ctx.font = "bold " + size + "px " + style;
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
  };

  newEquation = function() {
    var first;
    if (style === 'add') {
      return "" + (rand(difficulty + score)) + " + " + (rand(difficulty + score));
    } else if (style === 'subtract') {
      first = rand(difficulty * 2 + score);
      return "" + first + " - " + (rand(first));
    }
  };

  makeNumberGrid = function() {
    var equation, i, j, numberColumn, _results;
    numbers.length = 0;
    _results = [];
    for (i = 1; 1 <= boardWidth ? i <= boardWidth : i >= boardWidth; 1 <= boardWidth ? i++ : i--) {
      numberColumn = [];
      for (j = 1; 1 <= boardHeight ? j <= boardHeight : j >= boardHeight; 1 <= boardHeight ? j++ : j--) {
        equation = newEquation();
        numberColumn[j] = equation;
      }
      _results.push(numbers[i] = numberColumn);
    }
    return _results;
  };

  drawBackground = function() {
    var color;
    color = 200;
    ctx.fillStyle = "rgb(" + color + "," + color + "," + color + ")";
    return ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  drawGrid = function() {
    var height, i, j, offset, width;
    height = canvas.height / (boardHeight + 2);
    width = canvas.width / (boardWidth + 2);
    ctx.strokeStyle = "black";
    for (i = 1; 1 <= boardWidth ? i <= boardWidth : i >= boardWidth; 1 <= boardWidth ? i++ : i--) {
      for (j = 1; 1 <= boardHeight ? j <= boardHeight : j >= boardHeight; 1 <= boardHeight ? j++ : j--) {
        ctx.strokeRect(i * width, j * height, width, height);
        if (difficulty >= 12) {
          offset = 0.2;
        } else {
          offset = 0.3;
        }
        text(numbers[i][j], (i + offset) * width, (j + 0.5) * height);
      }
    }
    text("health: " + health, 10, 30);
    text("score: " + score, 10, 50);
    text("target: " + answer, canvas.width - 100, 30);
  };

  cooldownTimer = function() {
    return cooldown = false;
  };

  Key = {
    _pressed: {},
    LEFT: 37,
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
      this._pressed[event.keyCode] = true;
      if (event.keyCode === 32) {
        return player.nom();
      } else {
        if (!cooldown) {
          cooldown = true;
          setTimeout(cooldownTimer, 70);
          return player.move(event.keyCode);
        }
      }
    },
    onKeyup: function(event) {
      return delete this._pressed[event.keyCode];
    }
  };

  rand = function(max, min) {
    if (min == null) min = 0;
    return Math.floor(Math.random() * (max - min) + min);
  };

  newAnswer = function() {
    var i, j;
    i = rand(boardWidth, 1);
    j = rand(boardHeight, 1);
    return answer = eval(numbers[i][j]);
  };

  Square = (function() {

    function Square(x, y) {
      this.x = x;
      this.y = y;
      this.height = canvas.height / (boardHeight + 2);
      this.width = canvas.width / (boardWidth + 2);
      this.color = '#938493';
    }

    Square.prototype.draw = function(fillStyle) {
      var x, y;
      if (fillStyle == null) fillStyle = this.color;
      x = this.x * this.width;
      y = this.y * this.height;
      ctx.fillStyle = fillStyle;
      ctx.fillRect(x, y, this.width, this.height);
    };

    return Square;

  })();

  Enemy = (function(_super) {

    __extends(Enemy, _super);

    function Enemy() {
      var roll;
      this.height = canvas.height / (boardHeight + 2);
      this.width = canvas.width / (boardWidth + 2);
      this.stillAround = true;
      roll = Math.random();
      if (roll < 0.4) {
        this.type = 'horizontal';
        this.x = 0;
        this.y = rand(boardHeight) + 1;
        this.color = '#906666';
      } else if (roll < 0.8) {
        this.type = 'vertical';
        this.y = 0;
        this.x = rand(boardWidth) + 1;
        this.color = '#C0A6A6';
      } else if (roll < 0.97) {
        this.type = 'wander';
        this.x = 0;
        this.y = rand(boardHeight) + 1;
        this.color = '#7D26CD';
      } else {
        this.type = 'chase';
        this.x = 0;
        this.y = rand(boardHeight) + 1;
        this.color = '#EE7621';
      }
    }

    Enemy.prototype.move = function() {
      var roll, _ref, _ref2;
      switch (this.type) {
        case 'horizontal':
          this.x += 1;
          break;
        case 'vertical':
          this.y += 1;
          break;
        case 'wander':
          roll = Math.random();
          if (roll < 0.25) {
            this.x += 1;
          } else if (roll < 0.5) {
            this.x -= 1;
          } else if (roll < 0.75) {
            this.y += 1;
          } else {
            this.y -= 1;
          }
          break;
        default:
          if (this.x > player.x) {
            this.x -= 1;
          } else if (this.x < player.x) {
            this.x += 1;
          } else if (this.y > player.y) {
            this.y -= 1;
          } else {
            this.y += 1;
          }
      }
      if (!((-1 < (_ref = this.x) && _ref < boardWidth + 1) && (-1 < (_ref2 = this.y) && _ref2 < boardHeight + 1))) {
        return this.stillAround = false;
      }
    };

    return Enemy;

  })(Square);

  moveAllEnemies = function(canvas) {
    var enemy, _i, _len;
    for (_i = 0, _len = enemies.length; _i < _len; _i++) {
      enemy = enemies[_i];
      enemy.move();
    }
    checkEnemies();
    if (canvas.id === canvasId) {
      return setTimeout(moveAllEnemies, frequency, canvas);
    }
  };

  drawEnemies = function() {
    var enemy, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = enemies.length; _i < _len; _i++) {
      enemy = enemies[_i];
      _results.push(enemy.draw());
    }
    return _results;
  };

  enemyFactory = function(num) {
    var i, newEnemy, _ref;
    if (num <= 0) return;
    for (i = 1, _ref = Math.floor(num); 1 <= _ref ? i <= _ref : i >= _ref; 1 <= _ref ? i++ : i--) {
      newEnemy = new Enemy();
      enemies.push(newEnemy);
    }
  };

  checkEnemies = function() {
    var i;
    player.checkCollisions();
    i = 0;
    while (i < enemies.length) {
      if (enemies[i].stillAround) {
        i++;
      } else {
        enemies.splice(i, 1);
      }
    }
    enemyFactory(score / 3 - enemies.length);
    if (health <= 0) return startGame();
  };

  Player = (function(_super) {

    __extends(Player, _super);

    function Player() {
      Player.__super__.constructor.apply(this, arguments);
    }

    Player.prototype.move = function() {
      if (Key.isDown(Key.UP) || Key.isDown(Key.W)) {
        this.y -= 1;
      } else if (Key.isDown(Key.DOWN) || Key.isDown(Key.S)) {
        this.y += 1;
      } else if (Key.isDown(Key.LEFT) || Key.isDown(Key.A)) {
        this.x -= 1;
      } else if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) {
        this.x += 1;
      }
      if (this.y < 1) this.y = 1;
      if (this.y > boardHeight) this.y = boardHeight;
      if (this.x < 1) this.x = 1;
      if (this.x > boardWidth) this.x = boardWidth;
      return checkEnemies();
    };

    Player.prototype.checkCollisions = function() {
      if (this.isHit()) return health -= 1;
    };

    Player.prototype.isHit = function() {
      var enemy, _i, _len;
      for (_i = 0, _len = enemies.length; _i < _len; _i++) {
        enemy = enemies[_i];
        if (this.y === enemy.y && this.x === enemy.x) {
          enemy.stillAround = false;
          return true;
        }
      }
      return false;
    };

    Player.prototype.nom = function() {
      var equation, oldColor;
      equation = numbers[this.x][this.y];
      oldColor = this.color;
      if (eval(equation) === answer) {
        this.color = 'green';
        setTimeout(revertColor, 300, oldColor);
        score += 1;
        health += 0.25;
        numbers[this.x][this.y] = newEquation();
        return newAnswer();
      } else {
        this.color = 'red';
        setTimeout(revertColor, 300, oldColor);
        return health -= 1;
      }
    };

    return Player;

  })(Square);

  revertColor = function(color) {
    return player.color = color;
  };

  mainLoop = function(canvas) {
    var alive;
    alive = true;
    drawBackground();
    player.draw();
    drawEnemies();
    drawGrid();
    if (canvasId === canvas.id) setTimeout(mainLoop, 1000 / 60, canvas);
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
    makeNumberGrid();
    canvasId = Math.random().toString();
    oldCanvas = $('#holdsMyGame canvas').remove();
    $('#holdsMyGame').html("<canvas id='" + canvasId + "' width=" + oldCanvas[0].width + " height=" + oldCanvas[0].height + "></canvas>");
    canvas = document.getElementById(canvasId);
    ctx = canvas.getContext("2d");
    canvas.tabIndex = 1;
    cooldown = false;
    score = 0;
    level = 1;
    health = 3;
    enemies = [];
    player = new Player(3, 3);
    newAnswer();
    enemyFactory(score);
    setTimeout(moveAllEnemies, frequency, canvas);
    return mainLoop(canvas);
  };

  jQuery(function($) {
    $('#easy').click(function() {
      difficulty = 5;
      startGame();
    });
    $('#normal').click(function() {
      difficulty = 11;
      startGame();
    });
    $('#hard').click(function() {
      difficulty = 31;
      startGame();
    });
    $('#add').click(function() {
      style = 'add';
      startGame();
    });
    return $('#subtract').click(function() {
      style = 'subtract';
      startGame();
    });
  });

  startGame();

}).call(this);
