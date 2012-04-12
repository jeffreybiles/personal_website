(function() {
  var Asteroid, asteroidFactory;
  Asteroid = function(x, y, radius) {
    this.x = x;
    this.y = y;
    return this.radius = radius;
  };
  Asteroid.prototype = new Circle();
  Asteroid.prototype.danger = true;
  asteroidFactory = function(num) {
    var i;
    for (i = 1; 1 <= num ? i <= num : i >= num; 1 <= num ? i++ : i--) {
      asteroids.push(new Asteroid(rand(canvas.width), rand(canvas.height), 10));
    }
  };
}).call(this);
