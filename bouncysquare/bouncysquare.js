(function() {
  var Rectangle, canvas, canvasId, ctx, drawBackground, health, largeBox, mainLoop, maxSpeed, mediumBox, numLarge, numMedium, numScary, numSmall, rectangleFactory, rectangles, scaryRedThing, score, smallBox, startGame, timer,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  canvas = document.getElementById("myCanvas");

  canvasId = "myCanvas";

  ctx = canvas.getContext("2d");

  score = 0;

  health = 3;

  maxSpeed = 2;

  timer = 30;

  numSmall = 4;

  numMedium = 4;

  numLarge = 4;

  numScary = 4;

  rectangles = [];

  drawBackground = function() {
    var color;
    color = 200;
    ctx.fillStyle = "rgb(" + color + ", " + color + ", " + color + ")";
    return ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  Rectangle = (function() {

    function Rectangle(height, width, color, points, x, y, type, dx, dy) {
      this.height = height;
      this.width = width;
      this.color = color;
      this.points = points;
      this.x = x;
      this.y = y;
      this.type = type;
      if (dx == null) dx = null;
      if (dy == null) dy = null;
      this.dx = dx || Math.random() * maxSpeed;
      this.dy = dy || Math.random() * maxSpeed;
      this.alive = true;
    }

    Rectangle.prototype.draw = function() {
      ctx.fillStyle = this.color;
      return ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    Rectangle.prototype.isInRange = function(clickX, clickY) {
      return (this.x < clickX && clickX < this.x + this.width) && (this.y < clickY && clickY < this.y + height);
    };

    Rectangle.prototype.onClick = function() {
      if (this.points > 0) {
        score += this.points;
      } else {
        health -= 1;
      }
      return this.alive = false;
    };

    Rectangle.prototype.move = function() {
      this.x += this.dx;
      return this.y += this.dx;
    };

    return Rectangle;

  })();

  smallBox = (function(_super) {

    __extends(smallBox, _super);

    function smallBox(x, y) {
      smallBox.__super__.constructor.call(this, 16, 16, 'black', 1, x, y, 'small');
    }

    return smallBox;

  })(Rectangle);

  mediumBox = (function(_super) {

    __extends(mediumBox, _super);

    function mediumBox(x, y) {
      mediumBox.__super__.constructor.call(this, 24, 24, 'black', 2, x, y, 'medium');
    }

    return mediumBox;

  })(Rectangle);

  largeBox = (function(_super) {

    __extends(largeBox, _super);

    function largeBox(x, y) {
      largeBox.__super__.constructor.call(this, 36, 36, 'black', 3, x, y, 'large');
    }

    return largeBox;

  })(Rectangle);

  scaryRedThing = (function(_super) {

    __extends(scaryRedThing, _super);

    function scaryRedThing(x, y) {
      scaryRedThing.__super__.constructor.call(this, 10, 100, 'red', -1, x, y, 'scary');
    }

    return scaryRedThing;

  })(Rectangle);

  rectangleFactory = function(type, number, x, y) {
    var i, newRectangle, _results;
    if (x == null) x = null;
    if (y == null) y = null;
    _results = [];
    for (i = 1; 1 <= number ? i <= number : i >= number; 1 <= number ? i++ : i--) {
      x || (x = Math.random() * canvas.width);
      y || (y = Math.random() * canvas.height);
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

  mainLoop = function(canvas) {
    var rectangle, _i, _j, _len, _len2;
    drawBackground();
    for (_i = 0, _len = rectangles.length; _i < _len; _i++) {
      rectangle = rectangles[_i];
      rectangle.move();
    }
    for (_j = 0, _len2 = rectangles.length; _j < _len2; _j++) {
      rectangle = rectangles[_j];
      rectangle.draw();
    }
    if (canvas.id === canvasId) return setTimeout(mainLoop, 1000 / 60, canvas);
  };

  startGame = function() {
    var oldCanvas;
    canvasId = Math.random().toString();
    oldCanvas = $('#holdsMyGame canvas').remove();
    $('#holdsMyGame').html("<canvas id='" + canvasId + "' width=" + oldCanvas[0].width + " height=" + oldCanvas[0].height + "></canvas>");
    canvas = document.getElementById(canvasId);
    ctx = canvas.getContext("2d");
    canvas.tabIndex = 1;
    timer = 30;
    score = 0;
    rectangleFactory('small', numSmall);
    rectangleFactory('medium', numMedium);
    rectangleFactory('large', numLarge);
    rectangleFactory('scary', numScary);
    return mainLoop(canvas);
  };

  startGame();

}).call(this);
