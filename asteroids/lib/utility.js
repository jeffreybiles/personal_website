(function() {
  var Key, bounding, drawBackground, findDistance, rand, text, withinRadius;
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
    var distance, dx, dy;
    dx = object1.x - object2.x;
    dy = object1.y - object2.y;
    return distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  };
  bounding = function(object) {
    var margin;
    if (object.wrap) {
      if (object.x < 0) {
        object.x += canvas.width;
      }
      if (object.x > canvas.width) {
        object.x -= canvas.width;
      }
      if (object.y < 0) {
        object.y += canvas.height;
      }
      if (object.y > canvas.height) {
        object.y -= canvas.height;
      }
    } else {
      margin = 10;
      if (object.x < margin) {
        object.x = margin;
      }
      if (object.x > canvas.width - margin) {
        object.x = canvas.width - margin;
      }
      if (object.y < margin) {
        object.y = margin;
      }
      if (object.y > canvas.height - margin) {
        object.y = canvas.height - margin;
      }
    }
  };
  Key = {
    _pressed: {},
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
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
    if (min == null) {
      min = 0;
    }
    return Math.floor(Math.random() * (max - min) + min);
  };
  text = function(text, x, y, color, size, style) {
    if (color == null) {
      color = '#000';
    }
    if (size == null) {
      size = 18;
    }
    if (style == null) {
      style = 'sans-serif';
    }
    ctx.fillStyle = color;
    ctx.font = "bold " + size + "px " + style;
    ctx.textBaseline = 'bottom';
    ctx.fillText(text, x, y);
  };
  drawBackground = function() {
    var color, gameOver, health;
    if (health > 10) {
      health = 10;
    }
    if (health <= 0) {
      gameOver = true;
    }
    color = health * 25 + 5;
    if (color > 255) {
      color = 255;
    }
    if (color < 0) {
      gameOver = true;
    }
    ctx.fillStyle = "rgb(" + color + "," + color + "," + color + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    text(gameMode, 10, 590);
  };
}).call(this);
