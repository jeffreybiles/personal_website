(function() {
  var Rectangle, canvas, canvasId, changeBasedOnScore, ctx, currentMousePos, drawBackground, drawGameOverScreen, drawHeart, drawScoreNumber, drawTimer, gameOver, gameState, getMousePos, health, heartColor, heartHeight, imprecision, largeBox, letterHeight, mainLoop, maxHealth, maxSpeed, maxTimer, mediumBox, numLarge, numMedium, numScary, numSmall, rectangleFactory, rectangles, resize, scaryRedThing, score, smallBox, speedMultiplier, startGame, timer,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  canvas = document.getElementById("myCanvas");

  canvasId = "myCanvas";

  ctx = canvas.getContext("2d");

  currentMousePos = [0, 0];

  score = 0;

  maxHealth = 3;

  health = 3;

  maxSpeed = 2;

  maxTimer = 60;

  timer = 60;

  speedMultiplier = 1;

  imprecision = 4;

  numSmall = 4;

  numMedium = 4;

  numLarge = 4;

  numScary = 4;

  rectangles = [];

  heartHeight = 15;

  letterHeight = 15;

  heartColor = '#456789';

  gameState = 'play';

  drawBackground = function() {
    var color, i, startY, x;
    color = Math.round(256 * timer / maxTimer);
    ctx.fillStyle = "rgb(" + color + ", " + color + ", " + color + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    x = 5;
    startY = (letterHeight + 1) * 4;
    if (health > 0) {
      for (i = 1; 1 <= health ? i <= health : i >= health; 1 <= health ? i++ : i--) {
        drawHeart(x, startY + i * (heartHeight + 5));
      }
    }
    startY = letterHeight;
    for (i = 0; i <= 3; i++) {
      drawScoreNumber(x, startY + letterHeight * i, (score * Math.pow(10, i) / 1000) % 10);
    }
    return drawTimer(canvas.width - 50, 10);
  };

  drawTimer = function(x, y) {
    ctx.fillStyle = 'black';
    ctx.font = "bold " + letterHeight + "px helvetica sans-serif";
    ctx.textBaseline = 'middle';
    return ctx.fillText(Math.round(timer), x, y);
  };

  drawHeart = function(x, y) {
    ctx.fillStyle = heartColor;
    return ctx.fillRect(x, y, heartHeight, heartHeight);
  };

  drawScoreNumber = function(x, y, number) {
    ctx.fillStyle = 'black';
    ctx.font = "bold " + letterHeight + "px helvetica sans-serif";
    ctx.textBaseline = 'middle';
    return ctx.fillText(Math.floor(number), x, y);
  };

  drawGameOverScreen = function() {
    ctx.fillStyle = 'white';
    ctx.font = "bold " + (Math.floor(letterHeight * 2 * canvas.width / 320)) + "px helvetica sans-serif";
    ctx.textBaseline = 'middle';
    return ctx.fillText('GAME OVER', 25, 150);
  };

  changeBasedOnScore = function() {
    speedMultiplier = (1 + score / 50) * canvas.width / 320;
    return maxTimer = 60 / (1 + score / 20);
  };

  resize = function(canvas) {
    var winH, winW;
    if (canvas == null) canvas = canvas;
    if (document.body && document.body.offsetWidth) {
      winW = document.body.offsetWidth;
      winH = document.body.offsetHeight;
    }
    if (document.compatMode === 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) {
      winW = document.documentElement.offsetWidth;
      winH = document.documentElement.offsetHeight;
    }
    if (window.innerWidth && window.innerHeight) {
      winW = window.innerWidth;
      winH = window.innerHeight;
    }
    if (winW > winH) {
      winW = winH;
    } else {
      winH = winW;
    }
    canvas.width = winW;
    canvas.height = winH;
    return canvas;
  };

  Rectangle = (function() {

    function Rectangle(height, width, color, points, x, y, type, speed) {
      this.height = height;
      this.width = width;
      this.color = color;
      this.points = points;
      this.x = x;
      this.y = y;
      this.type = type;
      this.speed = speed;
      this.angle = Math.random() * 2 * Math.PI;
      this.dx = Math.cos(this.angle) * this.speed;
      this.dy = Math.sin(this.angle) * this.speed;
      this.stillAlive = true;
    }

    Rectangle.prototype.draw = function() {
      ctx.fillStyle = this.color;
      return ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    Rectangle.prototype.isInRange = function(clickX, clickY) {
      return (this.x - imprecision < clickX && clickX < this.x + this.width + imprecision) && (this.y - imprecision < clickY && clickY < this.y + this.height + imprecision);
    };

    Rectangle.prototype.onClick = function() {
      if (this.points > 0) {
        score += this.points;
        timer = maxTimer;
        changeBasedOnScore();
      } else {
        health -= 1;
      }
      return this.stillAlive = false;
    };

    Rectangle.prototype.move = function() {
      this.x += this.dx;
      this.y += this.dy;
      if (this.x <= 0) {
        this.x = 0;
        this.dx *= -1;
      }
      if (this.y <= 0) {
        this.y = 0;
        this.dy *= -1;
      }
      if (this.x >= canvas.width - this.width) {
        this.x = canvas.width - this.width;
        this.dx *= -1;
      }
      if (this.y >= canvas.height - this.height) {
        this.y = canvas.height - this.height;
        return this.dy *= -1;
      }
    };

    return Rectangle;

  })();

  smallBox = (function(_super) {

    __extends(smallBox, _super);

    function smallBox(x, y) {
      var size;
      size = canvas.width * 0.05;
      smallBox.__super__.constructor.call(this, size, size, 'black', 3, x, y, 'small', 1.4 * speedMultiplier);
    }

    return smallBox;

  })(Rectangle);

  mediumBox = (function(_super) {

    __extends(mediumBox, _super);

    function mediumBox(x, y) {
      var size;
      size = canvas.width * 0.075;
      mediumBox.__super__.constructor.call(this, size, size, 'black', 2, x, y, 'medium', 1.25 * speedMultiplier);
    }

    return mediumBox;

  })(Rectangle);

  largeBox = (function(_super) {

    __extends(largeBox, _super);

    function largeBox(x, y) {
      var size;
      size = canvas.width * 0.1;
      largeBox.__super__.constructor.call(this, size, size, 'black', 1, x, y, 'large', 1 * speedMultiplier);
    }

    return largeBox;

  })(Rectangle);

  scaryRedThing = (function(_super) {

    __extends(scaryRedThing, _super);

    function scaryRedThing(x, y) {
      var size;
      size = canvas.width * 0.04;
      scaryRedThing.__super__.constructor.call(this, size, size * 8, 'red', -1, x, y, 'scary', 1.25 * speedMultiplier);
    }

    return scaryRedThing;

  })(Rectangle);

  rectangleFactory = function(type, number) {
    var i, newRectangle, x, y, _results;
    _results = [];
    for (i = 1; 1 <= number ? i <= number : i >= number; 1 <= number ? i++ : i--) {
      x = Math.random() * canvas.width;
      y = Math.random() * canvas.height;
      newRectangle = (function() {
        switch (type) {
          case 'small':
            return new smallBox(x, y);
          case 'medium':
            return new mediumBox(x, y);
          case 'large':
            return new largeBox(x, y);
          case 'scary':
            return new scaryRedThing(x, y);
        }
      })();
      _results.push(rectangles.push(newRectangle));
    }
    return _results;
  };

  getMousePos = function(event) {
    var x, y;
    x = currentMousePos.x;
    y = currentMousePos.y;
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    if (gameState === 'play') {
      rectangles.forEach(function(rectangle) {
        if (rectangle.isInRange(x, y)) return rectangle.onClick();
      });
    }
    if (gameState === 'gameOver') {
      gameState = 'play';
      return startGame();
    }
  };

  mainLoop = function(canvas) {
    var currentBox, i, rectangle, type, _i, _j, _len, _len2;
    drawBackground();
    for (_i = 0, _len = rectangles.length; _i < _len; _i++) {
      rectangle = rectangles[_i];
      rectangle.move();
    }
    for (_j = 0, _len2 = rectangles.length; _j < _len2; _j++) {
      rectangle = rectangles[_j];
      rectangle.draw();
    }
    i = 0;
    while (i < rectangles.length) {
      currentBox = rectangles[i];
      if (currentBox.stillAlive) {
        i++;
      } else {
        type = currentBox.type;
        rectangles.splice(i, 1);
        rectangleFactory(type, 1);
      }
    }
    timer -= 1 / 60;
    if (health <= 0 || timer <= 0) {
      gameState = 'gameOver';
      return gameOver();
    } else {
      return setTimeout(mainLoop, 1000 / 60, canvas);
    }
  };

  gameOver = function() {
    return drawGameOverScreen();
  };

  startGame = function() {
    maxTimer = 60;
    timer = maxTimer;
    speedMultiplier = 1;
    score = 0;
    health = maxHealth;
    rectangles = [];
    rectangleFactory('small', numSmall);
    rectangleFactory('medium', numMedium);
    rectangleFactory('large', numLarge);
    rectangleFactory('scary', numScary);
    return mainLoop(canvas);
  };

  jQuery(function($) {
    return $(document).mousemove(function(event) {
      return currentMousePos = {
        x: event.pageX,
        y: event.pageY
      };
    });
  });

  $(document).mousedown(getMousePos);

  canvas = resize(canvas);

  speedMultiplier *= canvas.width / 320;

  startGame();

}).call(this);
