(function() {
  var Triangle;
  Triangle = function(x, y, angle, height, width) {
    if (height == null) {
      height = 30;
    }
    if (width == null) {
      width = 20;
    }
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.height = height;
    this.width = width;
    return this.speed = 0;
  };
  Triangle.prototype.draw = function() {
    var angle, height, leftPoint, rightPoint, toSide, toTop, topPoint, width, x, y;
    x = this.x;
    y = this.y;
    angle = this.angle;
    height = this.height;
    width = this.width;
    toTop = [Math.cos(angle) * height / 2, Math.sin(angle) * height / 2];
    toSide = [Math.cos(angle + Math.PI / 2) * width / 2, Math.sin(angle + Math.PI / 2) * width / 2];
    topPoint = [x + toTop[0], y + toTop[1]];
    leftPoint = [x + toSide[0] - toTop[0], y + toSide[1] - toTop[1]];
    rightPoint = [x - toSide[0] - toTop[0], y - toSide[1] - toTop[1]];
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(topPoint[0], topPoint[1]);
    ctx.lineTo(leftPoint[0], leftPoint[1]);
    ctx.lineTo(rightPoint[0], rightPoint[1]);
    ctx.moveTo(topPoint[0], topPoint[1]);
    ctx.fill();
  };
  Triangle.prototype.update = function() {
    if (gameMode === 'normal' || gameMode === 'spook') {
      if (Key.isDown(Key.UP)) {
        this.speed += shipAcc;
      }
      if (Key.isDown(Key.DOWN)) {
        this.speed -= shipAcc / 2;
      }
    } else {
      this.speed += shipAcc;
    }
    if (Key.isDown(Key.LEFT)) {
      this.angle -= spin;
    }
    if (Key.isDown(Key.RIGHT)) {
      this.angle += spin;
    }
    this.speed *= shipDecel;
  };
  Triangle.prototype.move = function() {
    var asteroid, _i, _len;
    this.bounding();
    for (_i = 0, _len = asteroids.length; _i < _len; _i++) {
      asteroid = asteroids[_i];
      this.detectCollision(asteroid);
    }
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
  };
  Triangle.prototype.detectCollision = function(object) {
    var alive;
    if (object.danger && withinRadius(this, object)) {
      health -= 1;
      alive = false;
    }
    if (object.goal && withinRadius(this, object)) {
      health += 1;
      level += 1;
      alive = false;
    }
  };
  Triangle.prototype.bounding = function() {
    return bounding(this);
  };
}).call(this);
