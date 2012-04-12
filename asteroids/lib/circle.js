(function() {
  var Circle;
  Circle = function(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = 0;
    this.dy = 0;
    this.wrap = true;
  };
  Circle.prototype.draw = function() {
    var radGrad, radius, shadowX, shadowY, x, y;
    x = this.x;
    y = this.y;
    radius = this.radius;
    if (this.danger) {
      shadowX = (goalPost.x - x) * radius / canvas.width;
      shadowY = (goalPost.y - y) * radius / canvas.height;
      radGrad = ctx.createRadialGradient(x + shadowX * 0.8, y + shadowY * 0.8, radius * 0.1, x, y, radius * 0.9);
      radGrad.addColorStop(0, "grey");
      radGrad.addColorStop(0.2, "grey");
      radGrad.addColorStop(1, "black");
    } else {
      radGrad = ctx.createRadialGradient(x, y, radius * 0.1, x, y, radius * 0.9);
      radGrad.addColorStop(0, "white");
      radGrad.addColorStop(0.2, "white");
      radGrad.addColorStop(1, "grey");
    }
    ctx.fillStyle = radGrad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (this.danger) {
      ctx.arc(x - shadowX * 2, y - shadowY * 2, radius, 0, Math.PI * 2, false);
    }
    if ((gameMode !== 'spook' && gameMode !== 'hardSpook') || this.danger) {
      ctx.fill();
    }
  };
  Circle.prototype.update = function() {
    if (gameMode === 'normal' || gameMode === 'spook') {
      if (Key.isDown(Key.UP)) {
        this.dy -= asteroidAcc;
      }
      if (Key.isDown(Key.DOWN)) {
        this.dy += asteroidAcc;
      }
    } else {
      this.dy -= asteroidAcc;
    }
    if (Key.isDown(Key.LEFT)) {
      this.dx -= asteroidAcc;
    }
    if (Key.isDown(Key.RIGHT)) {
      this.dx += asteroidAcc;
    }
    this.dy *= asteroidDecel;
    this.dx *= asteroidDecel;
  };
  Circle.prototype.move = function() {
    if (this.x < 0) {
      this.x += canvas.width;
    }
    if (this.x > canvas.width) {
      this.x -= canvas.width;
    }
    if (this.y < 0) {
      this.y += canvas.height;
    }
    if (this.y > canvas.height) {
      this.y -= canvas.height;
    }
    this.x += this.dx;
    this.y += this.dy;
  };
  Circle.prototype.bounding = function() {
    return bounding(this);
  };
}).call(this);
