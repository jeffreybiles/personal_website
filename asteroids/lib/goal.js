(function() {
  var Goal;
  Goal = function(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    return this.goal = true;
  };
  Goal.prototype = new Circle();
  Goal.prototype.move = function() {};
}).call(this);
